import React, { useState } from 'react';
import '../styles/Calendar.css';

const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
};

const Calendar = ({ currentDate, setCurrentDate, onDateClick, events }) => {
    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [showYearSelector, setShowYearSelector] = useState(false);
    
    // For the year selector widget, this will be the first year in the 12-year grid
    const [yearSelectorStart, setYearSelectorStart] = useState(currentDate.getFullYear() - 5);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [...Array(12).keys()].map(i => new Date(0, i).toLocaleString('default', { month: 'long' }));

    const changeMonth = (offset) => {
        setCurrentDate(new Date(year, month + offset, 1));
    };

    const handleMonthSelect = (monthIndex) => {
        setCurrentDate(new Date(year, monthIndex, 1));
        setShowMonthSelector(false);
    };

    const handleYearSelect = (selectedYear) => {
        setCurrentDate(new Date(selectedYear, month, 1));
        setShowYearSelector(false);
    };

    const toggleMonthSelector = () => {
        setShowYearSelector(false); // Close year selector if open
        setShowMonthSelector(!showMonthSelector);
    };

    const toggleYearSelector = () => {
        setShowMonthSelector(false); // Close month selector if open
        setYearSelectorStart(year - 5); // Recenter the year grid on the current year
        setShowYearSelector(!showYearSelector);
    };


    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="date-cell empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateKey = formatDateKey(date);
            const hasEvent = events && events[dateKey] && events[dateKey].length > 0;
            const isToday = new Date().toDateString() === date.toDateString();
            
            let cellClass = 'date-cell';
            if (hasEvent) cellClass += ' has-event';
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

    const renderMonthSelector = () => (
        <div className="selector-grid month-selector">
            {monthNames.map((name, index) => (
                <button 
                    key={name} 
                    className={index === month ? 'selected' : ''}
                    onClick={() => handleMonthSelect(index)}
                >
                    {name.substring(0, 3)}
                </button>
            ))}
        </div>
    );

    const renderYearSelector = () => {
        const years = Array.from({ length: 12 }, (_, i) => yearSelectorStart + i);
        return (
            <div className="year-selector-widget">
                 <div className="selector-header">
                    <button onClick={() => setYearSelectorStart(yearSelectorStart - 12)}>«</button>
                    <span>{yearSelectorStart} - {yearSelectorStart + 11}</span>
                    <button onClick={() => setYearSelectorStart(yearSelectorStart + 12)}>»</button>
                </div>
                <div className="selector-grid year-selector">
                     {years.map(y => (
                        <button 
                            key={y}
                            className={y === year ? 'selected' : ''}
                            onClick={() => handleYearSelect(y)}
                        >
                            {y}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)} disabled={showMonthSelector || showYearSelector}>Prev</button>
                <div className="month-year-picker">
                    <button onClick={toggleMonthSelector} className="picker-button">
                        {currentDate.toLocaleString('default', { month: 'long' })}
                    </button>
                    <button onClick={toggleYearSelector} className="picker-button">
                        {year}
                    </button>
                </div>
                <button onClick={() => changeMonth(1)} disabled={showMonthSelector || showYearSelector}>Next</button>
            </div>

            {showMonthSelector && renderMonthSelector()}
            {showYearSelector && renderYearSelector()}

            {/* Hide the main calendar grid when a selector is open */}
            {!showMonthSelector && !showYearSelector && (
                 <div className="calendar-grid">
                    {weekDays.map((day) => (
                        <div key={day} className="weekday-cell">
                            {day}
                        </div>
                    ))}
                    {renderDays()}
                </div>
            )}
        </div>
    );
};

export default Calendar;