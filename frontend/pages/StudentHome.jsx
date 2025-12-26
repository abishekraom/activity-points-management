import React from 'react'
import ProgressBar from '../components/ProgressBar';
import ProgressGraph from '../components/ProgressGraph';

function StudentHome() {
  return (
    <div className='bg-gray-100 min-h-[calc(100vh-5rem)] py-8'>
      <div className='bg-white rounded-2xl max-w-6xl mx-auto px-20 py-8'>
        <h1 className='text-3xl text-gray-700'>Your Progress</h1>
        <hr className='border-gray-500'></hr>
        <div className='my-6'>
          <ProgressBar confirmed={50} pending={50} />
          <div className="flex justify-center gap-8 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-500">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-yellow-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-500">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
        
        {/* Left Box: Graph (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-lg font-bold text-gray-800'>Activity Analytics</h2>
            <span className='text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded'>+12% this week</span>
          </div>
          <div className='h-[250px]'>
            <ProgressGraph />
          </div>
        </div>

        {/* Right Box: Empty Placeholder (Takes 1 column) */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className='border-2 border-dashed border-gray-200 rounded-xl w-full h-full flex items-center justify-center'>
            <p className='text-gray-400 italic'>Additional Content Placeholder</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StudentHome;