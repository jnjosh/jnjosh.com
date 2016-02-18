+++
date = "2009-11-05T01:19:32-05:00"
title = "iPhone App UI Tricks - Drag from outside the Screen"
categories = [
  "iPhone",
  "Programming",
  "UI",
]
slug = "iphone-app-ui-tricks-drag-from-outside-the-screen"
+++

This really isn't a trick, or even a tip. In fact, no additional code was written to get this behavior. However, it is too cool not to show some how and the small pictures on the App Store don't do it justice. By placing a `UIView` (or subclassed view) on the bottom of my main view, messages to `touchesMoved:withEvent:` are made as soon as your finger crosses into the iPhone's screen. Voila!, the illusion of dragging from the outside of the screen.

<!-- more -->

My last app, or rather, [Triple D Design's latest app]("http://tripleddesign.com/iphone-apps.html") "100 Percent" ([which is now available on iTunes]("http://www.itunes.com/apps/100percent")) has this little trick. See the video below.

<iframe src="//player.vimeo.com/video/7447347?byline=0&amp;portrait=0&amp;color=ff9933" width="800" height="451" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

I know this is insanely simple, but sometimes, the simplest things are the neat too.
