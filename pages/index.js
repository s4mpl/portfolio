import Link from 'next/link'
import Navbar from '../components/navbar';

const Home = () => {
  return (
    <>
      <Navbar/>
      <div class='mx-10'>
        <p>Hello my name is</p>
        <p class='text-7xl'><b>Brandan Roachell</b></p>
      </div>
    </>
  );
};

export default Home;
