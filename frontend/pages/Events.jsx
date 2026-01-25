import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getData } from '../context/userContext.jsx';

const StudentEvents = () => {
    const { user, loading: authLoading } = getData();
    const [events, setEvents] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showArchive, setShowArchive] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/events');
                setEvents(res.data);
            } catch (err) {
                console.error("Error fetching events", err);
            } finally {
                setFetching(false);
            }
        };
        fetchEvents();
    }, []);

    // Filter events: active (today or future) vs archived (past)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const activeEvents = events.filter(event => new Date(event.date) >= today);
    const archivedEvents = events.filter(event => new Date(event.date) < today);
    
    const displayedEvents = showArchive ? archivedEvents : activeEvents;

    if (authLoading || fetching) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">College Events</h1>

            {/* Tab Toggle */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setShowArchive(false)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                        !showArchive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Active Events ({activeEvents.length})
                </button>
                <button
                    onClick={() => setShowArchive(true)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                        showArchive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Archived Events ({archivedEvents.length})
                </button>
            </div>

            {/* EVENT LIST */}
            {displayedEvents.length === 0 ? (
                <p className="text-center text-gray-500">
                    {showArchive ? 'No archived events found.' : 'No upcoming events found.'}
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedEvents.map((event) => (
                        <div key={event._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1">
                            {event.posterUrl ? (
                                <img src={event.posterUrl} alt="Poster" className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{event.eventName}</h3>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-600 text-sm">📅 {new Date(event.date).toLocaleDateString()}</span>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                        {event.points} pts
                                    </span>
                                </div>
                                {event.registrationUrl && !showArchive && (
                                    <a href={event.registrationUrl} target="_blank" rel="noreferrer" 
                                       className="block text-center bg-gray-800 hover:bg-black text-white py-2 rounded-lg transition font-medium">
                                        Register Now
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentEvents;