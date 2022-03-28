import Link from 'next/link';
import { getProjects } from '../../components/utils';
import Navbar from '../../components/navbar';

const Index = ({projects}) => {
  return (
    <>
      <Navbar/>
      <div class='mx-10'>
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