import Link from 'next/link'
import Navbar from '../components/navbar';

const Home = () => {
  return (
    <>
      <Navbar/>
      <div class='h-max px-10 pt-24 sm:pt-48 invert dark:invert-0' style={{'background-image': "linear-gradient(rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.9)), url('/images/background.png')"}}>
        <div class='invert dark:invert-0'>
          <div>
            <p>Hello! My name is</p>
            <p class='text-5xl sm:text-7xl'>Brandan Roachell</p>
            <p class='p-8 sm:p-4'>I'm a computer science and math student with a passion for learning and making cool things.</p>
          </div>
          <div>
            <p class='pt-20 pb-40 sm:pt-24 sm:pb-48'>
              Contact me:{' '}
              <a class='text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100' href='mailto:broachel@vols.utk.edu'><u>broachel@vols.utk.edu</u></a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
