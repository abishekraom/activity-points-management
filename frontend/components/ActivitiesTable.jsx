import React from "react";
import { useState, useEffect } from 'react';
import { Trash2, ExternalLink, FileText, Plus } from 'lucide-react'

function ActivitiesTable({ activities }) {

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
                            {activity.certificateUrl}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.reportUrl}
                        </td>
                        <td  className="px-6 py-4">
                            {activity.status.toUpperCase()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
    )
}

export default ActivitiesTable;