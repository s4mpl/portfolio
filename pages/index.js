import Navbar from '../components/navbar';
import BackgroundContainer from '../components/background-container';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta title='description' content='Home page'/>
      </Head>
      <BackgroundContainer>
        <Navbar/>
        <div className='px-10 pt-24 sm:pt-48'>
          <div>
            <p className='pb-8 sm:pb-4'>Hello! My name is</p>
            <p className='text-5xl sm:text-7xl'>Brandan Roachell</p>
            <p className='py-8 pl-2 sm:pl-4 sm:py-4'>
              I&apos;m most interested in lower-level systems programming using modern C++, and I additionally have a background in backend software engineering, robotics, and data science.
            </p>
          </div>
          <div>
            <p className='pt-16 pb-8 sm:pt-24 sm:pb-4'>
              Contact me:{' '}
              <a className='text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100' href='mailto:brandanroachell@gmail.com'><u>brandanroachell@gmail.com</u></a>
            </p>
          </div>
        </div>
      </BackgroundContainer>
    </>
  );
};

export default Home;
