import { getProjects } from "../../components/utils";

const Index = ({projects}) => {
  return (
    <>
      <div>
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