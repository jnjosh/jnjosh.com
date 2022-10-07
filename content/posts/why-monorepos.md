+++
title = "Why Monorepos?"
date = "2022-10-06T23:27:17-04:00"
categories = [
	"Software Development",
	"Engineering Manager"
]
+++

I really like the idea of "asking a lot of dumb questions to learn fast" and while I don't think this is a dumb question it's kind of dumb in that it's a controversial question on the internet. Maybe I can learn something at least? So here it goes. 

Why are so many developers so smitten with monorepos?

<!--more-->

What's a monorepo? From [Wikipedia](https://en.wikipedia.org/wiki/Monorepo), it's a "software development strategy where code for many projects is stored in the same repository". All your different apps, libraries, and utilities are in one large repository, a "shared codebase". As you can imagine stashing a bunch of disparate projects into one large repository leads to some problems, namely size. This leads to tools like [Rush](https://rushjs.io) for Javascript developers to help manage the monorepo. A lot of large tech companies, including those I've worked with use this. Continuing on Wikipedia we see some benefits:

- **Ease of code reuse** - when all the code is in one big directory you can just reference anyone else's code (libraries ore even projects) without needing any sort of dependency management or semantic versioning.
- **Simplified dependency management** - Since many projects in the monorepo may depend on similar third-party libraries, they can be optimized and provided consistently by the monorepo.
- **Atomic commits** - When you need to make a large change affecting multiple projects and libraries, you can push it all together without chaining releases. For example, a model change can be made in a library, the frontend, and the backend all in one pull request.
- **Large-scale code refactoring** - Similarly to atomic commits, you can do large refactors across multiple projects in the course of one pull request—making sure everything continues to work as expected after the pull request is merged.
- **Collaboration across teams** - With all projects, owned by different teams, the code ownership model is much more flexible. You can contribute to and receive contributions from other teams.

I've spent most of my career working on native software (iOS, macOS, Windows, etc), but did do some web development here and there. I say that because I think I've mostly—but not exclusively—seen monorepos coming from web development teams. Maybe that's why this is such a strange idea to me? I know it's not quite this bad but it reminds me of development before adopting version control systems where we'd just store the code on a network drive—everything in one directory is easier!

That's a bit extreme and when I think about this more critically there are some clear benefits, namely **atomic commits**. One team I worked on we built a distributed codebase where a rich model layer was in it's own repository. In the early days when a team owned that project, it was great. Contributions were open, but the team aimed to work with the frontend team to make sure their needs were met by the time it was needed. No silos, everyone talked! As things change, that project became ownerless and people just started making changes—forced to do a [semantic versioned](https://semver.org) release for every change. This would be fine if there were many consumers of that library, but there was one client app. 

This was a design problem that multiple repos highlighted. A design problem that would have made more sense for it to start in the repository of the client application, and only moved to a separate repo if more applications started using the project. So for a single application, even heavily factored into core components and libraries, I think I'm newly open to that just being one repo. You can still maintain code ownership with Github features, and even publish semantic versions if you want, but can take the benefit of those **atomic commits**.

Maybe that is my core struggle with this idea. The above project was all one iOS application written in Swift with the occasional Objective-C. Should there be another iOS app in that repo? Should the Android app have been in that repo too? I don't think so but maybe that's not just about multiple applications, but also multiple technologies all in one large repo. Maybe this is why web folks like it, when everything is Javascript why draw boundaries!?

Also, what about the rest of those benefits? Anyone can change anything? So you save the effort of managing dependencies by opening up the risk of uncontrolled changes. Friction can be good to a software project. If I look at those benefits again, I could probably talk to why it's good that you can't do that or why it's already possible without putting all your code in one repo. Let's do it!

**Ease of code reuse** - It is easier if all the code out there is easily accessible, but is that really what you want? That seems like a very stack overflow copy paste solution to just access any solution provided in the monorepo. I'd rather build on a solid foundation, even at the cost of velocity. You make up for it when the worst happens because you have clearer boundaries to debug.

**Simplified dependency management** - It is simpler to not have to think about versions, but is that better? Package dependencies are still required for third party tooling so you aren't avoiding it and at best you are losing out on meaningful semantic versioning allowing you to rollback dependencies easily without having to manage all the commits of an entire repository. Additionally a good framework team can predict needs and work with you to best provide APIs that solve more than just your needs.

**Atomic commits** - As I noted above, this is a benefit I can get behind, but I don't know that it's always what you want in a distributed set of apps and libraries. Friction is good and not everything needs to be hacked together in the same pull request. It can be fine to build the foundations in one library at a specific version, then add support in the app in another repo. I do understand that it's hard when teams are working with fewer people than they need and there may not be anyone to own that library you need to contribute to.

**Large-scale code refactoring** - If your project is so coupled that you need to do such large scale refactoring where this is valuable, I wonder if your problem is not the repo but the codebase. Code is a liability, not an asset. I'd rather have a heavily factored set of projects that have clear protocols and when one isn't meeting needs, replace it. This sounds to me like everything is so interconnected that it's hard to reason about, so you need to have it all in one folder so you can just unravel the spaghetti.

**Collaboration across teams** - Multiple repos already provide this sort of collaboration in a more sustainable and arguably responsible way—you just contribute to their repository. I know I know, there is overhead in that in time and velocity, but really shouldn't we be aiming for sustainability? I know in a monorepo you can still use code ownership to force a team to be required to review pull requests, but that's not always great. One large pull request could end up requiring dozens of code reviews because you've touched multiple teams's owned code. I know that's the same with multiple repos, but that's my point.

---

I think there is an artificial feeling to this that makes me feel like it's about perceived speed and velocity, not good software organization. In many of these cases it seems to aim to remove all barriers to any contribution instead of building good foundations.

And I'm not even getting into the massively large size of these monorepos.

So… with all that, I'm starting to come around on it to a point. I do think having _all_ applications in one repo is not worth the tradeoffs. However, I do understand why a large web app would want to be a monorepo with all libraries accessible in the repo—it's all one stack. I think I also understand a platform as a monorepo as well, those scenarios where the application stack is a platform and apps are built on that platform. 

There is a certain reality to it that I understand. Teams and organizations change. Ownership and focus changes. When there is no team to own something, it can very quickly lead to a library or project getting duplicated instead of made a true dependency. These realities open my mind up to it a bit more.

I read somewhere that "Understanding requires effortful engagement" and I think I just did this exercise here. I'm not convinced this is the best path for an organization, but I think I understand it more and maybe would choose to group more projects together—especially if they are all in the goal of shipping a single application in a single technology stack. What do you think? I'd love to continue thinking through this and if you have experiences that talk to monorepos, I'd love to hear. Let's talk on [twitter](https://twitter.com/jnjosh).
