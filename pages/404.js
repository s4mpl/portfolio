import BackgroundContainer from '../components/background-container';
import BackButton from '../components/back-button';

export default function Custom404() {
  return (
    <BackgroundContainer>
      <div className='h-screen'>
        <h1 className='py-80 text-center mx-auto text-3xl'>404 | Page Not Found</h1>
        <BackButton href='/'/>
      </div>
    </BackgroundContainer>
  );
}