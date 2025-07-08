import './App.css';
import { Home } from './pages/Home/home';
import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventPanel from './components/EventPanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// A helper function to format dates as 'YYYY-MM-DD'
// This is crucial for using dates as keys in our state object
const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
};

const STORAGE_KEY = 'celestialCalendarEvents';

function App() {

   const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem(STORAGE_KEY);
        // If we found saved events, parse the JSON string back into an object
        if (savedEvents) {
            return JSON.parse(savedEvents);
        } else {
            // Otherwise, return the default hardcoded events
            return {
        '2024-07-26': [{ id: 1, text: 'Doctor Appointment 🩺' }],
        '2024-08-15': [{ id: 2, text: 'Project Deadline! 🚀' }],

            };
        }
    });

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);


    // State for the currently selected date to show in the panel


    // Handler for when a date is clicked
    const handleDateClick = (date) => {
        setSelectedDate(date);
        setIsPanelOpen(true);
    };

   
    const handlePanelClose = () => {
        setIsPanelOpen(false);
    };

    // Handler for adding a new event
 const handleAddEvent = (eventText) => {
        if (!selectedDate || !eventText.trim()) return;

        const dateKey = formatDateKey(selectedDate);
        const newEvent = { id: Date.now(), text: eventText };

        setEvents((prevEvents) => {
            const eventsForDay = prevEvents[dateKey] ? [...prevEvents[dateKey]] : [];
            eventsForDay.push(newEvent);
            return { ...prevEvents, [dateKey]: eventsForDay };
        });

        toast.success(`Event added for ${selectedDate.toLocaleDateString()}`, {
            theme: "dark",
        });
    };
    
    // Handler for deleting an event
  const handleDeleteEvent = (eventId) => {
        if (!selectedDate) return;
        const dateKey = formatDateKey(selectedDate);

        const updatedEventsForDate = events[dateKey].filter(event => event.id !== eventId);

        setEvents({
            ...events,
            [dateKey]: updatedEventsForDate,
        });
    };

       const eventsForSelectedDate = selectedDate ? events[formatDateKey(selectedDate)] || [] : [];
    // --- ADD THE REMINDER LOGIC HOOK ---
    useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }, [events]);
        const checkReminders = () => {
          
            // 1. AVOID SPAMMING: Check if we already notified today
            const lastCheck = localStorage.getItem('lastReminderCheck');
            const todayStr = new Date().toDateString(); // e.g., "Mon Feb 25 2024"

            if (lastCheck === todayStr) {
                // We've already checked today, so do nothing.
                return;
            }

            // 2. LOOK AHEAD: Get tomorrow's date
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowKey = formatDateKey(tomorrow); // Format it as 'YYYY-MM-DD'
            
            const upcomingEvents = events[tomorrowKey];
     
            // 3. NOTIFY: If there are events for tomorrow, send a notification
            if (upcomingEvents && upcomingEvents.length > 0) {
                // Check for notification permission first
                if (Notification.permission === 'granted') {
                    // Create the notification body text
                    const body = `You have ${upcomingEvents.length} event(s) tomorrow:\n` + 
                                 upcomingEvents.map(e => `• ${e.text}`).join('\n');
                    
                    // Create the notification
                    new Notification("Upcoming Event Reminder!", { body });

                    // Play the sound!
                    const audio = new Audio('/sounds/notification.mp3'); // Path from public folder
                    audio.play().catch(error => {
                        console.error("Audio playback failed:", error);
                    });

                    // IMPORTANT: Update localStorage so we don't notify again today
                    localStorage.setItem('lastReminderCheck', todayStr);
                } else {
                    // If we don't have permission, we can ask for it.
                    // This will also be triggered by the "Today's Events" notification logic.
                    Notification.requestPermission();
                }
            } else {
                 // Even if there are no events, we should still mark today as checked
                 localStorage.setItem('lastReminderCheck', todayStr);
            }
        };

        checkReminders();
    
  return (
    <div>
    <div className="bg-slate-100 min-h-screen">
      <Home />
    </div>
    <div className="app-container">
            <h1 className="main-title">Calendar</h1>
            <Calendar
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                onDateClick={handleDateClick}
                events={events}
            />
             {isPanelOpen && selectedDate && (
                    <EventPanel
                        isOpen={isPanelOpen}
                        onClose={handlePanelClose} // <-- FIX #1: Pass the close handler
                        selectedDate={selectedDate}
                        onAddEvent={handleAddEvent}
                        onDeleteEvent={handleDeleteEvent} // <-- FIX #2: Pass the delete handler
                        events={eventsForSelectedDate} // <-- FIX #3: Pass the correct, filtered events
                    />
                )}
             <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    </div>
  );
}

export default App;
