import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const Project = ({contents, data}) => {
  return (
    <>
      <div>
        <title>{data.title}</title>
        <meta title='description' content={data.description}/>
        <div>i love 2D women</div>
        <pre>
          code<br></br>
          {data.description}
        </pre>
      </div>
      <div>
        {contents}
      </div>
    </>
  );
};

export const getStaticPaths = async() => {
  const files = fs.readdirSync('assets/projects');

  console.log(files);
  const paths = files.map(fileName => ({
    params: {
      slug: fileName.replace('.md', '')
    }
  }));

  console.log(paths);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async({params: {slug}}) => {
  const markdownWithMetadata = fs.readFileSync(path.join('assets', 'projects', slug + '.md')).toString();
  const parsedMarkdown = matter(markdownWithMetadata);

  return {
    props: {
      contents: parsedMarkdown.content,
      data: parsedMarkdown.data
    }
  }
};

export default Project;