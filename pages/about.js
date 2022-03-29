import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navbar from '../components/navbar';
import BackButton from '../components/back-button';
import BackgroundContainer from '../components/background-container';
import Post from '../components/post';
import Head from 'next/head';

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
          <div class='mx-10'>
            <h1>about me:</h1>
            i am swag (i am Brandan Roachell)
            <br></br>
            {contents}
          </div>
        </Post>
      </BackgroundContainer>
      <BackButton/>
    </>
  );
};

export const getStaticProps = async () => {
  const data = fs.readFileSync(path.join('assets', 'about.md')).toString();
  const markdown = matter(data);

  return {
    props: {
      contents: markdown.content
    }
  };
};

export default About;