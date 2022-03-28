import React from 'react';
import Head from 'next/head';
import { getProjectFromSlug, getProjects } from '../../components/utils';
import Navbar from '../../components/navbar';
import BackButton from '../../components/back-button';

const Project = ({project}) => {
  return (
    <>
      <Head>
        <title>{project.data.title}</title>
        <meta title='description' content={project.data.description}/>
      </Head>
      <Navbar/>
      <div class="relative w-full px-6 py-12 bg-slate-100 dark:bg-gray-800 shadow-xl shadow-slate-700/10 dark:shadow-gray-500/10 ring-1 ring-gray-900/5 dark:ring-slate-50/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
        <div class='prose prose-slate dark:prose-invert'>
          <p class='lead'>i love 2D women</p>
          <p>but i love <code>ryze</code> even more</p>
          <blockquote>
            "One step ahead of cataclysm..."
          </blockquote>
          <code><span class='code-highlight bg-code-highlight'>test</span></code>
          <p>See the following snippet:</p>
          <pre><code class='language-cpp'>
            {project.contents}
          </code></pre>
          <p>See the following snippet again:</p>
        </div>
        <br></br>
        <div class='prose prose-slate dark:prose-invert mx-auto'>
          <pre><code class='language-cpp'>
            {project.contents}
          </code></pre>
          <p>if i try to put text in here to introduce the figure, it looks like this (not good)</p>
          <figure class='text-center'>
            <img src='/images/boeing-stock.png' alt='' class='h-32 w-full hover:invert'/>
            <figcaption>Figure 1: the tragedy of 09/11/2001</figcaption>
          </figure>
        </div>
        <br></br>
        <div class='prose prose-slate dark:prose-invert'>
          <h3>meet me in US310 for the following reasons:</h3>
          <ul>
            <li>forgot your password</li>
            <li>50 instead of 65</li>
          </ul>
        </div>
      </div>
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