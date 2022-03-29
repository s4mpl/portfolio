export default function BackgroundContainer({children}) {
  return (
    <div class='invert dark:invert-0 bg-cover bg-center' style={{'background-image': "linear-gradient(rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.9)), url('/images/background.png')"}}>
      <div class='invert dark:invert-0'>
        {children}
      </div>
    </div>
  );
}