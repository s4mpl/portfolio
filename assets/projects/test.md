---
title: "Awesome"
description: "foot cheese"
date: "1921/11/09"
written: "November 9, 1921"
edited: "February 2, 2014"
status: "In Progress"
haslink: false
---
<i class='lead'>i love robots</i>

but i love `ryze` even more

>A step ahead of cataclysm...
>
>In carnage, I bloom&mdash;like a flower in the dawn...
>
> >Power slam!
>
>It's not how much time you have&mdash;it's how you use it...

Hahaha&mdash;what the?! `{'./pages/**/*.{html,js}'}`

<a><code>test code link</code></a>
<pre>test pre only</pre>
<br>

```plaintext
pre test again
```
<br>

```plaintext
  test pre only
    but   it should preserve whitespace
```
<code>
  test code only with
  a newline
</code>

<p id='again'>See the following snippet:</p>

```cpp
#include <iostream>

int main(int argc, char *argv[]) {

  /* An annoying "Hello World" example */
  for (auto i = 0; i < 0xFFFF; i++)
    cout << "Hello, World!" << endl;

  char c = '\n';
  unordered_map <string, vector<string> > m;
  m["key"] = "\\\\"; // this is an error

  return -2e3 + 12l;
}
```
<p>The rest is detailed in my <a href='/projects/test#again'>other post</a> about organic chemistry.</p>

---

<p>See the following snippet again (without explicit syntax highlighting):</p>

```
#include <iostream>

int main(int argc, char *argv[]) {

  /* An annoying "Hello World" example */
  for (auto i = 0; i < 0xFFFF; i++)
    cout << "Hello, World!" << endl;

  char c = '\n';
  unordered_map <string, vector<string> > m;
  m["key"] = "\\\\"; // this is an error

  return -2e3 + 12l;
}
```
<p>if i try to put text in here to introduce the figure, it looks like this (not good)</p>
<figure class='text-center'>
  <img src='/images/boeing-stock.png' class='h-32 w-full hover:invert'/>
  <figcaption>Figure 1: code for the stock market</figcaption>
</figure>
if i put some really long text heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere then it behaves like this

### meet me in US310 for the following reasons:
* forgot your password
* 50 instead of 65
  - also you got a 2

Also,
1. L
2. ratio
3. broken pipe

> this is a quote `that contains a codespan` and ```maybe even this one```

<h6>jsh.c</h6>

```c
int main(int argc, char **argv, char **envp) {
  char *prompt = NULL, *in_file, *out_file;
  IS is;
  int i, status, pid, fd1, fd2, append, pipe_count, pipe_counter;
  int *pipefd; // variable-size array of all pipe pairs
  char **args = NULL, **dll_args;
  Dllist exec_calls = new_dllist(), dnode;
  JRB child_pids = make_jrb(), node;

  /* read command line to determine what the prompt should be
     if not specified, "jsh: ", and if "-", do not print one */
  if(argc > 2) return -1;
  if(argc == 1) prompt = "jsh: ";
  else if(argc == 2 && strcmp(argv[1], "-") == 0) prompt = "";
  else prompt = argv[1];

  printf("%s", prompt);
  // ...
}
```
and I can execute it with `./jsh "custom prompt> "`:
###### file.txt
```plaintext
hello
```
###### stdin/stdout
```sh
custom prompt> cat file.txt
hello
custom prompt>  
```
<br>

###### test h6 using \#\#\#\#\#\# in md
```plaintext
this is code
```