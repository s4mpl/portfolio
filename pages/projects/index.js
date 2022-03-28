import Link from 'next/link';
import { getProjects } from '../../components/utils';
import Navbar from '../../components/navbar';
import BackButton from '../../components/back-button';

const Index = ({projects}) => {
  return (
    <>
      <Navbar/>
      <div className='mx-10'>
        Here are some of my projects:
        {projects.map(project => {
          return (
            <div key={project.slug}>
              <Link href={'projects/' + project.slug}>
                <a>
                  {project.slug}
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <BackButton/>
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