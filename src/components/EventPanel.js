import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import '../styles/EventPanel.css';

const EventPanel = ({ isOpen, onClose, selectedDate, onAddEvent, onDeleteEvent, events }) => {
    const [eventText, setEventText] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    // --- THIS IS THE FIX ---
    // The emoji data object is now the FIRST argument.
    // The second argument is the mouse event, which we can ignore if we don't need it.
    const onEmojiClick = (emojiObject) => {
        setEventText(prevInput => prevInput + emojiObject.emoji);
        // Optional: close the picker after an emoji is selected
        // setShowPicker(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventText.trim() === '') return;
        onAddEvent(eventText);
        setEventText('');
        setShowPicker(false);
    };

    useEffect(() => {
        if (!isOpen) {
            setShowPicker(false);
        }
    }, [isOpen]);


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

                <div className="form-container">
                    <form onSubmit={handleSubmit} className="add-event-form">
                        <div className="input-wrapper">
                             <input
                                type="text"
                                value={eventText}
                                onChange={(e) => setEventText(e.target.value)}
                                placeholder="Add a new event..."
                                autoFocus
                            />
                             <button type="button" className="emoji-btn" onClick={() => setShowPicker(val => !val)}>
                                😊
                            </button>
                        </div>
                        <button type="submit">Add Event</button>
                    </form>

                    {showPicker && (
                        <div className="picker-container">
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EventPanel;