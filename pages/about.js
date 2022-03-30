import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navbar from '../components/navbar';
import BackButton from '../components/back-button';
import BackgroundContainer from '../components/background-container';
import Post from '../components/post';
import Head from 'next/head';
import { marked } from 'marked';

const About = ({contents}) => {
  return (
    <>
      <Head>
        <title>About Me</title>
        <meta title='description' content='Some background info about me'/>
      </Head>
      <Navbar/>
      <BackgroundContainer>
        <Post>
          <div className='mx-10'>
            <div dangerouslySetInnerHTML={{__html: contents}}></div>
          </div>
        </Post>
        <BackButton/>
      </BackgroundContainer>
    </>
  );
};

export const getStaticProps = async () => {
  const data = fs.readFileSync(path.join('assets', 'about.md')).toString();
  const markdown = matter(data);
  const contents = marked.parse(markdown.content);

  return {
    props: {
      contents
    }
  };
};

export default About;