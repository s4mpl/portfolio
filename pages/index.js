import Link from 'next/link'
import fs from 'fs'
import { getProjects } from '../components/utils';

const Home = ({slugs}) => {
  return (
    <>
      <div>
        slugs:
        {slugs.map(slug => {
          return (
            <div key={slug}>
              <Link href={'projects/' + slug}>
                {"projects/" + slug}
              </Link>
            </div>
          );
        })}
      </div>
      <br></br>
      <div>
        <Link href='projects'>all projects</Link>
      </div>
    </>
  );
};

export const getStaticProps = async() => {
  const files = fs.readdirSync('assets/projects');
  const a = getProjects();

  return {
    props: {
      slugs: files.map(filename => filename.replace('.md', ''))
    }
  };
};

export default Home;
