+++
date = "2013-01-30T23:30:32-05:00"
title = "Controlling Xcode warnings via pragmas"
categories = [
  "Cocoa",
  "Objective-C",
  "Xcode",
  "Programming"
]
slug = "controlling-warnings-via-pragmas"
+++

I hate warnings in Xcode. Originally, they didn’t bug me too much and I’d even use the `#warning` preprocessor directive to note TODO items. I want problems to be the only thing that shows up in the build log so I __notice__ it right away. Then, one day Xcode updates and I get a lot of new warnings. _This is a good thing_ and you should choose to turn the [__stricter warnings__](http://boredzo.org/blog/archives/2009-11-07/warnings) on.

How do you leave in code that generates a warning but not see said warning? How do you keep your build log clean with stricter warnings? You [__control the diagnostics that are enabled via #pragma__](http://clang.llvm.org/docs/UsersManual.html#controlling-diagnostics-via-pragmas) on a case by case basis.

<!-- more -->

Here's an example. My current project uses __AVFoundation__ to play audio files. One of AVPlayer’s properties, `allowsAirPlayVideo`, is deprecated in iOS 6 in favor of `allowsExternalPlayback`; a property that is available in iOS 6. But my project also requires support for iOS 5. I check the player to see if it supports the new property and sets the right one depending on where the app runs.

        if ([_audioPlayer respondsToSelector:@selector(setAllowsExternalPlayback:)]) {
            [_audioPlayer setAllowsExternalPlayback:NO];
        } else {
            [_audioPlayer setAllowsAirPlayVideo:NO];
        }

Due to the more strict warnings, I get a warning that the property is deprecated:

    'setAllowsAirPlayVideo:' is deprecated: first deprecated in iOS 6.0

With a normally clean build log, I see this right away. Then I can decide whether I need to do this or not, and since I am supporting iOS 5, I do. In this case, I tell the compiler to suppress this deprecation warning with `-Wdeprecated-declarations`:

        if ([_audioPlayer respondsToSelector:@selector(setAllowsExternalPlayback:)]) {
            [_audioPlayer setAllowsExternalPlayback:NO];
        } else {
            #pragma clang diagnostic push
            #pragma clang diagnostic ignored "-Wdeprecated-declarations"
            [_audioPlayer setAllowsAirPlayVideo:NO];
            #pragma clang diagnastic pop
        }

Now my build log is clean and this piece of code is identified as requiring special handling but without lowering my global build setting’s warning level.

This is not something to be taken lightly as it can lead to ugly and unreadable code. Note the decision to see if I even needed the warning-causing code before dropping in a `#pragma`. This is a tool worth knowing when you want to keep a clean build log without changing your Xcode project's build settings.
