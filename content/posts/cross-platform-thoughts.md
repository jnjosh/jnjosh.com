+++
title = "Cross Platform Thoughts"
date = "2019-08-18T22:27:06-05:00"
categories = [
  "Programming"
]
+++

Cross Platform development for most mobile apps is just simply not worth it. Sure, there are great open source options like React Native and just plain C++ but you end up spending the same time trying to be clever and "share code" when you could have just built your product with all the platform has to offer. There seems to be a lot of realizations this year with [Dropbox][1] dropping their C++ components and last year [Airbnb][2] sunsetting React Native components. I've played this game before and while it was a great challenge, I would advise anyone not to do it for most cases. 

Back in 2017 I joined the [Highrise team][3] as the Lead Mobile Engineer and one of the first decisions we needed to make was: what is the future of our game and how could we create it so that it could live on Android?

<!--more-->

Highrise is unique in that it's both an app and a game. We quickly explored some cross platform options for making the game components like Unreal, Unity, libGDX, etc. These options seemed great for the parts of the app that were a game but not so great for the standard app components. We'd end up having "crappy Game UI"™ which was explicitly something we did _not_ want. We wanted the app to feel as good as Instagram or any Apple app when not in game-based UIs. I proposed the best path as either "let's not be clever and just make the app twice" or "let's build the game components in a shared C++ layer and the app components natively". I had done this previously when working on BA3's mapping engine and felt this could be a great solution for our problem. We could write the hard game-based code once and write specific UIs for each platform. I shared this at local meetups as [cross platform][4] [shenanigans][5].

You know what? It was actually _pretty fun_! We ended up with an extra platform, C++, and a lot of bridging code in Objective-C++ (and JNI-based C for Android) and had to make a lot of calls on how we'd communicate game events between the UI and core layers. We worked with [Flatbuffers][6] which gave us simple data to pass around. We now had a platform that we could build on top of, we had a core layer that was compatible with multiple platforms, and we had a UI layer that would not be foreign to most iOS or Android developers. I'd even go as far as saying if you are building a game, this is probably the best way to get cross platform game logic while not sacrificing a great app experience.

Would I do it again? No.

The thing is we really didn't save much time. Most features ended up being full stack features so we couldn't isolate a developer from the Core as much as we wanted. This meant that we had to expose bridge objects going both ways—which is not a simple problem—for most features. We also had to deal with many layers of abstraction making things like simple networking much harder to debug. In the end, we spent about the same amount of time as if we had just built the app for each platform. We could have even saved some time when you consider we could us one platform as a guide to build the other platform and not fight issues that worked well in one platform and not on the other.

One of the first things I teach new developers is "don't fight the platform". Instead of trying to be clever and solving your too many platforms problem by adding another platform, just build your app simply. Build in Swift with all that Apple offers or build in Kotlin with all that Google offers. You'll appreciate the simplicity of it when you have to debug any issue. You may have to think a little bit harder to coordinate releases between the platforms, but that is a far simpler problem than trying to build something that works great on whatever platform it runs on. I've since moved on from Highrise and BA3, but one lesson I'll take with me is don't try to be too clever. 


[1]: https://blogs.dropbox.com/tech/2019/08/the-not-so-hidden-cost-of-sharing-code-between-ios-and-android/
[2]: https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a
[3]: http://joinhighrise.com
[4]: https://speakerdeck.com/jnjosh/cross-platform-shenanigans-part-1-ios
[5]: https://speakerdeck.com/jnjosh/cross-platform-shenanigans-part-2-android
[6]: https://google.github.io/flatbuffers/