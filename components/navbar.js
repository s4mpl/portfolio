import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  //console.log(router.asPath);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='sticky top-0 z-50 mx-auto px-4 py-6 bg-white dark:bg-htmldark' style={{fontFamily: "Source Sans Pro"}}>
      <div className='select-none flex md:flex-row justify-around items-center'>
        <div className='flex flex-col'>
          <Link href='/'>
            <a>
              <h1 className='font-semibold text-xl dark:text-gray-100'>
                Brandan
              </h1>
              <p className='text-base pr-4 font-light text-gray-600 dark:text-gray-300'>
                Software, Robotics, Data Science
              </p>
            </a>
          </Link>
        </div>

        <div className='space-x-12 hidden md:block'>
          <Link href='/about'>
            <a
              className={`text-base hover:text-gray-900 hover:dark:text-gray-100 ${
                router.asPath === '/about'
                  ? 'text-gray-800 font-bold dark:text-gray-200'
                  : 'text-gray-600 dark:text-gray-300 font-normal '
              }`}
            >
              About{' '}
              {router.asPath === '/about' && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  className='inline-block h-3 w-3'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
                  />
                </svg>
              )}
            </a>
          </Link>
          <Link href='/projects'>
            <a
              className={`text-base hover:text-gray-900 hover:dark:text-gray-100 ${
                router.asPath === '/projects'
                  ? 'text-gray-800 font-bold dark:text-gray-200'
                  : 'text-gray-600 dark:text-gray-300 font-normal '
              }`}
            >
              Projects{' '}
              {router.asPath === '/projects' && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  className='inline-block h-3 w-3'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
                  />
                </svg>
              )}
            </a>
          </Link>
          <a href='/Brandan_Roachell_Resume.pdf' className={`text-base text-gray-600 dark:text-gray-300 font-normal hover:text-gray-900 hover:dark:text-gray-100`} target='_blank'>
            Resume
          </a>
        </div>
        
        <div className='space-x-8 flex flex-row items-center'>
          <a
            href='https://www.linkedin.com/in/brandan-roachell/'
            target='_blank'
            className='text-base font-normal text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-linkedin h-5 w-5'
              viewBox='0 0 16 16'
            >
              <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z'/>
            </svg>
          </a>
          <a
            href='https://github.com/s4mpl/'
            target='_blank'
            className='text-base font-normal text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='h-5 w-5'
              viewBox='0 0 20 20'
            >
              <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/>
            </svg>
          </a>
          <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='w-10 h-10 p-3 rounded focus:outline-none'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                stroke='currentColor'
                className='w-4 h-4 text-indigo-500 dark:text-yellow-500 hover:text-indigo-900 hover:dark:text-yellow-300'
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                )}
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className='space-x-8 block md:hidden mt-4'>
        <Link href='/about'>
          <a
            className={`text-base hover:text-gray-900 hover:dark:text-gray-100 ${
              router.asPath === '/about'
                ? 'text-gray-800 font-bold dark:text-gray-200'
                : 'text-gray-600 dark:text-gray-300 font-normal '
            }`}
          >
            About{' '}
            {router.asPath === '/about' && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                className='inline-block h-3 w-3'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
                />
              </svg>
            )}
          </a>
        </Link>
        <Link href='/projects'>
            <a
              className={`text-base hover:text-gray-900 hover:dark:text-gray-100 ${
                router.asPath === '/projects'
                  ? 'text-gray-800 font-bold dark:text-gray-200'
                  : 'text-gray-600 dark:text-gray-300 font-normal '
              }`}
            >
              Projects{' '}
              {router.asPath === '/projects' && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  className='inline-block h-3 w-3'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
                  />
                </svg>
              )}
            </a>
          </Link>
          <a href='/Brandan_Roachell_Resume.pdf' className={`text-base text-gray-600 dark:text-gray-300 font-normal hover:text-gray-900 hover:dark:text-gray-100`} target='_blank'>
            Resume
          </a>
      </div>
    </div>
  );
}