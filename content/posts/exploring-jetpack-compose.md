+++
title = "Exploring Jetpack Compose"
date = "2021-07-11T18:32:27+00:00"
categories = [
  "Programming",
  "Android",
  "Kotlin"
]
+++

After last month’s adventures into [SwiftUI with my little weather app](/posts/swift-time-capsule/), I thought it would be interesting to recreate the same project, but in Android's upcoming version of a declarative UI framework, [Jetpack Compose](https://developer.android.com/jetpack/compose). I'm curious how it compares to SwiftUI and what the Android development experience is like in 2021.

<!-- more -->

I’ve been developing on Apple’s platforms in some form since the early aughts. With the iPhone SDK in 2008 I took it from a side curiosity to my main career. During my time at Two Toasters I started learning a little about Android, did [some Android work for our](https://speakerdeck.com/jnjosh/cross-platform-shenanigans-part-2-android) [game engine at Highrise](/posts/kotlinfromcpp/), and in 2018 I built an Android app for a client. I found that last experience painful—but I believe this was more about being more accustomed to Apple’s patterns and the nature of a side project.

So… What’s it like now? Is this declarative UI as significant on Android as it seems to be on Apple platforms? I downloaded the arm64 Arctic Fox beta for my M1 MacBook Pro and decided to find out.

<figure>
  <img src="/uploads/2021/arctic.png" />
</figure>

Check it out on Github, [Kotlin Weather](https://github.com/jnjosh/WeatherApp-Kotlin) ([Swift Weather](https://github.com/jnjosh/WeatherApp-Swift) for reference)!

First thing I noticed is this arm64 build of Android Studio runs pretty well for most of what I needed to do. The emulator itself launched almost immediately. Some of my most painful memories were dealing with launching the emulator—or even paying a lot for a third party emulator. Unfortunately, most of this was beta so I did have to do some shenanigans in Gradle to get all the right versions of compose and the tools I wanted to use. Xcode just includes all that you need to use the new tools without any extra configuration.

<figure>
  <img src="/uploads/2021/compare.png" />
  <figcaption>Android Studio Arctic Fox Beta and Xcode 13 Beta Side by Side with their respective cell views</figcaption>
</figure>


The big differences I noticed between SwiftUI and Jetpack Compose are mostly syntactical (`VStack` = `Row`, `HStack` = `Column`) but in some cases I think Android's approach is harder to reason about. Now this could be a situation where I just didn't understand (or it's still just early). Still, thinking about State and LiveData types seems much more difficult with Compose.

For example, in SwiftUI I can just identify my model as a `@StateObject` and using `@Published` I can receive updates.

{{< highlight swift >}}
@StateObject var model: WeatherReportModel

class WeatherReportModel : ObservableObject {
    private let client: OpenWeatherMapServiceClient
    @Published var currentWeather: WeatherReportSectionModel?
    @Published var forecasts = [WeatherReportSectionModel]()
}
{{< / highlight >}}

This state management can get complicated but a simple example is easily decorated with these property wrappers. I expected Kotlin and its much more expressive annotation system to be better for this kind of thing. Unfortunately, I found it harder to reason about. Eventually I got something working by observing a LiveData in my ViewModel as a Compose State type, but it wasn’t immediately clear what the best pattern here should be. I ended up looking at other sample projects to see what they did. This alone took me down some false starts as the beta-nature of this lead to implementations that aren’t available since last year.

{{< highlight swift >}}
// Set up a mutable live data in my view model
private val weatherCellModel = MutableLiveData<WeatherCellModel>()
val weatherLiveData: LiveData<WeatherCellModel>
	get() = weatherCellModel

// Then later, observe it as state (with null as default)
val report: WeatherCellModel? by model.weatherLiveData.observeAsState(null)
{{< / highlight >}}

I’m going to keep reading as Compose continues to mature. I’m sure I’m overcomplicating it out of ignorance, but SwiftUI's method for managing State feels easier to think about.

Once you get all the state dealt with, most of the differences start becoming syntax. SwiftUI expects you to conform to their `View` struct where Compose is built in a `@Composable` decorated free function. Both systems use modifiers to change the way a component is displayed.

{{< highlight swift >}}
// Jetpack Compose
Text(
	text = "Hello, World!",
	fontWeight = FontWeight.ExtraBold,
	fontSize = 18.sp,
)

// SwiftUI
Text("Hello, World!")
    .font(.headline)
    .fontWeight(.bold)
{{< / highlight >}}

Interestingly modifiers in SwiftUI are like builders on the Text object where in Compose, they are parameters. This seems a little funny to me in that Java and Android seems more likely to use that builder pattern.

One last thing that is nice, and similar to SwiftUI’s live view is how your JetPack Compose based functions can be updated and automatically displayed in the emulator. SwiftUI does this too but it’s built in to Xcode—and often is broken in my experience. Many times when working on this Kotlin-based weather app, I’d update layout and switch over to the emulator to find it already running my change.

### Is it… the future!?

I think, yes. It reminds me a lot of early SwiftUI and I think seeing how Compose evolves will be fun to watch. I think it will be an important tool for Android development in the future. SwiftUI felt more “ergonomic” to me but that is admittedly biased by my comfort with Apple platforms—not to mention it has had a year or so more to evolve. I guess next I’ll have to build this on React to really see all three major platforms.

