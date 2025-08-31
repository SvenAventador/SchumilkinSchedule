import React from 'react'

const LessonCard = ({ lesson }) => {
    const groupLabel = typeof lesson.group === 'string' ?
        lesson.group : lesson.group.toString()

    const typeIcons = {
        'ЛЕК': '📘',
        'ПР': '🛠️',
        'Л/Р': '🧪',
    }

    const renderDateList = () => {
        if (lesson.type !== 'Л/Р' ||
            !lesson.date ||
            !lesson.date.trim())
            return null

        const dateStrings = lesson.date.split(' ').filter(Boolean)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        return (
            <div className="lesson-dates">
                {dateStrings.map((d) => {
                    const [day, month] = d.split('.')
                    const date = new Date(`2025-${month}-${day}`)
                    date.setHours(0, 0, 0, 0)

                    let status = 'future'
                    if (date.getTime() === today.getTime())
                        status = 'today'
                    if (date < today)
                        status = 'past'

                    return (
                        <span key={d} className={`date-item ${status}`}>{d}</span>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="lesson-card">
            <div className="lesson-time">{lesson.time}</div>
            <div className="lesson-content">
                <div className="lesson-header">
                    <h3 className="lesson-subject">{lesson.subject}</h3>
                    <span className="lesson-type" title={lesson.type}>
                        {typeIcons[lesson.type] || '📚'}
                    </span>
                </div>

                <div className="lesson-info">
                    <div className="lesson-meta">
                        <span className="icon">👥</span>
                        <span className="lesson-group">{groupLabel}</span>
                    </div>
                    <div className="lesson-meta">
                        <span className="icon">🚪</span>
                        <span className="lesson-auditory">{lesson.auditory}</span>
                    </div>
                </div>

                {renderDateList()}
            </div>
        </div>
    )
}

export default LessonCard