import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navbar from '../components/navbar';

const About = ({contents}) => {
  return (
    <>
      <Navbar/>
      <div class='mx-10'>
        <h1>about me:</h1>
        i am swag (i am Brandan Roachell)
        <br></br>
        {contents}
      </div>
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