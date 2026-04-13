+++
title = "The Lake Mistake"
+++

# The Lake Mistake

I grew up near Cleveland in the 80s, pretty much right near the lake. Lake Erie was a well-documented mess in the 70s and I heard all sorts of stories from my Dad about flicking cigarettes into the river only to see a flash of fire as it hit the surface. The Cuyahoga River, which drains into it, famously caught fire in 1969. Not once. Multiple times. The most famous fire made the national news but outside of my Dad's stories, it wasn't something I thought about. I moved out of Northeast Ohio in the late 90s.
<br /><br />
About a year ago I started playing music. Guitar mostly, messing around with samplers and synthesizers. I work and play music in my home office. My closet in here was packed. Full of stuff from years of living here, and I had a few of those boxes full of stuff I haven't looked at in years. My Cedar Point employee badge, photos of my sister as a baby, and a weird glass sphere that someone in my family had handed me at some point (that's a guess, I honestly couldn't tell you where it came from). It was sealed, looked like something an old fisherman would use to weigh down his nets. I never gave it any attention, it was just a thing in that box of stuff.
<br /><br />
One night I was playing guitar and I noticed something. A noise coming from the closet. I stopped to go investigate. Nothing. This went on for a while—I could barely hear it. It wasn't random, only made noise when I was playing. Otherwise… Silence.
<br /><br />
I probably should have left it alone.
<br /><br />
Instead I spent the next few weeks figuring out what was in there. I won't go into all of that. What I'll say is that it was probably from the lake (a lot of calls to family uncovered a bit of a family legend). It was definitely reacting to sound in a way I couldn't explain and still can't really. Something in the chemistry of decades-old industrial pollution apparently has opinions about music. Who knew?
<br /><br />
The obvious (to me anyway) next step was to figure out how to get that sound out of it. If it was going to react to my guitar, I wanted to hear what it was doing. So I started hacking. I've been an engineer for almost 30 years, but I don't have a background in electrical engineering. I rigged up what I can only describe as a guitar pedal, except instead of circuits it was interfacing with whatever was alive in that sphere. The fuzz you get from it sounds like nothing I've ever heard from a normal pedal, gritty and wrong in a specific way. The chorus is murky. The reverb decays like something sinking.
<br /><br />
I called it "The Lake Mistake". Partly because of where it came from, partly because interacting with this… thing… was probably a mistake.
<br /><br />
The whole thing is now an AUv3 plugin for iOS. "Pedal" is still the right mental model for it, with dials for Fire, Warble, and Shimmer, which are what I started calling the three main behaviors I noticed when I was first mapping its responses. The presets are named after things from that era of Cleveland history. Cuyahoga River. River Fire. Dead Lake. It felt right.
<br /><br />
I don't know what's in the sphere exactly. I haven't tried to find out scientifically. Some things are better left unknown. What I do know is that it's been in my closet for all these years and only started reacting when I started playing music. I assume that means something.
<br /><br />

---

## Introducing, The Lake Mistake

*The Lake Mistake is an AUV3 effects plugin for iOS, link coming soon…*

<figure>
  <img src="/uploads/2026/lakemistake.png" />
</figure>

---

## Instructions

### Using The Lake Mistake in a Host App

The Lake Mistake works as an AUv3 audio effect plugin, which means it runs inside a host application on your iPad. Compatible hosts include GarageBand, Logic Pro, AUM, Loopy Pro, and most other AUv3-capable apps. The process is similar across all of them: add it as an Audio Unit effect on a channel or track, open the plugin interface, and it's running.
<br /><br />
In GarageBand or Logic Pro for iPad, add it as you would any Audio Unit effect—find it in the plug-in slot under Audio Unit Extensions. In a dedicated host like AUM, create an audio channel and insert The Lake Mistake in the effects chain. From there, you can route any audio source through it: a live instrument input, a track, a loop, whatever you're working with. The plugin processes audio in real time, so what you're hearing is what it's doing.
<br /><br />
Once it's loaded, you'll see five controls.
<br /><br />
**Fire is the fuzz:** it's the grit and distortion. Low values give you a subtle edge; push it up and things start to break apart in a way that doesn't behave like a normal distortion pedal. That's by design.
<br /><br />
**Warble is the chorus:** modulation that adds thickness and movement to the signal. At moderate levels it feels waterlogged. At high levels it becomes genuinely murky, like something that's been submerged.
<br /><br />
**Shimmer is the reverb:** but the decay has a metallic character to it, more like a resonating steel structure than a room. At lower values it's a subtle tail; higher values and it starts to feel like the sound is bouncing around inside something industrial.
<br /><br />
**Gain** controls the input level into the plugin. If your signal is clipping or too quiet before it hits the effects, this is where to start. Default is 0.5.
<br /><br />
**Mix** blends the dry (unprocessed) and wet (processed) signals. All the way up is fully wet—only the effect. Pull it back to layer the processed signal over your original. At lower values The Lake Mistake starts to behave more like a color and less like a transformation.
<br /><br />
You can also save your own presets. Next to the preset selector there's a button that opens a dialog—give it a name, and your current settings are saved. Your presets show up under a User section in the preset list. They're stored locally on the device and aren't synced across devices.
<br /><br />
The presets are a good starting point for understanding what the plugin can do. Each one is named after something from the industrial history of Cleveland—the era of the Cuyahoga River fires and the ecological death of Lake Erie. The settings aren't arbitrary; each one is tuned to evoke something specific about that history.
<br /><br />

---

### Presets

**Cuyahoga**: Named for the river itself. This is the balanced starting point. Moderate Fire, moderate Warble, light Shimmer, with the mix pulled back slightly. It sounds like the river: present, a little off, but not catastrophic. A good place to start if you're new to the plugin.
<br /><br />
**River Fire**: June 22, 1969. The fire that made national news, the one that ended up on the cover of Time magazine. Fire is pushed near the top, everything else kept low so the fuzz reads clearly. A single dominant, ugly thing happening. The mix is fully wet. There's nothing subtle about it.
<br /><br />
**Dead Lake**: By the mid-1960s, Lake Erie was declared ecologically dead. Oxygen depleted, fish gone, the water a biological catastrophe. This preset reflects that: Warble is maxed, Fire is almost nothing. It's suffocating and murky. The reverb sits in the background like a distant echo of what used to be there.
<br /><br />
**Oil Slick**: The surface of the Cuyahoga before the cleanup: an iridescent film of industrial waste floating on top of the water. Warble-forward with just enough Fire underneath to give it a little heat. Shimmer is dialed way down—nothing metallic, just the slow slick movement of the surface.
<br /><br />
**Rust Belt**: The mills and bridges and infrastructure of the industrial Midwest. Not the pollution itself, but what caused it. Shimmer leads here, giving it that metallic structural resonance, with relatively clean fuzz underneath. This one sounds like steel.
<br /><br />
**Sludge**: The bottom of the river. Warble is maxed; Fire is almost off; Shimmer is barely there. It's the most extreme "wrong" sound in the set. Whatever was at the bottom of the Cuyahoga in 1969 probably sounded like this, if it made any sound at all.
<br /><br />
**Steel Rain**: Industrial runoff from the mills hitting the water surface. Shimmer-dominant with some Warble ripple underneath, like watching it from the bank. The mix is fully wet—you're standing in it.
<br /><br />
**Soot Fall**: By 1941, Cleveland's estimated annual soot-fall from the steel mills was 90 lbs per person. This preset is hazy and ambient, the mix pulled back to 65% so it sits behind the dry signal like a film over everything. You're not drowning in it. It's just always there.
<br /><br />
**Blast Furnace**: The equipment at Cleveland Works on the Cuyahoga, a place that was actually producing steel on the banks of a river that was on fire. Fire and Shimmer are both high, gain is lower to keep it controlled. It's loud and metallic and chaotic in the way that industrial production at full tilt is chaotic.
<br /><br />
**Algae**: The slow biological bloom that choked the surface of Lake Erie as the water died. Heavy Warble, almost no Fire, some Shimmer from the light catching the surface. It moves slowly. It doesn't burn. It just spreads.
