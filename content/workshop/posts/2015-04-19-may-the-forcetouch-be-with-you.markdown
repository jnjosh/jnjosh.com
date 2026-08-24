+++
date = "2015-04-19T01:39:32-05:00"
title = "May the Force Touch be with You"
categories = [
  "Cocoa",
  "AppKit",
  "Force Touch",
]
slug = "may-the-forcetouch-be-with-you"
+++

Last week I bought a newly updated 13" MacBook Pro with an amazing new Force
Touch trackpad. I love it and it's hard to go back to the older trackpad on my
MacBook Pro at work. I've already caught myself trying to press on the top
corners of the older version and have tried to press harder a few times. At this
week's [NSCoder Night](http://www.meetup.com/nscoderrtp) I decided to play
around with the new Force Touch API to see how it works.

<!-- more -->

Apple's [site describing the APIs](https://developer.apple.com/osx/force-touch/)
don't really go into much detail about how to use them. However it's pretty
straightforward save a few oddities. Maybe they would be more expected had I
been spending more time with AppKit.

I experimented with three different methods for detecting pressure with the new
APIs. Responding to events on the responder chain and two different types of
buttons added in 10.10.3. There are also new methods using NSGestureRecognizer
and with Drag and Drop. The gesture recognizer seemed pretty easy and close to
the events I was testing. I haven't figured out the drag and drop capabilities
yet.

### Pressure in the Responder Chain

The easiest method seems to be to simply respond to the correct method

`- (void)pressureChangeWithEvent:(NSEvent *)event;`

in your application. Inspecting the `NSEventTypePressure` type event's
`pressure`, `stage`, and `stageTransition` allow you to determine the pressure
across three stages (0, 1, 2). Looking at the `pressure` property to see the
amount of pressure between 0.0 and 1.0.  The `stage` property is aligned with
the clicks you feel when pressing on the trackpad. 0 is the stage before the
first click. 1 is the stage between the first and second click and, of course, 2
is the stage after the second click you feel. The `stageTransition` property
describes the progress towards the next stage. When positive it is approaching
the next stage, when negative it is approaching the previous stage.

### Accelerator Buttons

Another way to detect pressure is using a normal NSButton with the new type
_Accelerator_ applied. These buttons will simply invoke their action repeatedly
as pressure increases. For example, if you send the action from a button to

`- (void)buttonPressed:(id)sender;`

inspecting the `doubleValue` of the sender will tell you the pressure between
1.0 and 1.99. The action is called repeatedly until it reaches the end. It does
not have any further clicks beyond the first click you feel. Here I bind the
alpha value of a label to this value normalized to 0.0 and 1.0.

![Accelerator Button](/assets/images/forcetouch/forcetouch2.gif)

### Multi-level Accelerator Buttons

The multi-level button is similar to the regular accelerator button above except
you can specify how many levels, up to 5, the user feels when pressing the
trackpad. With this type you are notified of the level the user has reached, not
the actual pressure value. Inspecting `doubleValue` on this type of button
responds with 1.0 to _n_ where _n_ is the value you set for the button's
`maxAcceleratorLevel` property. The really fun thing here is you feel an extra
click in the track pad at each level here. This is likely how Apple implemented
the fast forward feature in Quicktime Player. Pressing harder speeds up the fast
forward feature across five levels. Here I bind a button to a progress indicator
with a max of 5.

![Multi-level Accelerator Button](/assets/images/forcetouch/forcetouch.gif)

There are some other ways to take advantage of this new trackpad. Xcode will
actually produce extra clicks when you are dragging UI elements around in
Interface Builder. When the item you are dragging reaches a recommended
constraint, you feel it. I haven't quite figured out how to do this yet.

There is also this new concept for `springLoaded` that allows you to do specific
pressure-sensitive behavior when dragging over a button.

It's been a long time since I worked with AppKit, but I've been really wanting
to get back into it and do something cool. These new gestures have me extremely
excited about what I could build to support it.
