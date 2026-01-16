import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import ProgressGraph from '../components/ProgressGraph';
import { getData } from '../context/userContext.jsx';

function StudentHome() {
  const { user, loading } = getData();
  const navigate = useNavigate();

  const admissionYear = user?.usn ? 2000 + parseInt(user.usn.substring(3, 5)) : 2024;

  if (loading) return <div></div>;

  return (
    <div className='bg-gray-100 min-h-[calc(100vh-5rem)] py-8'>
      <div className='bg-white rounded-2xl max-w-6xl mx-auto px-20 py-8 shadow-md'>
        <h1 className='text-3xl text-gray-700'>Your Progress</h1>
        <hr className='border-gray-500'></hr>
        <div className='my-6'>
          <ProgressBar
            confirmed={user?.confirmedPoints || 0}
            pending={user?.pendingPoints || 0}

          />
          <div className="flex justify-center gap-8 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-500">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-yellow-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-500">Pending confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

        {/* Left Box: Graph (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl px-8 pt-2 shadow-md">
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-bold text-gray-800'>Activity Analytics</h2>
          </div>
          <div className='h-[250px]'>
            <ProgressGraph activities={user.activities} admissionYear={admissionYear} />
          </div>
        </div>

        <div className="bg-white rounded-2xl px-8 shadow-md flex flex-col py-8 text-center">
          <div className="grid lg:grid-cols-2 gap-8 text-2xl my-2">
            <div>
              Confirmed
              <br />
              <span className="text-4xl py-2">{user?.confirmedPoints || 0}</span>
            </div>
            <div>
              Pending
              <br />
              <span className="text-4xl py-2">{user?.pendingPoints || 0}</span>
            </div>
          </div>

          <div
            className="w-full border border-gray-300 hover:bg-gray-200 shadow-md rounded-xl py-2 text-lg my-2"
            onClick={() => {
              navigate("/activities");
            }}
          >
            Your activities
          </div>
          <div className="w-full border border-gray-300 hover:bg-gray-200 shadow-md rounded-xl py-2 text-lg my-2">
            Your documents
          </div>
          <div className="w-full border border-gray-300 hover:bg-gray-200 shadow-md rounded-xl py-2 text-lg my-2">
            Your reports
          </div>
        </div>

      </div>
    </div>
  )
}

export default StudentHome;