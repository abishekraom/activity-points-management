import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import API from '../api/axios.js';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API.get("/api/events");
                setAllEvents(res.data);
            } catch (error) {
                console.error("Error loading events");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <EventContext.Provider value={{ allEvents, loading }}>
            {children}
        </EventContext.Provider>
    );
}

export const useEventList = () => useContext(EventContext);