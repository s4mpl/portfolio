---
title: "COSC 302 Lab 1: Fuel"
description: "Helpful resource for setting up your coding environment and understanding the lab writeup"
date: "2022/09/06"
written: "August 25, 2022"
edited: "August 25, 2022"
status: "TA Notes"
haslink: true
link: "https://utk.instructure.com/courses/154639/assignments/1283699"
---
[Link to the assignment on Canvas](https://utk.instructure.com/courses/154639/assignments/1283699), where you will submit your *single .tar file*.

```
tar -cvf lab1_X.tar FuelX.cpp
```

Due by **11:59pm Tuesday, September 6, 2022**
<hr>

### !!! Important information for all lab submissions !!!
I highly recommend you stay up to date with Piazza, but here I will reiterate the most important bits of [the lab submission guidelines](https://piazza.com/class/l66pusd8kg1ew/post/8) and the slides since they are *very* important and this should be like at least your third time seeing this:

* Please pay attention to both the names of your tar file *and* the source code files inside&mdash;it's case-sensitive. It makes grading easier, so we would appreciate it very much :)

* Save copies of your completed versions as `FilenameX.cpp` so that you don't accidentally overwrite something and lose *all* of your work. It also ensures you have something to turn in if you've ruined your latest version to the point that it doesn't compile.

> **WARNING:** If your code does not compile on the Hydra machines using g++, it will be a <u>**zero**</u> if we cannot immediately see the issue. It is your responsibility to make sure of this before your final submission!

* If you have a concern about your most recent lab submission or your grade, make a **_private_** Piazza post to "Instructors" about it.

* Late policy:
  * Less than 24h late: -25%
  * 24h to 48h late: -50%
  * More than 48h late: **0**
  * You have two *grace days*.

* **Don't cheat.** (please)

<hr>

### Recommended coding environments and how to set them up
There are a few options for accessing a suitable Unix-like environment on your machine, which ideally should be the only place you try to compile and run code, especially in courses later on and in life. My first semester, I tried doing a COSC 130 (230 now?) assignment on Windows and got a bug that took a whole group of TAs to figure out: whatever the bug was, it was because the size of a `long` on Windows is only 32 bits&mdash;the same as an `int`. Stupid, right? (Though there is a [reason](https://qr.ae/pvb40J)).

Anyway, some options are better than others, but you can decide what you like best. If you've taken classes here before and/or you're already using Linux, you probably don't need to read this section.

> **Note:** The step of testing on Hydra should *not* be disregarded, no matter what.

If you have any questions or need help setting something up, don't hesitate to reach out to me or one of the other TAs or come to office hours.

> **Note:** I say VSCode here because I recommend it and don't even know what else people actually use, but use whatever editor you prefer.

#### Option 1 (Recommended): VSCode locally, `scp` to Hydra for compilation and testing
This is the simplest option no matter what OS you have, and unless you kind of know what you're doing, I'd stay away from Option 2. There is a summary of `scp` in the next major section. If you are on Mac, I think you can still develop, compile, and test your code locally without weird bugs, but you should still test your code on Hydra before submitting.

#### Option 2 (Windows): VSCode locally connected to WSL, `scp` to Hydra for final compilation and testing
I've never heard of any instructors at UTK recommending this, but I think it's pretty good and should catch on.

WSL (Windows Subsystem for Linux) is basically Microsoft's official solution to the lack of a terminal with Unix commands. I've used WSL for the last year, and I wish I had known about it earlier. This one is nice because you might find it to be useful for other classes and projects too.

I don't remember running into any issues when I did it, so I think this part should be straightforward. Just follow [these instructions](https://docs.microsoft.com/en-us/windows/wsl/install).

> **Note:** I will not take any responsibility for anything that happens if you try this and mess something up! If at any point you don't understand what the documentation is saying, you might want to stop there.

VSCode also has an extension for WSL integration, so you can directly edit the file in VSCode.

I also recommend trying to set up Windows Terminal to open the WSL terminal, and it's nice in general, but this is not required. Microsoft also has some instructions for [additional recommended stuff](https://docs.microsoft.com/en-us/windows/wsl/setup/environment), including Windows Terminal.

By default, you can start a WSL shell using the `wsl` command and compile and test there.

> **WARNING:** While it might be nice to have everything all in one place, you should still `scp` your tar file to Hydra to test your code JUST TO BE SURE!

#### Option 3: Vim directly on Hydra
Arguably the worst one, but if you want to become a god at Vim like Dr. Plank or you like to suffer, you *can* do this. However, this *is* actually good for quick edits so you can compile and test again without `scp`, but for the bulk of the coding, I recommend one of the previous options. However, be sure to `scp` the code *back* or make the changes locally before you tar and submit.

<hr>

### Summary of the commands covered in lab:
As you might have noticed, for convenience, I'll provide you with a skeleton command you might use to create your tar file at the top of each one of these pages, but **you should understand how to use *all* of these commands on your own**.

#### ssh
`ssh` is used to securely remotely access a system, such as the Hydra machines.
```
ssh [netid]@hydra[X].eecs.utk.edu
```
<u>Example:</u>
```
ssh broachel@hydra5.eecs.utk.edu
```

#### scp
`scp` is used to securely copy files between a local and remote source/destination.
> **WARNING:** This will overwrite any files in the destination with the same name.
```
scp [source] [destination]
```

<u>Examples:</u> (assuming you are in the local directory where your files are / where you want your files to be)

> **Note:** These commands are run on your local machine.

Copy source code from your local machine to where you want it on Hydra:
```
scp FuelX.cpp broachel@hydra5.eecs.utk.edu:~/cs302/Lab1/
```
Copy source code from Hydra to your local machine:
```
scp broachel@hydra5.eecs.utk.edu:~/cs302/Lab1/FuelX.cpp .
```

#### tar
`tar` is used to compress one or more files into a single file. [If you're curious about the flags or want more info](https://www.ibm.com/docs/en/aix/7.1?topic=t-tar-command).

> **WARNING:** The next two commands will overwrite any files in the current directory with the same name. Similar to `g++ -o`, make sure the arguments are in the correct order.

Create a tar file named `tar_file_name.tar` containing files `file1`, `file2`, ..., `fileN`:
```
tar -cvf [tar_file_name.tar] [file1 file2 ... fileN]
```

Extract contents of a tar file:
```
tar -xvf [tar_file_name.tar]
```

Check contents of a tar file:
```
tar -tf [tar_file_name.tar]
```

<hr>

### Lab Notes
There are four parts to this lab. Submit a tar file containing only the <u>*highest completed part*</u>.

> **Note:** These are **Andrew's notes**, but I've copied and formatted them here. THIS IS NOT A REPLACEMENT FOR THE LAB WRITEUP&mdash;NOT ALL THE DETAILS ARE HERE.

#### Fuel1
* struct `sale`: Holds information about each input line (objects of this type are stored in the vector `DB`)
  * `int` for month, day, and year
  * `enum` for fuel type
  * `float` for quantity, unit price, and subtotal
* overloaded input operator (`>>`): Takes each line and parses the data to create the struct for that sale
* overloaded output operator (`<<`): Formats the output of the `sale` struct

Example I/O:
###### stdin
```plaintext
08-01-2021  Midgrade   24.72  4.690
[date] [fueltype] [quantity] [unit price]
```
###### stdout
```plaintext
Aug  1, 2021 Midgrade    24.72 x 4.69 =  115.94 :    115.94
[date] [fueltype] [quantity x unit price] = [subtotal] : [running total]
```

> **Note:** The width of each section is important (maybe?). If you can, just make sure the output matches Dr. Gregor's exactly using `setw()` or there may be a penalty!

#### Fuel2
* parse command-line arguments:
  * add parsing for `-inorder` flag and the file name that we will extract data from
  * `-inorder` maintains the order of the output as the order of the input

Example `argv`/`argc`:
```
./Fuel2 -inorder fuel_data1.txt
argv[0]  argv[1]    argv[2]       argc = 3

```

* `print_details()`:
  * takes two iterators as a start and end, goes through the data structure (i.e., the vector `DB`), and prints out the data
  * *Hint:* Utilize the overloaded operator you created in Fuel1
* Your output should be exactly the same as Fuel1 because your output doesn't change, only how you read in and call your output changes in your code

#### Fuel3
* update command-line parsing to include 3 sort modes:
  * `-inorder` (maintains input order) (`./Fuel3 -inorder fuel_data2.txt`)
  * `-bydate` (sorted by date of sale) (`./Fuel3 -bydate fuel_data2.txt`)
  * `-bytype` (sorted by fuel type) (`./Fuel3 -bytype fuel_data2.txt`)
* need comparison functions for `-bydate` and `-bytype`
* these comparison functions get passed into `std::sort()`

#### Fuel4
* struct `sale_summary`:
  * quantity and subtotal `double` member variables
  * constructor
  * copy constructor
  * overloaded += operator (takes in a sale object)
* two functions:
  * `print_summary_bydate()`
  * `print_summary_bytype()`
* Functions will iterate over all `sale_summary` objects and attempt to add each object's data to a map. Upon failure of insertion to the map, update the value pointed to by the returned iterator with the current struct's data
  * `std::map insert()` --> returns a `pair<iterator, bool>`
* rundown of `print_summary_bytype()`:
  * on initial insertion of a new type, that type will be inserted, and `insert()` will return true
  * on a second insertion of the SAME type, `insert()` will return false, so you will update the struct already inserted before as the iterator in the pair will be referencing that struct
  * keys for map: bydate --> use DATE as key, bytype --> use TYPE as key
  * once the map is fully updated, go through it and print out the data
  * the map's value is a `sale_summary` struct that is initialized with a `sale` struct
    * these are TWO different structs&mdash;be aware of that


<hr>

### An overview of `std::map`
Even if you think you're already familiar with C++ maps, I encourage you to give [this](http://utk.claranguyen.me/lab.php?id=cs140/fa20/lab8) a read-through anyway&mdash;you might still learn something. It was created by former TA Clara Nguyen, known for being one of the best CS TAs ever.

Also, in general, I encourage you to pay attention to the return value of data structure operations (such as `insert()` above). While C++'s `std::stack` doesn't have this, usually stacks are implemented such that when you call `pop()`, the popped element is returned. Stuff like that. You never know what useful info you might be missing, and it might come in handy during a job interview. 