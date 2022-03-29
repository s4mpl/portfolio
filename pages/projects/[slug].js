import React from 'react';
import Head from 'next/head';
import { getProjectFromSlug, getProjects } from '../../components/utils';
import Navbar from '../../components/navbar';
import BackButton from '../../components/back-button';
import BackgroundContainer from '../../components/background-container';
import Post from '../../components/post';

const Project = ({project}) => {
  return (
    <>
      <Head>
        <title>{project.data.title}</title>
        <meta title='description' content={project.data.description}/>
      </Head>
      <Navbar/>
      <BackgroundContainer>
        <Post>
          <h1 class='text-center'>{project.data.title}</h1>
          <p class='text-center lead text-xs'><i>Written {project.data.written}; Last edited {project.data.edited}</i></p>
          <hr></hr>
          <i class='lead'>i love 2D women</i>
          <p>but i love <code>ryze</code> even more</p>
          <blockquote>
            "One step ahead of cataclysm..."<br></br>
            "In carnage, I bloom&mdash;like a flower in the dawn..."
            <blockquote>
              "Power slam!"
            </blockquote>
            "It's not how much time you have&mdash;it's how you use it..."
          </blockquote>
          <p>Hahaha&mdash;what the?! <code>{'./pages/**/*.{html,js}'}</code></p>
          <a><code>test code link</code></a>
          <pre>test pre only</pre>
          <p id='again'>See the following snippet:</p>
          <pre><code class='language-cpp'>
            {project.contents}
          </code></pre>
          <p>The rest is detailed in my <a href='/projects/another-test#again' target='_blank'>other post</a> about organic chemistry.</p>
          <hr></hr>
          <p>See the following snippet again:</p>
          <pre><code class='language-cpp'>
            {project.contents}
          </code></pre>
          <p>if i try to put text in here to introduce the figure, it looks like this (not good)</p>
          <figure class='text-center'>
            <img src='/images/boeing-stock.png' alt='' class='h-32 w-full hover:invert'/>
            <figcaption>Figure 1: the tragedy of 09/11/2001</figcaption>
          </figure>
          if i put some really long text heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere then it behaves like this
          <h3>meet me in US310 for the following reasons:</h3>
          <ul>
            <li id='forgot'>forgot your password</li>
            <li>50 instead of 65</li>
          </ul>
        </Post>
      </BackgroundContainer>
      <BackButton/>
    </> 
  );
};

export const getStaticPaths = async () => {
  const projects = getProjects();
  //console.log(projects);
  const paths = projects.map(project => ({
    params: {
      slug: project.slug
    }
  }));
  
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({params: {slug}}) => {
  return { 
    props: {
      project: getProjectFromSlug(slug),
    }
  };
};

export default Project;