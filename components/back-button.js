import Link from 'next/link';

export default function BackButton() {
  return (
    <div class='mx-10 py-4'>
      <Link href='/'>
        <a>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} style={{display: 'inline'}}>
            <path fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round' d='M11 19l-7-7 7-7m8 14l-7-7 7-7' />
          </svg>
        </a>
      </Link>
    </div>
  );
}