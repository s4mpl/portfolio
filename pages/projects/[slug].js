import React from 'react';
import Head from 'next/head';
import { getProjectFromSlug, getProjects } from '../../components/utils';

const Project = ({project}) => {
  return (
    <>
      <Head>
        <title>{project.data.title}</title>
        <meta title='description' content={project.data.description} />
      </Head>
      <div>
        i love 2D women: {project.contents}
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
  }
};

export default Project;