+++
date = "2012-08-12T22:23:32-05:00"
title = "iOSDevCampDC 2012"
categories = [
  "Cocoa",
  "Community",
  "Conferences",
]
slug = "iosdevcampdc"
+++

_This weekend I traveled up to Washington D.C. to attend [iOSDevCampDC](http://iosdevcampdc.com) - a one day, single track, conference for iOS developers. I was also able to meet a few people in the D.C. Cocoa community. I had a great time and came away with a few notes to highlight._

<!-- more -->

# The Conference

The organizers did a great job putting the conference together, supplying food, and even swag. The conference shirt might even be one of my new favorite shirts. The talks and the chance to meet other developers makes it feel like a day long CocoaHeads event. Even though our CocoaHeads in Raleigh is almost a mini-conference, I'd really like to create something like this here in Raleigh once a year.

![swag](/assets/images/iosdevcampswag.png)

# The Sessions

Since it was a single track conference, I got to see all the sessions which was definitely a plus. No stress about choosing between multiple sessions. I don't want to spell out all of the talks, but here is a brief note of what I highlighted for each session.

**Stop Pinching Me: Getting Gestures Right in Your Application** _by [Ken Yarmosh (@kenyarmosh)](http://twitter.com/kenyarmosh)_

Overall a great talk about the how, the when, and the _why_ to use gestures in your app. Ken showed a bunch of the work done by his company, [Savvy Apps](http://www.savvyapps.com), and discussed the gestures used in these apps. He also went on to discuss the use of gestures in other apps.

One point he made that made me think a lot was to pay attention to the dominant gesture in any given scenario. When your user is doing something, what is the most important gesture at the time. Think swipe to delete vs scroll in Mail.app. Competing gestures is definitely a problem to watch out for.

**iOS Concurrency: NSOperationQueue and Grand Central Dispatch** _by [Jon Blocksom (@jblocksom)](http://twitter.com/jblocksom)_

Jon discussed some of the differences between GCD and NSOperationQueue, when and why to use either one, and delivered a few examples of working with these tools from Apple. He discussed what he called the "There and Back again" pattern, but I think Apple has been calling it the "Call Callback" pattern or something like that. He also covered [Target Queues](https://developer.apple.com/library/mac/#documentation/Performance/Reference/GCD_libdispatch_Ref/Reference/reference.html), one thing I'd like to look more into and maybe use if the need ever arises.

**Recipe for Dynamic Content** _by [Mark Gerl (@mgerl)](http://twitter.com/mgerl)_

Mark discussed building and working with his content system for the [Politico](http://www.politico.com) mobile apps. I really enjoyed seeing the process between each version of the content and how he dealt with versions and changed content. He also discussed how he uses a config endpoint to route to the specific content endpoints. This is great for versioning, but also allows you to test with production data since endpoints can be tied to specific versions of the app.

**Enter the Matrix** _by [Mark Pospesel (@mpospesel)](http://twitter.com/mpospesel)_

First of all, _The Matrix_ is hands down my favorite movie. Mark tying matrix transforms to _The Matrix_ just makes it even more cool. I'd seen Mark's [code on github for this session](https://github.com/mpospese/EnterTheMatrix) before and even used it to show others how to work with transforms. It is a really great sample.

A couple things I walked away from that I hadn't noticed before was using `CGContextTranslateCTM` when capturing an image from a view's layer. I've done this before and recalculated the frame needed when I could have just translated the image to the needed position and captured it. **Duh**. He also discussed creating a transparent border around an image to force UIImage to properly anti-alias during a transformations.

**Improving App Monetization Through Data** _by [Chris Brown (@chriskbrown)](http://twitter.com/chriskbrown)_

Chris discussed his company, [Millenial Media](http://www.millennialmedia.com), and their background in mobile advertising. I haven't put advertising in any app I've worked on in years. His company provides an SDK to help target the right user at the right time. Definitely something interesting to think about in the future. I didn't realize they were second to Google in mobile advertising.

**Embedded Lua Scripting for iOS** _by [James Norton (@jnorton)](http://twitter.com/jnorton)_

This session was a surprise to me. I initially read it on the schedule and didn't think much of it. Aside from showing how to build Lua into your app, James discussed his new framework, [Gemini](http://github.com/indiejames/Gemini.git). It is mostly targeted for game development, but it does provide a way to build out some sort of extensibility in an app. Not sure how or if I'll ever use it, but it is nice to know it is possible.

# Summary

iOSDevCamp was a great success. I'd go again in a heartbeat. Also, my family loves spending time in Washington so I get to turn it into a mini-vacation too. Thanks to the organizers for putting together a great conference. From Raleigh, the conference is pretty close (only a 5-hour drive) and doesn't require a lot of travel planning to attend. Just plan for traffic.

It was also cool to meet some other developers. I met the [organizer](http://twitter.com/josevazquez) of [NSCoder Night DC](http://nscodernightdc.com) and learned that they too spend a lot of time discussing movies when not talking code/. We do this at the [Raleigh NSCoder Night](http://trianglecocoa.com) as well. I hope I can get up there for one of their NSCoder Nights or CocoaHeads meetups. It would be so cool to travel to other groups and see how others do it.
