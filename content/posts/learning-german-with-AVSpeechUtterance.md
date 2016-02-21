+++
date = "2016-02-21T01:43:16-05:00"
title = "Learning German with AVSpeechUtterance"
categories = [
  "Cocoa",
  "Programming",
  "iOS",
  "AV Foundation",
  "Swift",
  "German",
]
+++

For the last couple of months I've been studying German with my wife. We both have always wanted to become polyglots so we decided to stop waiting around an just start learning. We both have some ancestors from Germany and would love to visit. One thing I've been struggling with is numbers in German. I can count well, but hearing a number in conversation requires a lot of thought. The problem is it is backwards from English, Twenty-One in German would be One-and-Twenty (einundzwanzig). So what's an iOS Developer to do? I made an app for me to practice.

<!--more-->

My problem is speed. I need to hear the word, then parse it, then translate it in my head. Everything I've read about language learning says this is the wrong way to approach learning. `Einundzwanzig` is 21, just like `twenty one`. I needed to just practice reacting to numbers. [AV Foundation](https://developer.apple.com/av-foundation/) luckily has the ability to turn text to speech with `AVSpeechUtterance`. Let's take a look at how it works.

First thing I need is to define an `AVSpeechSynthesisVoice` in my target language. If I don't do this and just accept the default, the voice utterance would be in English—unless I change my default language to German which will be a good idea as I get better.

{{< highlight swift >}}
  let germanVoice = { AVSpeechSynthesisVoice(language: "de-DE") }()
  let speechSynthesizer = AVSpeechSynthesizer()
{{< / highlight >}}

Here I just use the language code for German, `de-DE`. I also create an `AVSpeechSynthesizer` instance to use later. This is the object that I will provide the final speech utterance.

For the numbers to present, it's simple, I can just generate four random numbers. I don't need to figure out the English version of the number because I can just feed `"21"` as string to the `AVSpeechUtterance`. So the first thing I did was get a set of random numbers. I chose a set because I want four numbers that aren't the same.

{{< highlight swift >}}
  func randomNumbers(maxNumber: Int) -> Set<Int> {
    let maximum = UInt32(maxNumber + 1)
    var randomSet = Set<Int>()

    while randomSet.count < 4 {
        randomSet.insert(Int(arc4random_uniform(maximum)))
    }

    return randomSet
  }
{{< / highlight >}}

Next, I need to pick one to be the spoken number and the _right_ answer. Here I'm a little lazy and just store it to a local property.

{{< highlight swift >}}
  let options = Array(self.randomNumbers(100))

  // update UI with numbers… Basically set four buttons to the four random numbers.

  let chosenIndex = Int(arc4random_uniform(4))
  let number = options[chosenIndex]

  self.chosenNumber = number
  self.sayNumber(number)
{{< / highlight >}}

Now I just need to send that number on to be spoken.

{{< highlight swift >}}
  func sayNumber(number: Int) {
      let numberString = "\(number)"
      let utterance = AVSpeechUtterance(string: numberString)
      utterance.voice = self.germanVoice
      self.speechSynthesizer.speakUtterance(utterance)
  }
{{< / highlight >}}

Gut! Now the number will be spoken and if I tap the right button I move on to the next number. Not bad for a few minutes of AV Foundation fun. This has already helped me get much faster at hearing numbers in conversation.

<figure>
  <img src="/assets/images/german/numbers.png">
  <figcaption>Here it said "drei" which is 3. Tapping the right answer starts the loop all over again.</figcaption>
</figure>
