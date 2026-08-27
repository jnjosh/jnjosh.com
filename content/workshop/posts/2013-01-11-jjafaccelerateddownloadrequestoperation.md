+++
date = "2013-01-11T22:30:32-05:00"
title = "Accelerated Download Operation with AFNetworking"
categories = [
  "Cocoa",
  "Objective-C",
  "Open Source",
]
externalurl = "https://github.com/jnjosh/JJAFAcceleratedDownloadRequestOperation"
slug = "jjafaccelerateddownloadrequestoperation"
+++

Late last year I started working on a little experiment. I wondered if it was possible to speed up a download of a large file by splitting up a request and making multiple concurrent requests using HTTP Byte range requests.

So I put together a subclass of [AFNetworking's](http://afnetworking.com) `AFHTTPRequestOperation` that can do just that. I found that it works best with about 3 concurrent requests. Any more than that and the overhead of the different operations and combining them seems to take longer than one request. Overall, when running on WiFi it seems to work faster than one operation.

I also created a custom progress bar that can show different parts of the download being finished. It is a pretty cool little project in itself! Even though it is slower with more than 3 requests, the progress bar looks really cool when you tell it to split into 100 requests and it shows them all completing.

Check out the source and send me any comments ideas you have or contribute, if you like. There are a lot of things I'd like to experiment with this idea and try to do some testing to see if it really is faster.
