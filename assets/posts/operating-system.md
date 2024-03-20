---
title: "Custom Operating System"
description: "A course-long project for COSC 562 – Operating Systems: Design & Impementation"
date: "2023/12/11"
written: "December 17, 2023"
edited: "December 17, 2023"
status: "Completed"
haslink: true
link: "https://github.com/s4mpl/cs562"
---
> **DISCLAIMER:** This was a five-person group project, and it certainly would not have gotten done without the respectable efforts of most of my teammates. However, I would like to take credit for a majority of the work aside from the starred bullet points below. :-)

This operating system runs in QEMU and targets the RISC-V architecture. It is written in C and boasts the following features:
* page-grained physical memory allocation
* RISC-V Sv39 MMU (39-bit virtual addresses, 56-bit physical addresses)
  * separate address spaces for the kernel heap and each process' stack and heap
* PCIe memory-mapped I/O
* drivers for the following VirtIO devices:
  * random number generator*
  * keyboard input*
  * tablet input
  * block devices (to mount `.dsk` files to)
  * GPU (drawing rectangles, circles, and strings from a bitmap font)
* Minix 3 file system*
* processes and round-robin scheduling*
* runnable ELF files loadable from the file system
* support for user space applications, including system calls
  * currently runs a primitive version of MS Paint that allows for drawing with a fixed set of colors and sizes, saving a selection of the screen as a PPM image, and pasting an existing PPM image from the file system

The `README.md` file included in the [repository](https://github.com/s4mpl/cs562) is a journal of the project's progress and highlights most of the major bugs and challenges we overcame. I don't have access to the original commit history, so unfortunately that is gone forever.

<hr>

Here's a small showcase of the user space application in action:

<figure class='text-center'>
  <img width='500px' height='500px' src='/images/operating-system/operating-system-1.gif' class='mx-auto'/>
  <figcaption>Input device events captured for drawing.</figcaption>
</figure>

<figure class='text-center'>
  <img width='500px' height='500px' src='/images/operating-system/operating-system-2.png' class='mx-auto'/>
  <figcaption>Various colors and brush size combinations selectable via the keyboard.</figcaption>
</figure>

<figure class='text-center'>
  <img width='500px' height='500px' src='/images/operating-system/operating-system-3.gif' class='mx-auto'/>
  <figcaption>Loading a PPM image from disk&mdash;Dr. Marz has never looked better!</figcaption>
</figure>

<figure class='text-center'>
  <img width='500px' height='500px' src='/images/operating-system/operating-system-4.png' class='mx-auto'/>
  <figcaption>Copying a selection, saving it to disk as a PPM image, and pasting it.</figcaption>
</figure>

Admittedly not a very professional theme (so I've avoided marketing it such), but we were having a lot of fun with it and did a play on words with the game *Among Us* and arrived at...
<figure class='text-center'>
  <img width='500px' height='500px' src='/images/operating-system/operating-system-5.gif' class='mx-auto'/>
  <figcaption>Splash screen upon booting the OS (plus a use of the random number generator).</figcaption>
</figure>
