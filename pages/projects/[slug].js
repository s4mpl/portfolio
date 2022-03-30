import React from 'react';
import Head from 'next/head';
import { getProjectFromSlug, getProjects, mdToHTML } from '../../components/utils';
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
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"></script>
        <script>hljs.highlightAll()</script>
      </Head>
      <Navbar/>
      <BackgroundContainer>
        <Post>
          <h1 class='text-center'>{project.data.title}</h1>
          <p class='text-center lead text-xs'><i>Written {project.data.written}; Last edited {project.data.edited}</i></p>
          <hr></hr>
          <div dangerouslySetInnerHTML={{__html: project.contents}}></div>
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