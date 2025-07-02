// src/components/EventPanel.js
import React, { useState } from 'react';
import '../styles/EventPanel.css';

const EventPanel = ({ isOpen, onClose, selectedDate, onAddEvent, onDeleteEvent, events }) => {
    const [eventText, setEventText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEvent(eventText);
        setEventText(''); // Clear input after adding
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="panel-overlay" onClick={onClose}></div>
            <div className={`event-panel ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h3>Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                
                <div className="event-list">
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event.id} className="event-item">
                                <span>{event.text}</span>
                                <button onClick={() => onDeleteEvent(event.id)} className="delete-event-btn">X</button>
                            </div>
                        ))
                    ) : (
                        <p className="no-events">No events scheduled. Add one!</p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="add-event-form">
                    <input
                        type="text"
                        value={eventText}
                        onChange={(e) => setEventText(e.target.value)}
                        placeholder="Add a new event..."
                        autoFocus
                    />
                    <button type="submit">Add Event</button>
                </form>
            </div>
        </>
    );
};

export default EventPanel;