import React from 'react';
import Head from 'next/head';
import { getProjectFromSlug, getProjects } from '../../components/utils';

const Project = ({project}) => {
  return (
    <>
      <Head>
        <title>{project.data.title}</title>
        <meta title='description' content={project.data.description}/>
      </Head>
      <div class="relative w-full px-6 py-12 bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
        <div class='prose prose-slate'>
          <p class='lead'>i love 2D women</p>
          <p>but i love <code>ryze</code> even more</p>
          <blockquote>
            One step ahead of cataclysm...
          </blockquote>
          <pre><code class='language-cpp'>
            {project.contents}
          </code></pre>
          <figure>
            <img src="/images/boeing-stock.png" alt="" style={{height: 150}}/>
            <figcaption>Figure 1: the tragedy of 09/11/2001</figcaption>
          </figure>
          <h3>meet me in US310 for the following reasons:</h3>
          <ul>
            <li>forgot your password</li>
            <li>50 instead of 65</li>
          </ul>
        </div>
      </div>
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