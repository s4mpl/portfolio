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
        <meta title='description' content="Here are some of my favorite projects that I've written about"/>
      </Head>
      <BackgroundContainer>
        <Navbar/>
        <Post>
          <div className='mx-10'>
            <p className='lead'>Here are some of my favorite projects that I&apos;ve written about:</p>
            {projects.sort(function(a, b) {return b.data.date.localeCompare(a.data.date)}).map(project => {
              let classList = ['project-entry'];
              switch(project.data.status) {
                case 'Complete':
                  classList.push('bg-lime-300 dark:bg-lime-800');
                  break;
                case 'In Progress':
                  classList.push('bg-amber-300 dark:bg-amber-600');
                  break;
                case 'Cancelled':
                  classList.push('bg-red-400 dark:bg-red-800');
                  break;
                case 'Ongoing':
                  classList.push('bg-sky-400 dark:bg-sky-700')
                  break;
                default:
                  classList.push('bg-fuchsia-300 dark:bg-fuchsia-800')
              }
              return (
                <div key={project.slug} className={classList.join(' ')}>
                  <div style={{'margin-right': '2rem'}}>
                    <Link href={'projects/' + project.slug}>
                      <a>
                        {project.data.title} ({project.data.date})
                      </a>
                    </Link>
                    <br/>
                    {project.data.description}
                  </div>
                  <div className='text-right flex-1'>
                    {project.data.status}
                    <br/>
                    {project.data.haslink && <a
                        href={project.data.link}
                        target='_blank'
                        rel='noreferrer'
                        className='float-right text-base font-normal text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100'
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                        </svg>
                      </a>}
                  </div>
                  <div style={{'clear': 'both'}}></div>
                </div>
              );
            })}
          </div>
        </Post>
        <BackButton href='/'/>
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