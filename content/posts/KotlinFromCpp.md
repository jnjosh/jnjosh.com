+++
title = "Calling Kotlin from C++"
date = "2018-02-05T23:37:13-05:00"
categories = [
  "Android",
  "C++",
  "Kotlin",
  "Programming"
]
+++

At [Highrise](http://www.joinhighrise.com) we've been building the future of our platform in a way that supports Android. We've put together a stack that is pretty challenging but really fun to build. It's based on a C++ core and platform specific projects in Swift (for iOS) and Kotlin (for Android) that uses that core. On Swift you need to have an Objective-C++ wrapper for Swift to call functionality in the C++ core, but it's pretty straightforward and things like wrapping a block in an `std::function` works pretty well. Android however runs on the JVM and requires using JNI to communicate with C++. This took away the niceness of Kotlin lambdas for asynchronous completion away from us. Or did it?

<!--more-->

I first tried to pass a kotlin lambda to the core and wasn't able to make it work. My fallback was to create a convention of well-defined callbacks. For example, a call to '`loginUser`' would result, eventually, in a call to '`callbackLoginUser`'. This required a lot of overhead because of how JNI works. For each `callback`-prefixed function I had to build an interface that hard-coded the java parameter code, the method, and the class.

{{< highlight cpp >}}

 static JniMethodInfo callbackLoginUserMethod() {
     JniMethodInfo callbackInfo;
     JniHelper::getMethodInfo(callbackInfo,
                              "com/app/android/Login",
                              "callbackLoginUser",
                              "(ZLjava/lang/String;)V");
     return callbackInfo;
 }

 static void callbackLoginUser(jobject object, 
 					    	   bool succeeded, 
 					    	   std::string errorMessage) {
     auto info = callbackLoginUserMethod();
     auto errorString = info.env->NewStringUTF(errorMessage.c_str());
     info.env->CallVoidMethod(object, info.methodID, succeeded, errorString);
     info.env->DeleteGlobalRef(object);
 }

{{< / highlight >}}

These are basically helper methods to hide the boilerplate JNI code behind a simple function call. It works and is easy to reason about since we created a common convention. That said, I couldn't stop thinking about being able to use kotlin lambdas. Of course, the idea came to me on the drive home.

First thing I thought was since everything in Java (and Kotlin) are objects, a lambda must also be a class that gets generated in the JVM. After a little study, it does! 

{{< highlight kotlin >}}

 val completion: (Boolean, String) -> Unit = { success, value ->
 	println("$value -> $success")
 }

{{< / highlight >}}

For example that code becomes a class is created with a name like: `com.app.android.Login$loginUser$completion$1`. And an `invoke` function with the right params is created: `invoke(boolean, java.lang.String)`. With this knowledge I just had to figure out how to actually call the invoke function, which was pretty clear with all the boilerplate JNI I had written. 

First I needed to acquire the name of the class. JNI functions are basically C functions that you need to manage, so the lambda shows up on the C++ side as a `jobject`. The matching JNI function will receive a jobject instance of the lambda.

{{< highlight kotlin >}}

 // In Login.kt, identify the kotlin external function that will call to C++
 private external fun nativeLoginUser(completion: ((Boolean, String) -> Unit))

{{< / highlight >}}

{{< highlight cpp >}}

 // In Login.cpp, define the C function that will be matched with the above
 // external function.
 JNIEXPORT
 void Java_com_app_android_Login_nativeLoginUser(JNIEnv *environment, 
 												 jobject thiz, 
 												 jobject completion) {
 	//…
 }

{{< / highlight >}}

The first task will be to identify the generated class of this completion object.

{{< highlight cpp >}}

 JNIEXPORT
 void Java_com_app_android_Login_nativeLoginUser(JNIEnv *environment, 
 												 jobject thiz, 
 												 jobject completion) {
	jclass klass = environment->GetObjectClass(completion);
    jmethodID classMethodId = environment->GetMethodID(klass, 
    												   "getClass", 
    												   "()Ljava/lang/Class;");
    jobject klassObj = environment->CallObjectMethod(completion, classMethodId);

    auto klassObject = environment->GetObjectClass(klassObj);
    auto nameMethodId = environment->GetMethodID(klassObject, 
    	                                         "getName", 
    	                                         "()Ljava/lang/String;");
    jstring classString = (jstring)environment->CallObjectMethod(klassObj, 
    														     nameMethodId);

    auto className = environment->GetStringUTFChars(classString, NULL);

    //…
 }

{{< / highlight >}}

Now that we know what class we are communicating with, we'll need to find the invoke method. This part is still a bit hard-coded, unfortunately. You have to provide a param code that matches tha actual method signature. Something like "`(ZLjava/lang/String;)V`". This translates Z to `Boolean`, L to `java/lang/String`, and V to `Void`. This matches the signature of the lambda (except for that Unit type, which I don't fully understand). Using the `JniHelper` class that comes with [Cocos2d-X](http://www.cocos2d-x.org) I can get that method information. Finally I can call the method on the specified object with the vargs of the arguments to send.

{{< highlight cpp >}}

 JNIEXPORT
 void Java_com_app_android_Login_nativeLoginUser(JNIEnv *environment, 
 												 jobject thiz, 
 												 jobject completion) {
	// Get `className` (above)

    JniMethodInfo invokeMethod;
    JniHelper::getMethodInfo(invokeMethod,
                             className,
                             "invoke",
                             "(ZLjava/lang/String;)V");

    jstring message = JniHelper::getEnv()->NewStringUTF("Success!");
    invokeMethod.env->CallVoidMethod(completion, 
    								 invokeMethod.methodID, 
    								 true, 
    								 message);
    environment->ReleaseStringUTFChars(classNameString, className);
 }

{{< / highlight >}}

Finally, in Kotlin I can simply add a new function that calls the native/external C++ function _with the lambda_.

{{< highlight kotlin >}}

 private external fun nativeLoginUser(completion: ((Boolean, String) -> Unit))
 fun loginUser() {
    nativeLoginUser({ success, value ->
        if (success) {
            println("Yes!")
        }
        println(value)
    })
 }

{{< / highlight >}}

There is a lot I didn't cover here like releasing objects properly and getting a global reference to objects that you may need to wait for asynchronous callback. That's all JNI specific stuff and it, unfortunately, takes a lot of trial and error to work out. I'm also not totally happy with the way the param code is hard coded. I think I could probably generate the param string from the Kotlin side and pass that with the block. It's not ideal but still better than the convention-based method. Have you done this? I'd love to hear your experiences!


