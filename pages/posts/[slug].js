import React from 'react';
import Head from 'next/head';
import { getProjectFromSlug, getProjects, getPostFromSlug, getPosts } from '../../components/utils';
import Navbar from '../../components/navbar';
import BackButton from '../../components/back-button';
import BackgroundContainer from '../../components/background-container';
import Post from '../../components/post';
import hljs from 'highlight.js'
import { useEffect } from 'react';

const Project = ({project}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <Head>
        <title>{project.data.title}</title>
        <meta title='description' content={project.data.description}/>
        <base target="_blank"/>
      </Head>
      <BackgroundContainer>
        <Navbar/>
        <Post>
          <h1 className='text-center'>{project.data.title}</h1>
          <p className='text-center lead text-xs'><i>Written {project.data.written} • Last edited {project.data.edited}</i></p>
          <hr/>
          <div dangerouslySetInnerHTML={{__html: project.contents}}></div>
        </Post>
        <BackButton href='/posts'/>
      </BackgroundContainer>
    </>
  );
};

export const getStaticPaths = async () => {
  const projects = getProjects().concat(getPosts());
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
      project: getProjectFromSlug(slug) || getPostFromSlug(slug),
    }
  };
};

export default Project;