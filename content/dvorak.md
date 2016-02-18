+++
title = "Switching To Dvorak"
+++

In August 2012 I began typing with the [__dvorak keyboard layout__](http://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard). Having heard about it for years and seeing a friend using it at work, I realized how bad my typing skills had been. Something had to be done.

### Why?

Remember those typing classes you took in middle school? High School? I never entered that classroom. Over the years, I developed my own form of _"memorized hunt and peck"_ that kept me moving pretty slow on the keyboard. It also introduced me to a lot of arm and wrist pain. The major benefit of the Dvorak system is the comfort you feel, not the speed. With this benefit and my lack of touch-type QWERTY skills I began practicing Dvorak. __Cold turkey.__

<br />

<div id="dvorak"></div>

### Current Status

- Data Last Updated: __2013-02-05__
- Arm Pain: __None__
- My Record WPM: __76__
- Days typing Dvorak (as of above date): __158__

<br />

_The graph (last updated: 2012-02-05) of my progress measured in WPM using [**Type Fu**](http://type-fu.com)._

<script>

function drawLineChart(){
  var width = document.getElementsByClassName('content')[0].clientWidth;

  var r = Raphael("dvorak");
  $.getJSON("/assets/typefu.json", function(data) {
    var wpm = data.speedHistory,
    xaxis = [];
    for (var i = 0; i < wpm.length; i++) {
      xaxis[i] = i;
    }
    r.linechart(0, 0, width, 300, xaxis, wpm, { shade: true, smooth: true });
  });
};

window.onload = function () {
  drawLineChart();
};


</script>
<script src="/assets/js/raphael-min.js" type="text/javascript" charset="utf-8"></script>
<script src="/assets/js/g.raphael-min.js" type="text/javascript" charset="utf-8"></script>
<script src="/assets/js/g.line-min.js" type="text/javascript" charset="utf-8"></script>
