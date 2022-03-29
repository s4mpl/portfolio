export default function BackgroundContainer({children}) {
  return (
    <div className='invert dark:invert-0 bg-cover bg-center' style={{backgroundImage: "linear-gradient(rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.9)), url('/images/background.png')"}}>
      <div className='invert dark:invert-0'>
        {children}
      </div>
    </div>
  );
}