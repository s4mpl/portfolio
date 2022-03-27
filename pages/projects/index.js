import Link from 'next/link'
import fs from 'fs'

const Home = ({slugs}) => {
  return (
    <div>
      projects:
      {slugs.map(slug => {
        return (
          <div key={slug}>
            <Link href={'projects/' + slug}>
              {slug}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async() => {
  const files = fs.readdirSync('assets/projects');

  return {
    props: {
      slugs: files.map(filename => filename.replace('.md', ''))
    }
  };
};

export default Home;
