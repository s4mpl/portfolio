import Link from 'next/link'
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
      <BackgroundContainer style='height: 100vh'>
        <Navbar/>
        <div className='px-10 pt-24 sm:pt-48'>
          <div>
            <p className='pb-8 sm:pb-4'>Hello! My name is</p>
            <p className='text-5xl sm:text-7xl'>Brandan Roachell</p>
            <p className='py-8 pl-2 sm:pl-4 sm:py-4'>
              I&apos;m a computer science and math student with a passion for learning and making cool things.
            </p>
          </div>
          <div>
            <p className='pt-20 pb-36 sm:pt-24 sm:pb-44'>
              Contact me:{' '}
              <a className='text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100' href='mailto:broachel@vols.utk.edu'><u>broachel@vols.utk.edu</u></a>
            </p>
          </div>
        </div>
      </BackgroundContainer>
    </>
  );
};

export default Home;
