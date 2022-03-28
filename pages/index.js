import Link from 'next/link'
import Navbar from '../components/navbar';

const Home = () => {
  return (
    <>
      <Navbar/>
      <div class='mx-10 mt-24 sm:mt-48'>
        <p>Hello, my name is</p>
        <p class='text-5xl sm:text-7xl'>Brandan Roachell</p>
      </div>
    </>
  );
};

export default Home;
