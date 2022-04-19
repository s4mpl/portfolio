export default function BackgroundContainer({children}) {
  return (
    <div className='invert dark:invert-0 bg-cover bg-center h-screen'
    style={{backgroundImage: "linear-gradient(rgb(18 18 18 / 0.8), rgb(18 18 18 / 1)), url('/images/background.png')"}}>
      <div className='invert dark:invert-0'>
        {children}
      </div>
    </div>
  );
}