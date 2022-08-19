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
      <BackgroundContainer>
        <Navbar/>
        <Post>
          <div className=''>
            <img style={{margin: '0em 1.5em 0.25em 0em'}} src='/images/me.jpg' className='float-left w-2/5 min-w-[115px]' alt='a picture of me'/>
            <div dangerouslySetInnerHTML={{__html: contents}}></div>
          </div>
        </Post>
        <BackButton href='/'/>
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