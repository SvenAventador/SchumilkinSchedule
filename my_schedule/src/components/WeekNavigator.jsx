import React from 'react';

const WeekNavigator = ({ currentDate, onDateChange }) => {
    const goToPreviousDay = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(currentDate.getDate() - 1)
        onDateChange(newDate)
    }

    const goToNextDay = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(currentDate.getDate() + 1)
        onDateChange(newDate)
    }

    return (
        <div className="week-nav">
            <button onClick={goToPreviousDay}
                    className="nav-btn">
                <i className="icon">←</i>
            </button>
            <span className="week-label">День</span>
            <button onClick={goToNextDay}
                    className="nav-btn">
                <i className="icon">→</i>
            </button>
        </div>
    )
}

export default WeekNavigator