import React from 'react'
import ProgressBar from '../components/ProgressBar';

function StudentHome() {
  return (
    <div className='bg-gray-100 min-h-[calc(100vh-5rem)] py-10'>
      <div className='bg-white rounded-2xl max-w-6xl mx-auto px-20 py-10'>
        <h1 className='text-3xl text-gray-700'>Your Progress</h1>
        <hr className='border-gray-500'></hr>
        <div className='my-6'>
          <ProgressBar confirmed={82} pending={17} />
        </div>
      </div>
    </div>
  )
}

export default StudentHome;