import Link from 'next/link'

const Home = () => {
  return (
    <>
      <div>
        <Link href='about'>about me</Link><br></br>
        <Link href='projects'>all projects</Link>
      </div>
    </>
  );
};

export default Home;
