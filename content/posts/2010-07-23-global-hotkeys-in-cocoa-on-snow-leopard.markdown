+++
date = "2010-07-23T01:44:32-05:00"
title = "Global hotkeys in Cocoa on Snow Leopard"
categories = [
  "Cocoa",
  "Programming",
]
slug = "global-hotkeys-in-cocoa-on-snow-leopard"
+++

I am working on a small app at the office for all our mac users to help locate files on the network (more on this later), I decided to go with a spotlight style NSStatusItem based app. I’ve been really inspired by these apps lately (when done right). Mostly thanks to Notify.

To make this more handy I decided to include a global hotkey. For Leopard and earlier, one problem is you have to use the old Carbon-based events. Most likely due to my Carbon-naivety, I had troubles with this.

Luckily, I found that starting with OS X Snow Leopard, Apple added a new method to NSEvent:

{{< highlight Objective-C >}}
 -addGlobalMonitorForEventsMatchingMask:maskhandler:
{{< / highlight >}}
