+++
title = "Designing Interviews for Engineers"
date = "2021-06-27T18:44:58+00:00"
categories = [
    "Hiring",
    "Engineering Manager",
    "Business"
]
+++

Interviewing is hard and there are a lot of problems in the industry and the processes that we use. A lot of companies rely on a half to full day interview cycle to both get an idea of the candidate’s skills/fit and give the candidate an idea of what your team is about. 4–5 hours is hard to give both employer and candidate a complete picture of what it’s like to work on this team.

I think about this too much probably and I think we as an industry can do better at hiring engineers. When I was at Highrise I worked a lot to help [rebuild our system for hiring](https://jnjosh.com/posts/onhiringathighrise/) and as a hiring manager in my current role, I'm continuing to think how to best do this.

I think we all know the answer in a perfect world. *Design the interview for each candidate*. This is hard of course because this kind of due diligence in hiring takes time and time is the thing hiring managers often lack.

I think we can have this though. I think we can build a system that allows us to do this due diligence, but also is a system we can rely on to design it in our busy schedules. My current thinking on interviewing has grown from two key tenets.

- It's the hiring manager's job to guide and design an interview for each candidate.
- There should be a source of truth that anyone on an interview team can use to know the background of the candidate, the plan for the interview, and the expectations for each interviewer.

Let’s dive into this a bit more.

### It's the hiring manager's job to design the interview

As former engineers, we engineering managers want to build systems that can be easily relied on. Unfortunately, this leads to many hiring managers applying the same interview to every candidate as if it’s a function where the input is the new candidate and the output is a true/false decision on if they “fit” and have the skills. It often goes something like: let’s have the candidate do several [leetcode](https://leetcode.com) challenges, give them a few trick or clever questions, and use our guts to determine if they are a good candidate.

This is very subjective and it doesn’t really take into account that people have different backgrounds and experiences.

People can be anxious or just distracted in an interview. Building a system that tests them on areas that aren’t what they would do from day to day and trying to trick them or test them under stress leads to false results. In fact this just builds on those anxieties.

Instead let’s try to do better. Let’s try to use what we know about the candidate to design an interview for them that best answers the questions of “should we hire them?” and “what’s it like to work with them?”. You or someone on your team has likely done an initial screening call with them. Assuming you want to move to the next step, ask questions about what you know from that call or from their resume.

- They were really strong with architecture but didn’t really talk much about testing. Are they a good tester?
- They had some really good fundamentals but their designs were not clear or too clever. How would they build an architecture with your business’ challenges?
- They were heads down and finished every challenge during the screening but they didn’t talk at all. How would they communicate with the rest of the team or non-technical stakeholders?

These questions can inform what to do next. They help you design the best interview for the candidate. Here’s where you can start relying on systems. Build yourself a library of projects that can be sorted by “focus area” and “level”. Then add some common questions for each project and what you’d expect to see from candidates when given the project. This takes work but it can be reused for a long time.

These projects should be specific to the type of work your team does—think about having the candidate build a UI with a similar spec to what your team uses instead of general algorithm questions. You can bake the algorithm problem into the project’s goals of course, but it alone is not the point. Then for each project give it a general focus area and level.

The best projects are more closely related to your business, but some vague examples could be:


{{< highlight markdown >}}
- Build an image app that downloads results from flickr and displays them.
	- Focus Area UIKit, Networking, API
	- Level: Software Engineer II–Senior Engineer
	- Common Questions and Notes:
		- Do they properly separate concerns between API functionality and UI?
		- Do they communicate about how they want to build it and work with you
		  or just go heads down?
		- If they breeze through this section move on to either unit testing 
		  or more architectural questions about their implementation.
- Implement a framework for providing autocomplete search results 
  from the Github API
	- Focus Area: Architecture, API Design
	- Level: Senior Engineer–Staff Engineer
	- Common Questions and Notes:
		- How did they approach their access to components? 
		- Is their design a pass through to the API or something more modeled 
		  to the problem? How would they improve it?
{{< / highlight >}}

You can prep projects to help get them started—you only have an hour and seeing people set up a project isn’t always the most valuable use of time. Then share it with them at the beginning of the interview or earlier if your company utilizes take home projects. All of these also give you the opportunity to see how they work with the tools you use daily.

Building a library like this gives you many different focus areas that you can plug in to best determine this candidate’s skill level, communication level, and what it’s like to work with them. Further, by designing this for each candidate you have fewer chances of getting to a debrief and not knowing if you should hire or not.

This does take some work to set up but once you have a basic process it’s really not a heavy lift. In my experience, I’ll review all the notes for a candidate and come up with a basic interview panel in as little as 10–15 minutes. You are responsible for bringing this individual on to your team and the cost of making bad decisions is high, it’s worth taking at least a little time to think through each candidate. You are the *hiring* manager.

### Source of Truth for the Interview Plan

Now that you have built a plan for this new candidate, you need to make sure everyone on your team understands it and knows what to expect. Relying on everyone to just decide what to do during the interview leads to unanswered questions and duplicated work—which just makes you look like not a good company to join.

To avoid this I’ve started creating what I call a “prebrief” document. This is a simple document that:

- Links to all information about the candidate—their resume, previous notes from screenings, your company’s internal expectations for the relevant career level, or any other relavant data about the role or candidate.
- I’m mixed on this section, but I like to include a “tl;dr” section of the above information that summarizes the data you’ve seen so far. Some care needs to be taken here to be void of any opinions—keep it focused on the data and don’t accidentally give people your opinions on the candidate. Your team is also busy so giving them a brief they can quickly glance at helps everyone be more prepared.
- A brief schedule for each person on the panel with their focus area and highlights to look out for.

**A Sample Prebrief Document**

![hasslehoff.png](/uploads/2021/hasslehoff.png)

Now set up a brief call with your team—can be as little as 15 minutes—to go over each person’s role in the panel and aim for clarity. Each person should know what they are looking for in the interview and can give the candidate a quick agenda of what to expect.

### Summary

These two tenets have helped me build better interviews on my teams from start-ups to large businesses. It’s helped me better communicate with all the people I’m expecting to help me decide on hiring and the added clarity creates a better environment for candidates—they are told what to expect, have interviews that actually challenge them where they are, and they don’t have the same question 3 times.

What do you think? Let me know on [twitter](https://twitter.com/jnjosh). I'm constantly interested in learning how other people solve these problems so I'd love to hear what your team does.

