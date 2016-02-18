+++
date = "2011-12-07T02:15:32-05:00"
title = "Static Linking with C++ Project in Xcode"
categories = [
  "Programming",
  "Xcode",
]
slug = "static-linking-with-c-plus-plus-project-in-xcode"
+++

_This week at NSCoder Night, another developer was trying to statically link the MySQL library. He had initially linked it as a dynamic library and couldn't seem to get it working with Xcode. After working with it for a little while I figured out what needed to happen; and it wasn't clear. Here I'll discuss what process I went through to track down the problem and what tools I used._

<!-- more -->

Thinking this must be a settings issue, I dived into his project settings looking for that one linker flag that must be wrong. I saw nothing. He had his path set up properly to find the static library under /usr/local/mysql and the static library was added to the Build Phases area properly. Strange. So I started digging around with the output file. Using **otool** I inspected the file:

`$ otool -L StaticLink`

![otool is a small tool that ships with Xcode. It gives you the ability to display specified parts of object files or libraries. Using the -L switch, I'm asking the object file to show me the shared libraries this object file uses.](/assets/images/otool.png)

In his case, however, otool showed me that the library was still dynamically linking against the dylib version of the library. The interesting part is that both the static library and the dynamic library lived in the same location on disk. Xcode seems to prefer linking against dynamic libraries over static libraries so it just loaded the dylib.

To get this working as expected I had to remove the static library from his project and add a line in OTHER_LINKER_FLAGS that is a direct link to the static library (/usr/local/mysql/libmysql.a). This way the linker is forced to load the static library over the dynamic library. Pretty straight forward but it was pretty frustrating for a while there.
