+++
date = "2013-02-07T23:30:32-05:00"
title = "Fun with CGGeometry"
categories = [
  "Objective-C",
  "Cocoa",
]
slug = "fun-with-cggeometry"
+++

Deep inside of the Core Graphics framework, there is a treasure trove of awesome known as __CGGeometry.h__. It isn't as obscure as a lot of the corners of the Cocoa frameworks; last Decemeber [__NSHipster covered many of the details__](http://nshipster.com/cggeometry/) behind this collection of geometry tools. However, I still see a lot of code that does geometry the hard way. It often helps for me to visually see how things work together, so I put together the following samples for your geometry needs.

<!-- more -->

How many times have you seen or written code like this:

{{< highlight Objective-C >}}
    CGRect myFrame = CGRectMake(self.view.frame.origin.x + self.otherView.frame.origin.x / 2, 0, self.view.frame.size.width, self.view.frame.size.height - self.otherView.frame.size.height);
{{< / highlight >}}

Sure, if you actually look at the frame I've built there it makes no sense, but you'd have to really study what is going on and visualize the frame being created. CGGeometry provides a lot of great tools to deal with situations like these.

### CGRectInset

`CGRectInset` provides a way to get a smaller CGRect by moving inside an existing rect:

{{< highlight Objective-C >}}
    CGRect originRect = (CGRect){ 10.0f, 10.0f, 80.0f, 80.0f };
    CGRect insetRect = CGRectInset(originRect, 10.0f, 10.0f);

    UIView *outerView = [[UIView alloc] initWithFrame:originRect];
    [outerView setBackgroundColor:pinkishColor];
    [self.view addSubview:outerView];

    UIView *innerView = [[UIView alloc] initWithFrame:insetRect];
    [innerView setBackgroundColor:greenishColor];
    [self.view addSubview:innerView];
{{< / highlight >}}

![CGRectInset](/assets/images/cggeometry/cgrect-inset.png)

### CGRectOffset

`CGRectOffset` provides a way to create a new CGRect by offsetting an existing CGRect:

{{< highlight Objective-C >}}
    CGRect originRect = (CGRect){ 10.0f, 10.0f, 80.0f, 80.0f };
    CGRect outsetRect = CGRectOffset(originRect, 10.0f, 10.0f);

    UIView *firstView = [[UIView alloc] initWithFrame:originRect];
    [firstView setBackgroundColor:purplishColor];
    [self.view addSubview:firstView];

    UIView *secondView = [[UIView alloc] initWithFrame:outsetRect];
    [secondView setBackgroundColor:tealishColor];
    [self.view addSubview:secondView];
{{< / highlight >}}

![CGRectOffset](/assets/images/cggeometry/cgrect-offset.png)

### CGRectUnion

`CGRectUnion` provides a way to get a new CGRect by combining the bounds of the two provided CGRect values:

{{< highlight Objective-C >}}
    CGRect originRect = (CGRect){ 10.0f, 10.0f, 80.0f, 80.0f };
    CGRect otherRect = CGRectOffset(originRect, 20.0f, 14.0f);
    CGRect unionRect = CGRectUnion(originRect, otherRect);

    UIView *nonunionView = [[UIView alloc] initWithFrame:originRect];
    [nonunionView setBackgroundColor:purplishColor];
    [self.view addSubview:nonunionView];

    UIView *nonunionView2 = [[UIView alloc] initWithFrame:otherRect];
    [nonunionView2 setBackgroundColor:pinkishColor];
    [self.view addSubview:nonunionView2];

    UIView *unionView = [[UIView alloc] initWithFrame:unionRect];
    [unionView setBackgroundColor:grayishColor];
    [unionView setAlpha:0.5f];
    [self.view addSubview:unionView];
{{< / highlight >}}

![CGRectUnion](/assets/images/cggeometry/cgrect-union.png)

### CGRectIntersection

`CGRectIntersection` provides a method for taking overlapping area of two CGRects and creating an intersection CGRect of that intersection:

{{< highlight Objective-C >}}
    CGRect originRect = (CGRect){ 10.0f, 10.0f, 80.0f, 80.0f };
    CGRect intRect1 = (CGRect){ originRect.origin, { 80.0f, 80.0f } ;
    UIView *rect1View = [[UIView alloc] initWithFrame:intRect1];
    [rect1View setBackgroundColor:purplishColor];
    [self.view addSubview:rect1View];

    CGRect intRect2 = CGRectOffset(originRect, 40.0f, 40.0f);
    UIView *rect2View = [[UIView alloc] initWithFrame:intRect2];
    [rect2View setBackgroundColor:tealishColor];
    [self.view addSubview:rect2View];

    CGRect intersectRect = CGRectIntersection(intRect1, intRect2);
    UIView *intersectView = [[UIView alloc] initWithFrame:intersectRect];
    [intersectView setBackgroundColor:pinkishColor];
    [self.view addSubview:intersectView];    
{{< / highlight >}}

![CGRectIntersect](/assets/images/cggeometry/cgrect-intersect.png)

### CGRectDivide

`CGRectDivide` is a fascinating function. It will take a CGRect and divide it into two CGRects with a specified offset from a specified edge:

{{< highlight Objective-C >}}
    CGRect bigFrame = (CGRect){ CGPointZero, { 160.0f, 260.0f } };

    UIView *bigView = [[UIView alloc] initWithFrame:bigFrame];
    [bigView setBackgroundColor:[UIColor yellowColor]];
    [self.view addSubview:bigView];

    CGRect split1;
    CGRect remainder;
    CGRectDivide(bigFrame, &split1, &remainder, 130.0f, CGRectMinYEdge);

    // Now we have two CGRects:
    //     split1 = { { 0, 0 }, { 160, 130 } }
    //     remainder = { { 0, 130 }, { 160, 130 } }

    UIView *split1View = [[UIView alloc] initWithFrame:split1];
    [split1View setBackgroundColor:blueishGreyColor];
    [self.view addSubview:split1View];

    CGRect split2;
    CGRect remainder2;
    CGRectDivide(remainder, &split2, &remainder2, 80.0f, CGRectMinXEdge);

    UIView *split2View = [[UIView alloc] initWithFrame:split2];
    [split2View setBackgroundColor:greenishColor];
    [self.view addSubview:split2View];

    CGRect split3;
    CGRect remainder3;
    CGRectDivide(remainder2, &split3, &remainder3, 65.0f, CGRectMinYEdge);

    UIView *split3View = [[UIView alloc] initWithFrame:split3];
    [split3View setBackgroundColor:pinkishColor];
    [self.view addSubview:split3View];
{{< / highlight >}}

![CGRectDivide](/assets/images/cggeometry/cgrect-divide.png)

### Summary

There are many more great tools available in __CGGeometry.h__ that will help you avoid writing code like that horrible sample above. If you haven't already, head over to [NSHipster and read more about it](http://nshipster.com/cggeometry/). Learn these tools and use them, you won't regret it.
