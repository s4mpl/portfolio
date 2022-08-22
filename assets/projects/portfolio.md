---
title: "Personal Portfolio"
description: "This website! Created primarily using Next.js and Tailwind CSS"
date: "2022/03/26"
written: "August 21, 2022"
edited: "August 21, 2022"
status: "Ongoing"
haslink: true
link: "https://github.com/s4mpl/portfolio"
---
### Intro
This is going to be a shorter post since this website speaks for itself, but I do want to share some general information and resources for those wanting to create a similar site. I also want to highlight some details that I learned were customizable while building my site.

### Tools / technologies used
I started this project with [a helpful tutorial from Ben Awad](https://www.youtube.com/watch?v=pY0vWYLDDco). The site utilizes Next.js's [static site generation (SSG)](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) feature, which allows it to fetch posts from a content management system (CMS) and dynamically render HTML elements for each from just a markdown (`.md`) file. It's confusing, and I can't really explain how anything works, but Next.js basically makes things a lot easier and cleaner. I used to try creating websites with pure HTML and CSS, and I hated every bit of it, but I actually genuinely enjoyed putting this site together with Next.js once I got the ball rolling.

I'm also not a fan of CSS, but I did find [Tailwind CSS](https://tailwindcss.com/) to be a very nice framework that made styling things feel much better. Tailwind is an example of "atomic" or "functional" CSS, a different approach to styling which favors applying many single-purpose classes with names based on visual function. There are a few of these out there, but I chose Tailwind because it has great [out-of-the-box markdown styling](https://tailwindcss.com/docs/typography-plugin) and still allowed for as much customization as I wanted using the configuration file and by overwriting the generated default styles in `output.css` from `input.css`:

```sh
npx tailwindcss -i ./styles/input.css -o ./styles/output.css --watch
```

See [the installation guide](https://tailwindcss.com/docs/installation) for more information about how it works. Tailwind also provides great documentation with the ability to "quick search" for a page regarding the certain thing you're trying to do.

To learn more about atomic CSS in general, I highly recommend reading [this post by Anthony Fu](https://antfu.me/posts/reimagine-atomic-css)&mdash;it's where I learned about it in the first place!

For my markdown parsing and codeblock syntax highlighting, I used Node.js's `npm` (Node package manager) to install [gray-matter](https://www.npmjs.com/package/gray-matter) for markdown-to-object conversion (splits content and metadata), [marked.js](https://marked.js.org/) for markdown-to-HTML parsing, and [highlight.js](https://highlightjs.org/) for syntax highlighting. The first two are also included in Ben Awad's tutorial linked above.

### A few details
I love finding little details that can be customized. 

When browsing through the Tailwind docs, I saw that I could edit the color of text selection:

###### input.css
```css
@layer base {
  html {
    @apply selection:bg-[#334155] selection:text-slate-100;
    @apply bg-[#ededed];
  }
  html.dark {
    @apply selection:bg-slate-100 selection:text-slate-800;
    @apply bg-htmldark;
  }
  h6 {
    @apply text-xs ml-2 mt-1.5;
  }
}
```

This is also where I fixed the background color of the page (when zoomed too far out on mobile) and added a custom styling for `h6`, which I use specifically for the little file name above my codeblocks sometimes.

While messing with selection color, I noticed that you could select the text in my navbar, which felt wrong when doing "select all" (`ctrl+A`), which I cared about for some reason. To combat this, I just had to add `select-none` to my navbar component.

I also put in a lot of effort to support a fully styled light mode, despite its inferiority to dark mode, because I liked the "Projects / Posts" colors. I had to do this weird double-invert thing in order to flip the colors of the background image and text properly:

###### background-container.js
```js
export default function BackgroundContainer({children}) {
  return (
    <div className='invert dark:invert-0 bg-cover bg-center h-screen'
    style={{backgroundImage: "linear-gradient(rgb(18 18 18 / 0.8), rgb(18 18 18 / 1)), url('/images/background.png')"}}>
      <div className='invert dark:invert-0'>
        {children}
      </div>
    </div>
  );
}
```

Also in that code snippet, my background color does this nice fade to dark / light as the page goes down since the image won't span the length of the page. Similar to how Steam profile backgrounds behave.

### Conclusion
Thanks for reading through! I hope you find this collection of information helpful if you start a Next.js SSG project of your own.