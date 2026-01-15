import React from "react";
import { useState, useEffect } from 'react';
import { Trash2, ExternalLink, FileText, Plus } from 'lucide-react'

function ActivitiesTable({ activities, onDelete }) {

    if (activities.length === 0) {
        return <p className="text-center text-gray-500 py-10">No activities recorded yet.</p>;
    }
    return (
    <div>
        
        <table className="w-full text-left border-collapse border-gray-200 border-2">
            <thead>
                <tr className="bg-gray-100 border-b border-gray-200 text-lg font-semibold text-gray-600">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Points</th>
                    <th className="px-6 py-4">Certificate</th>
                    <th className="px-6 py-4">Report</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {activities.map((activity) => (
                    <tr key={activity._id} className="hover:bg-gray-100 transition text-gray-600 text-lg">
                        <td className="px-6 py-4">
                            {new Date(activity.date).toLocaleDateString()}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.eventName}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.points}
                        </td>
                        <td  className="px-6 py-4">
                            <a 
                                href={activity.certificateUrl} 
                                className="hover:text-blue-500 underline"
                                target="_blank"
                                >
                                Click here
                            </a>
                        </td>
                        <td  className="px-6 py-4">
                            <a 
                                href={activity.reportUrl} 
                                className="hover:text-blue-500 underline"
                                target="_blank"
                                >
                                Click here
                            </a>
                        </td>
                        <td  className="px-6 py-4">
                            {activity.status.toUpperCase()}
                        </td>
                        <td className="px-2 py-4">
                            <button 
                                    onClick={() => onDelete(activity._id)}
                                    className="text-gray-600 hover:text-red-500 transition p-2"
                                    title="Delete Activity"
                                >
                                <Trash2 size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
    )
}

export default ActivitiesTable;