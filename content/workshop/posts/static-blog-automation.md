+++
title = "Static Blog Automation"
date = "2018-01-19T00:11:12-05:00"
categories = [
  "Blogging",
  "Hugo"
]
+++

As I've written about in the past [this blog is powered by Hugo](/posts/goodbye-octopress-hello-hugo/)—a static site generator. That's great and all but it really limits when I can write posts. Something running Hugo needs to build the site and that output needs to be published somewhere. I've done a few things to make this process a more automatic.

<!-- more -->

## Writing Posts on my MacBook Pro

First of all I needed to make it much easier to create a new post. [My theme](https://github.com/jnjosh/internet-weblog) has three types of post content and it's not easy to remember which command I need to do the right type of post. To solve this I created some simple bash scripts to help out. 

{{< highlight bash >}}

function newmicropost() {
    local date=`date +%Y-%m-%d-%H%M%S`
    local file="microposts/${date}.md"
    hugo new ${file} | cut -d ' ' -f 1 | xargs subl 
}

// $1 The name of the file to create
function newpost() {
    hugo new "posts/$1.md" | cut -d ' ' -f 1 | xargs subl
}

// $1 The name of the file to create
function newphotopost() {
	hugo new "photos/$1.md" | cut -d ' ' -f 1 | xargs subl
}

{{< / highlight >}}

This is really great when I want to publish a [Micro.blog](https://micro.blog) post about some idea that pops up while working. I'm already in the terminal normally so jumping to my blog directory and typing `newmicropost` is pretty quick.

## Writing Posts on my iPad or iPhone

This is a bit more difficult and I'm still working out how to best do this. The biggest key was to not have to run Hugo myself. Offloading that task (and hosting) to [Netlify](https://www.netlify.com) powered by a Github webhook means I can create and publish from any device simply by commiting to Github. 

An app like [Working Copy](https://workingcopyapp.com) or [Clone](http://clone.hammockdistrict.com) makes this possible. It's admittedly a bit of a chore to post from the iPhone because you have to not only create the markdown file in the right place, but also create the correct front matter so that Hugo can properly generate your page. My current process is to write a post in [Ulysses](https://ulyssesapp.com), where I have a document with all the expected front matter. Then when I am ready to publish I copy that over to Working Copy and push a commit.

I'd like this all to be better. I'm really interested in what others have done here. I love having a static website, but the nature of it puts a pretty nasty obstacle in my way.
