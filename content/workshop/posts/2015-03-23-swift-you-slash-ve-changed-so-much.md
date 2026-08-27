+++
date = "2015-03-23T01:39:32-05:00"
title = "Swift, you’ve changed so much"
categories = [
  "Cocoa",
  "Swift",
  "Open Source",
]
slug = "swift-you-slash-ve-changed-so-much"
+++

During the crazy week of WWDC 2014—right after the announcement of Swift—I decided to spend a little
time trying to implement a quick weather app using the new language. I managed to wrap it up in a
few hours (and spent way too much time trying to figure out how to parse JSON with a
generically-typed dictionary) and open sourced it. There it sat for all these months while several
versions of Swift were released. I've started my latest project with Swift and decided I should
upgrade this project just to see how much has changed. I'm a professional procrastinator, do not try
this at home.

I kept all the changes required to get it working again in a [single
commit](https://github.com/jnjosh/WeatherApp-Swift/commit/663c81c94ea57348298a4fceeebd5b18798aede5).
This gives a pretty good look at how much has already changed. I originally wrote this with an
Objective-C mindset, so the patterns here are quite ugly. Still, I find it pretty fascinating.

As I mentioned above, I had a hard time last summer getting my JSON parsed and resulted in taking
two different approaches—one with NSDictionary and one with Dictionary<K, V>. This time around I
decided to test out [Argo](https://github.com/thoughtbot/Argo), a library for parsing JSON objects.

<!-- more -->

Check it out if you'd like to see some the differences between Swift then and now:

[https://github.com/jnjosh/WeatherApp-Swift/commit/663c81c94ea57348298a4fceeebd5b18798aede5](https://github.com/jnjosh/WeatherApp-Swift/commit/663c81c94ea57348298a4fceeebd5b18798aede5)
