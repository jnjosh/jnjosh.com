+++
title = "Debugging with Sound"
date = "2018-02-08T22:27:06-05:00"
categories = [
  "Debugging",
  "Programming",
]
+++

Debugging is hard. You have to remember what you or someone else was trying to do while understanding what's actually going on. I don't remember where I heard it, but there is a saying that goes something like "Don't write code at the peak of your understanding because debugging it requires 2 times the understanding…". Sometimes it's not that it's hard it's that there is just too much going on. For these cases, I've been using sound.

<!--more-->

One case where this comes in handy is debugging a network call and cache hit. Imagine you are building a system that checks an in-memory cache, an on-disk cache, and a download operation. You've probably done this several times. Debugging this is hard because you really don't want to stop, you want to know that it's hitting all the different points appropriately. Sure logging is fine here, but that's prone to confusion if you have a noisy log. What I find helpful when debugging things like this—or any type of retain/release pattern—is to add a sound-based break point.

![](/uploads/2018/02/08/debug.png)

Now I don't have to study and read, I just use the app and listen. If I hear a `Ping`, a `Funk`, and a `Frog` sound when I'm expecting it—I know I'm on the right track. The great thing is you also don't have to stop the debug session, you can simply add these while debugging. 

I think this is a great tool and it's kind of fun! I don't use it all the time but every once in a while I find something that fits this debugging tool well. Then I can listen to my code instead of reading it.
