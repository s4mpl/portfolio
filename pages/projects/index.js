import { getProjects } from '../../components/utils';
import Navbar from '../../components/navbar';

const Index = ({projects}) => {
  return (
    <>
      <Navbar/>
      <div class='mx-10'>
        projects list
        {projects.map(project => {
          return (
            <div key={project.slug}>
              <a href={'projects/' + project.slug}>
                {project.slug}
              </a>
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