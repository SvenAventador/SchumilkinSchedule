import React from 'react'

const ScheduleCalendar = ({currentDate, onDateClick}) => {
    const days = [
        'ПН',
        'ВТ',
        'СР',
        'ЧТ',
        'ПТ',
        'СБ',
        'ВС'
    ]
    const dayNames = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
    ]

    const getDayDate = (offset) => {
        const base = new Date(currentDate)
        const currentDay = base.getDay() || 7
        base.setDate(base.getDate() - (currentDay - 1) + offset)
        return base
    }

    const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString()

    const getWeekType = (date) => {
        const refDate = new Date('2025-09-01')
        const daysDiff = Math.floor((date - refDate) / 86400000)
        const weeksDiff = Math.floor(daysDiff / 7)
        return weeksDiff % 2 === 0 ? 'ЧЕТ' : 'НЕЧЕТ'
    }

    return (
        <div className="calendar-grid">
            {
                days.map((day, i) => {
                    const date = getDayDate(i)
                    const isActive = isSameDay(date, currentDate)
                    const weekType = getWeekType(date)

                    return (
                        <div key={day}
                             className={`calendar-day ${isActive ? 'active' : ''}`}
                             onClick={() => onDateClick(date)}>
                            <div className="week-indicator">
                                {weekType === 'ЧЕТ' ? 'ЧЁТ' : 'НЕЧЁТ'}
                            </div>
                            <div className="day-name">{dayNames[i]}</div>
                            <div className="day-number">{date.getDate()}</div>
                            {
                                isSameDay(date, new Date()) &&
                                    <div className="today-dot"></div>
                            }
                        </div>
                    );
                })
            }
        </div>
    )
}

export default ScheduleCalendar