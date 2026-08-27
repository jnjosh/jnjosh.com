+++
date = "2014-01-10T01:37:32-05:00"
title = "Where I change my mind about CocoaPods"
categories = [
  "Cocoa",
  "Objective-C",
  "Open Source",
]
slug = "changing-my-mind-about-cocoapods"
+++

It has almost become a joke at our local [NSCoder Night](http://meetup.com/nscoderrtp). Bring up [CocoaPods](http://coocapods.org) and a long and heated discussion about whether it is a good idea will begin. I've always been on the “I don’t like it” side of the argument. Then today during our weekly “CocoaBrains” tech talk at [Two Toasters](http://twotoasters.com) we re-review this dependency management solution. <span class="yellow-highlight">Spoiler: I am changing my mind about CocoaPods</span>.

<!-- more -->

### Reasons I didn't like it

I tried CocoaPods when it was pretty new. Things were rough in the early days. Occasionally header files were missing, debugging through to the libraries wouldn’t work right, and many other frustrating problems were frequent for me. Fighting these issues actually helped me further understand how Xcode’s build settings work. At that point, it seemed like it wasn’t worth it.

Since fighting these issues and also working on a project that uses one of those crazy fake frameworks helped me understand things better, I didn't see the benefit. I was doing all the work and already had a solution: Git Submodules.

For a long time I also argued that forcing the user to require a good ruby environment to use CocoaPods was odd when they had all they needed to manage depnendencies. However, I've also promoted using Rakefiles for a long time. My own preferences destroy my arguments.

CocoaPods are designed similar to RubyGems. RubyGems are a solution to a problem that exist when multiple servers don't have the same configuration to deploy software. As Cocoa developers, we aren't normally in this scenario of deploying to multiple servers. We compile and deploy our software. Being a close replica of RubyGems just seemed clumsy to me in this scenario.

### Why I changed my mind

Things change. Things improve. Some of the issues I experienced 2 years ago may have also been related to Xcode 4. Back then Xcode Workspaces were new too. Maybe my problems were mistakenly blamed on CocoaPods. <span class="yellow-highlight">All the problems I had then seem to be resolved</a>.

At Two Toasters we work on new projects often. As we work with new clients that first stage of setting up the project is directly affected by having CocoaPods help with managing dependencies. We also deliver these projects to our clients who way not have worked out how git submodules work. They may not have worked out how Xcode works. This helps them too.

__All you who have already bought in to CocoaPods may think it's crazy that this post is from 2014. I changed my mind. Until something better comes out, I'm going to use CocoaPods.__
