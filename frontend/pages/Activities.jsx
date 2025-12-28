import React from "react";
import ActivitiesTable from "../components/ActivitiesTable";

function Activities () {

    return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8">
        <div className="bg-white rounded-2xl px-20 py-8 max-w-6xl mx-auto shadow-md">
            <h1 className='text-3xl text-gray-700'>Your Activities</h1>
            <hr className='border-gray-500 mb-8'></hr>
            <ActivitiesTable />
        </div>
    </div>
    );
}

export default Activities;