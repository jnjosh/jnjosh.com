+++
title = "A Swift Time Capsule"
date = "2021-06-20T23:47:11+00:00"
categories = [
  "Programming",
  "iOS",
  "Swift",
  "SwiftUI"
]
+++

A while back I got into an argument with a friend about the lifetime of code “now days”. He argued that code written in C and C++ was much more likely to continue working forever, needing fewer updates, and being generally more of an asset. My response was generally “code is a liability, not an asset”. We should strive to create good code, but too much changes in the industry year to year and you’ll eventually need to replace it with new tools and environments—at least for most consumer facing apps.

We are 7 years into this new Swift adventure—which kind of proves my point above, we should be migrating from Objective-C to Swift as it’s better in almost every way. That hurts a lot to say but it’s true. However, I’m wondering if my friend was right to some extent. Swift today is not Swift of 2014 and had you been an early adopter, you would have had a lot of migrating to do.

I was curious lately how much has changed since the beginning and [found a project](https://github.com/jnjosh/WeatherApp-Swift) I had worked on back in 2014—with [a small update for Swift 1.2 in 2015](https://jnjosh.com/posts/swift-you-slash-ve-changed-so-much/). The project is to basically consume weather from a public API and display it—a super small representation of what most apps I’ve worked on contain. I downloaded a fresh copy of Xcode 13 and opened it up! So how did it change?

[Check it out, Swift Weather](https://github.com/jnjosh/WeatherApp-Swift)!

## Opening the Time Capsule

Of course, I was immediately prompted with “WeatherApp contains sourc code developed with Swift 3.x” and I’d need to migrate to Swift 4. Of course I was opening a Swift 1.2 project and have no interest in stopping at Swift 4, so let’s continue.

Oh… well I guess I can’t really go on. FIrst thing is obviously this app could not run as it targeted iOS 8 and iOS 9 is as far back as Xcode 13 cares to think about. However, the real problem was I decided to use a custom JSON parsing system (this was all before `Codable`!). [Runes](https://github.com/thoughtbot/Runes) and [Argo](https://github.com/thoughtbot/Argo) were used with this incredibly expressive syntax that I did not completely forget about. /sarcasm.


{{< highlight swift >}}
static func decode(json: JSONValue) -> Forecast? {
    return Forecast.create
        <^> json <||? "list"
}
{{< / highlight >}}

So I didn’t really want to unravel that mess. Since most the UI stuff would be needing a rewrite in SwiftUI and I now have access to `Codable` I thought I'd just start from scratch on this project.

Before continuing, one feature of early Swift that I thought was interesting was [method currying](https://en.wikipedia.org/wiki/Currying). This allowed you to treat a function with multiple arguments as a sequence of functions. It was removed in (I think) Swift 3? I still think it's neat, but it's probably for the best to remove it.

{{< highlight swift >}}
static func create(kelvin: Double?)(city: String?) -> WeatherItem {
    return WeatherItem(kelvin: kelvin, city: city)
}
{{< / highlight >}}

## A Whole New World

I deleted everything and just started from scratch. I knew that the API and Parsing side of this would be rewritten with `URLSession` and `Codable` structs and I’d want to build a new UI with SwiftUI—something I’ve had little time to work with over the last couple years.

The first thing I noticed? A new App Project is very simple. It contains the project, a `WeatherApp.swift`, an Assets bundle, and a `ContentView.swift`. It appears the Info.plist has been moved to be shown as part of the project.

Building the new API stuff was much better, `Codable` is a nice system. The real update was switching from blocks to [async functions available with Swift 5.5](https://developer.apple.com/videos/play/wwdc2021/10132/). That turned my old Objective-C era mindset `fetchWeather` function into a much easier function to reason about. It went from this…

{{< highlight swift >}}
func fetchWeatherWithLatitude(latitude: Double, longitude: Double, completion:((WeatherItem?) -> Void)!) {
	let URLString = baseURLString.stringByAppendingFormat(weatherPathFormat, latitude, longitude)
	
	if let URL = NSURL(string: URLString) {
		let request = NSURLRequest(URL: URL)
		
		NSURLConnection.sendAsynchronousRequest(request, queue: queue, completionHandler: {
			(response: NSURLResponse!, data: NSData!, error: NSError!) -> Void in
			
			if response == nil {
				completion(nil)
				return;
			}
			
			var jsonError: NSError? = nil
			if let result: AnyObject = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions(0), error: &jsonError) {
				dispatch_async(dispatch_get_main_queue(), {
					let value = JSONValue.parse(result)
					let item = WeatherItem.decode(value)
					completion(item)
				})
			}
		})
	}
}
{{< / highlight >}}

… into something much more clear.

{{< highlight swift >}}
func weather(latitude: Double, longitude: Double) async throws -> WeatherReport {
	let request = try weatherRequest(forEndpoint: .current,
									 latitude: latitude,
									 longitude: longitude,
									 apiKey: self.apiKey)
	let (data, _) = try await URLSession.shared.data(for: request)
	guard let report = try? JSONDecoder().decode(WeatherReport.self, from: data) else {
		throw WeatherServiceError.decodingFailure
	}
	return report
}
{{< / highlight >}}

Now I can leave behind not only all the pre-`URLSession` and pre-`Codable` world, but more importantly I can leave behind the strange code flow we all lived with under the call-callback structure.

The other big thing is of course, SwiftUI. It took me a little bit to think through how to structure things with a pure-SwiftUI project—and I probably have a lot to learn still—but it’s so much more easy to read and reason about than the older style. I learned to read that through experience, SwiftUI code I could probably show non-tech people and they could read it. Also it simplifies things a lot.

{{< highlight swift >}}
struct ContentView : View {
    @StateObject var model: WeatherReportModel


    private func updateWeatherResults() {
        model.fetchAllReports(location: CLLocationCoordinate2D(
            latitude: 35.9940,
            longitude: -78.8986)
        )
    }

    
    var body: some View {
        NavigationView {
			List {
				if let weatherReport = model.currentWeather {
					WeatherForecastSectionView(
						forecast: weatherReport,
						isCurrent: true
					)
				}
				ForEach(model.forecasts) { forecast in
					WeatherForecastSectionView(
						forecast: forecast
					)
				}
			}
			.navigationTitle("Swift Weather")
			.listStyle(.sidebar)
        }
        .refreshable { updateWeatherResults() }
        .task { updateWeatherResults() }
    }
}
{{< / highlight >}}

That last bit there with `.refreshable { … }` is a new feature in SwiftUI that'll automatically add a `UIRefreshControl` to your UI. So nice.

## Summary

In the end, it’s not less code—actually CLOC reports it’s about the same amount of code (I did format a lot of multiline inits, though). The interesting thing is not that the lines of code are smaller however, but that the code is more easy to reason about and read. At least I hope so. I’ll have to put it back in the time capsule and come back in 2028 to see how things worked out.

I still think code is not something you should treat like an asset. You should do your best with what you know but be ready to move forward. This little experiment showed me that moving forward can be good, `Codable` and async/await alone show this.

What do you think? Let me know on [twitter](https://twitter.com/jnjosh) or feel free to look through the [WeatherApp sample project](https://github.com/jnjosh/WeatherApp-Swift) and play around with it.

