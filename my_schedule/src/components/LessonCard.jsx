import React from 'react'

const LessonCard = ({ lesson }) => {
    const groupLabel = typeof lesson.group === 'string' ? lesson.group
                                                            : lesson.group.toString()

    const typeIcons = {
        'ЛЕК': '📘',
        'ПР': '🛠️',
        'Л/Р': '🧪',
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
            </div>
        </div>
    )
}

export default LessonCard