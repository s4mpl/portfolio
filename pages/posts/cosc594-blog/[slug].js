import React from 'react';
import Head from 'next/head';
import { get594PostFromSlug, get594Posts } from '../../../components/utils';
import Navbar from '../../../components/navbar';
import BackButton from '../../../components/back-button';
import BackgroundContainer from '../../../components/background-container';
import Post from '../../../components/post';
import hljs from 'highlight.js'
import { useEffect } from 'react';

const CS594Post = ({post}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <Head>
        <title>{post.data.title}</title>
        <meta title='description' content={post.data.description}/>
        <base target="_blank"/>
      </Head>
      <BackgroundContainer>
        <Navbar/>
        <Post>
          <h1 className='text-center'>{post.data.title}</h1>
          <p className='text-center lead'>{post.data.description}</p>
          <p className='text-center lead text-xs'><i>Written {post.data.written} • Last edited {post.data.edited}</i></p>
          <hr/>
          <div dangerouslySetInnerHTML={{__html: post.contents}}></div>
        </Post>
        <BackButton href='/posts/cosc594-blog'/>
      </BackgroundContainer>
    </>
  );
};

export const getStaticPaths = async () => {
  const posts = get594Posts();
  const paths = posts.map(post => ({
    params: {
      slug: post.slug
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
      post: get594PostFromSlug(slug)
    }
  };
};

export default CS594Post;