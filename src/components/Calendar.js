// src/components/Calendar.js
import React from 'react';
import '../styles/Calendar.css';

const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
};

const Calendar = ({ currentDate, setCurrentDate, onDateClick, events }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const changeMonth = (offset) => {
        setCurrentDate(new Date(year, month + offset, 1));
    };

    const renderDays = () => {
        const days = [];
        // Add blank cells for the days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="date-cell empty"></div>);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateKey = formatDateKey(date);
            const hasEvent = events[dateKey] && events[dateKey].length > 0;

            const isToday = new Date().toDateString() === date.toDateString();
            
            // Add classes conditionally
            let cellClass = 'date-cell';
            if (hasEvent) cellClass += ' has-event'; // This is our "Event Star"
            if (isToday) cellClass += ' today';
            
            days.push(
                <div
                    key={day}
                    className={cellClass}
                    onClick={() => onDateClick(date)}
                >
                    <div className="day-number">{day}</div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>Prev</button>
                <h2>
                    {currentDate.toLocaleString('default', { month: 'long' })} {year}
                </h2>
                <button onClick={() => changeMonth(1)}>Next </button>
            </div>
            <div className="calendar-grid">
                {weekDays.map((day) => (
                    <div key={day} className="weekday-cell">
                        {day}
                    </div>
                ))}
                {renderDays()}
            </div>
        </div>
    );
};

export default Calendar;