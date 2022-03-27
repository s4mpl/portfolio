import Link from 'next/link'
import fs from 'fs'
import { getProjects } from '../components/utils';

const Home = ({slugs}) => {
  return (
    <>
      <div>
        <Link href='projects'>all projects</Link>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync('assets/projects');
  const a = getProjects();

  return {
    props: {
      slugs: files.map(filename => filename.replace('.md', ''))
    }
  };
};

export default Home;
