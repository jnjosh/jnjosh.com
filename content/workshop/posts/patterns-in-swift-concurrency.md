+++
title = "Patterns with Swift Concurrency in new APIs"
date = "2021-06-13T21:39:04-04:00"
categories = [
  "Cocoa",
  "Programming",
  "iOS",
  "Swift",
]
+++

I’ve watched a lot of this year’s [WWDC](https://developer.apple.com/wwdc/) sessions—like over 30 this weekend. This year just seemed to be really interesting and I've really enjoyed many of the videos. Also, I'm super excited about DocC and can't wait to start building better documentation!

One thing has been bugging me. After watching [Meet async/await in Swift](https://developer.apple.com/wwdc21/10132),  [Meet MusicKit for Swift](https://developer.apple.com/wwdc21/10132) and [Meet StoreKit 2](https://developer.apple.com/videos/play/wwdc2021/10114/) sessions I started noticing an interesting difference in patterns in use with Swift Concurrency. So far I’ve seen 3 different patterns.

### Pattern 1: The ol’ fetch me a response with this request pattern

This seems the most common pattern I’ve seen and what I’d probably naturally do when building something that supports the new language features.

{{< highlight swift >}}
let (data, response) = try await URLSession.shared.data(with: request)
{{< / highlight >}}

Passing a request to a data task will eventually result in a response. This seems the most abstracted where a request describes the request itself but the data task asynchronously fetches the data and responds.

### Pattern 2: The request gives you the response pattern

This was the first time I had the thought that the patterns were different. While watching the [Meet MusicKit for Swift](https://developer.apple.com/videos/play/wwdc2021/10294/) session they reviewed the new API for [MusicCatalogSearchRequest](https://developer.apple.com/documentation/musickit/musiccatalogsearchrequest).

{{< highlight swift >}}
func response() async throws -> MusicCatalogSearchResponse
{{< / highlight >}}

So when using this you’d be asking the request itself to asynchronously fetch a response.

{{< highlight swift >}}
let album = try await albumRequest.response()
{{< / highlight >}}

This seems to blur the lines of what responsibilities requests have. Typically I wouldn't think of a request being the facilitator of it's own response.

### Pattern 3: The static function request

Later while watching the [Meet StoreKit 2](https://developer.apple.com/videos/play/wwdc2021/10114/) session I noticed another pattern, request directly associated as a static method on [Product](https://developer.apple.com/documentation/storekit/product/).

{{< highlight swift >}}
static func request(with identifiers: Set<String>) async throws -> [Product]
{{< / highlight >}}

Leading to a fetch of products like this:

{{< highlight swift >}}
let products = try await Product.request(with: identifiers)
{{< / highlight >}}

In my limited experience with Ruby on Rails, this reminds me of the patterns there for some reason. The type itself knows how to find instances of itself given some search criteria. This probably reads the nicest and is maybe the most ergonomic but it means a lot of the fetching behavior is owned by the Product type itself or an extension.

### So… what’s the point?

I find it interesting that with this new push for Swift Concurrency there isn't a clear pattern that Apple recommends. Apple has often had strange APIs that come out of nowhere in the past—I'm looking at you `CAMediaTimingFunction`'s `initWithControlPoints::::`. However, this seems to be a bit more fundamental. Maybe it's an artifact of many teams doing different things then all trying to get something ready for Swift Concurrency? Maybe it really doesn't matter and I'm over thinking it? Maybe there are good reasons I'm not seeing in the public interface for these different APIs to use different patterns? I don't know, but I’m interested to see what the community adopts, if anything.

### What is a good pattern?

Patterns are mostly important as a means of consistency and convention, so I'm not going to over index on what is right. It's way too easy to look at a public interface and judge it harshly.

For me, that initial pattern as shown in the `URLSession` example makes the most sense. Here you have a clear request type that can declare the request’s parameters and potentially be reusable, a response type, and a task type that owns the actual async work.

