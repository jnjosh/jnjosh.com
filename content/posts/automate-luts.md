+++
title = "Automating LUTs on Video"
date = "2024-05-27T14:43:58-04:00"
categories = [
	"Video",
	"Scripting"
]

+++

My wife and I have worked on [our YouTube channel](https://www.youtube.com/@natandjosh) from time to time and one thing that comes up regularly is how we capture video differently. We normally use our iPhones as that's the sort of best middle ground of good video and convenience. However, I often get fancy and use apps like the new-ish [Blackmagic Camera App](https://www.blackmagicdesign.com/products/blackmagiccamera?gad_source=1&gclid=Cj0KCQjw3tCyBhDBARIsAEY0XNnpfG6F-RXRVSEfO1VFIH3-FirVydbEIQ8s0ll5wcHh9-9P3dyM9E0aAugEEALw_wcB) to record ProRes 422 HQ / Apple Log footage on my iPhone 15 Pro. That's great and all but a lot of the time, Nat will edit the videos as I'm at work or something. So then she has to color correct the videos and the pipeline just gets really annoying. Of course, I could just stop being so fancy and just record in the camera app with the same settings as her footage. Hmmmmm… should I?

<!--more-->

Nah, of course not! I'll just script away the problem. So I wrote a bash script that takes in my Log profile based footage, applies the LUT Apple provides to bring it back to Rec.709, and also samples it down to regular ProRes 422—to save some space.

First, you'll need a couple tools. Like I said you need a LUT to apply. Thankfully Apple provides a nice LUT on their [developer site](https://developer.apple.com/download/all/?q=Apple%20log%20profile)—I use the `AppleLogToRec709-v1.0.cube` option as I'm recording in Apple Log and Rec.709 is good enough for our YouTube purposes. Other LUTs are out there in the community too if you'd prefer something else.

Next you'll need a tool that can apply this lut to your video. If you haven't used it, [ffmpeg](https://ffmpeg.org) is a tool for working with audio and video and… it is a lot, but it'll do great for what we need.

{{< highlight bash >}}
$ brew install ffmpeg
{{< / highlight >}}

Now you just need to run `ffmpeg` with some settings, provide it the LUT and go. Here's what the settings I'm using do:

{{< highlight bash >}}
	ffmpeg \
		-hide_banner \   			## Hide command line updates, quiet mode
		-loglevel error \			## Only show errors, I don't want it to be verbose
		-i ${filename} \			## The INPUT file name
		lut3d="lut.cube" \			## Apply the LUT itself
		-c:v prores_ks \			## Encode into ProRes, still want some quality ;)
		-profile:v 2 \				## Lower to ProRes 422, not
		-c:a copy \					## Copy settings in output
		Converted-${filename}		## The OUTPUT file name
{{< / highlight >}}


Like I said, FFMPEG is a lot, but you can generally get it to do what you need with some tinkering. So with that, I wrapped it up into a nice little script:

{{< highlight bash >}}
#!/bin/bash

# The I'm too fancy script

DIRECTORY=$1
OUTPUT=$2

pushd ${DIRECTORY} > /dev/null

for filename in *; do

	echo "Applying LUT to ${filename}"
	ffmpeg \
		-hide_banner \
		-loglevel error \
		-i ${filename} \
		-vf \
		lut3d="AppleLogToRec709-v1.0.cube" \
		-c:v prores_ks \
		-profile:v 2 \
		-c:a copy \
		${OUTPUT}/Converted-${filename}	
done

popd > /dev/null

{{< / highlight >}}

Now I can just process the files easily…

{{< highlight bash >}}
$ ./convert ./Input /Users/jnjosh/Desktop/Convert/Output
{{< / highlight >}}

…and then share the resulting Rec.709 files for editing. I'm sure there is a nice way to do this out there but that wouldn't be so fun.
