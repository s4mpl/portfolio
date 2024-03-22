import Link from 'next/link';
import React from 'react';

class BackButton extends React.Component {
  render() {
    return (
      <div className='sticky bottom-0 mx-10 py-4'>
        <Link legacyBehavior href={this.props.href}>
          <a className='text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:dark:text-gray-100'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} style={{display: 'inline'}}>
              <path fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round' d='M11 19l-7-7 7-7m8 14l-7-7 7-7' />
            </svg>
          </a>
        </Link>
      </div>
    );
  }
};

export default BackButton;