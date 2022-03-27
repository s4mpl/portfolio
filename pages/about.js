import fs from 'fs';
import path from 'path';

const About = ({data}) => {
  return (
    <>
      <div>
        <h1>about me:</h1>
        i am swag (i am Brandan Roachell)
      </div>
      <div>
        {data}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      data: fs.readFileSync(path.join('assets', 'about.md')).toString()
    }
  };
};

export default About;