import Link from 'next/link';
import { getProjects } from '../../components/utils';
import Navbar from '../../components/navbar';
import BackButton from '../../components/back-button';
import BackgroundContainer from '../../components/background-container';
import Post from '../../components/post';
import Head from 'next/head';

const Index = ({projects}) => {
  return (
    <>
      <Head>
        <title>My Projects</title>
        <meta title='description' content="Some of my favorite projects that I've written about"/>
      </Head>
      <Navbar/>
      <BackgroundContainer>
        <Post>
          <div className='mx-10'>
            <p className='lead'>Here are some of my favorite projects that I&apos;ve written about:</p>
            {projects.sort(function(a, b) {return b.data.date.localeCompare(a.data.date)}).map(project => {
              return (
                <div key={project.slug}>
                  <Link href={'projects/' + project.slug}>
                    <a>
                      {project.slug} ({project.data.date})
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </Post>
        <BackButton/>
      </BackgroundContainer>
    </>
  );
};

export const getStaticProps = async () => {
  return { 
    props: {
      projects: getProjects()
    }
  };
};


export default Index;