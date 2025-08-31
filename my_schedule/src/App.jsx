import React from 'react'
import WeekNavigator from './components/WeekNavigator'
import ScheduleCalendar from './components/ScheduleCalendar'
import LessonCard from './components/LessonCard'
import scheduleData from './data/schedule.json'
import './styles/main.scss'

const App = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date())
    const [theme, setTheme] = React.useState('dark')

    React.useEffect(() => {
        setCurrentDate(new Date())
    }, [])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }

    const getWeekType = (date) => {
        const yearStart = new Date(date.getFullYear(), 0, 1)
        const pastDays = Math.floor((date - yearStart) / 86400000)
        const dayOfWeek = (yearStart.getDay() + 6) % 7
        const weekNumber = Math.ceil((pastDays + dayOfWeek + 1) / 7)

        return weekNumber % 2 === 0 ? 'ЧЕТ' : 'НЕЧЕТ';
    }

    const currentWeekType = getWeekType(currentDate)

    const formatDateLong = (date) => {
        const options = {
            day: 'numeric',
            month: 'long',
            weekday: 'long'
        }
        return new Intl.DateTimeFormat('ru-RU', options)
            .format(date);
    }

    const parseDateStr = (dateStr) => {
        if (!dateStr.trim())
            return []

        return dateStr.split(' ').map((d) => {
            const [day, month] = d.split('.')
            return `2025-${month}-${day}`
        })
    }

    const shouldShowLesson = (lesson) => {
        const lessonDay = [
            'ПН',
            'ВТ',
            'СР',
            'ЧТ',
            'ПТ',
            'СБ',
            'ВС'
        ].indexOf(lesson.day);
        const lessonDate = new Date(currentDate)
        lessonDate.setDate(currentDate.getDate() - currentDate.getDay() + 1 + lessonDay)

        if (lesson.day === 'ВС')
            return false

        if (lessonDate.toDateString() !== currentDate.toDateString())
            return false

        if (lesson.type === 'Л/Р')
            return lesson.weekType === currentWeekType

        if (lesson.date && lesson.date.trim()) {
            const specificDates = parseDateStr(lesson.date)
            const todayStr = currentDate.toISOString().split('T')[0]
            return specificDates.includes(todayStr)
        }

        return lesson.weekType === currentWeekType
    }

    const filteredLessons = scheduleData.filter(shouldShowLesson);

    return (
        <div className={`app ${theme}`}>
            <header className="app-header">
                <h1>🎓 Расписание преподавателя</h1>
                <button onClick={toggleTheme}
                        className="theme-toggle">
                    {theme === 'light' ? '☀️' : '🌙'}
                </button>
            </header>

            <main className="app-main">
                <WeekNavigator currentDate={currentDate}
                               onDateChange={setCurrentDate}/>

                <ScheduleCalendar currentDate={currentDate}
                                  onDateClick={setCurrentDate}
                                  currentWeekType={getWeekType(currentDate)}/>

                <div className="today-header">
                    <h2>{formatDateLong(currentDate)}</h2>
                    {
                        filteredLessons.length === 0 &&
                            <p className="no-classes">Выходной 🎉</p>
                    }
                </div>

                <div className="schedule-container">
                    {
                        filteredLessons.length > 0 ? (
                            filteredLessons.sort((a, b) => a.time.localeCompare(b.time))
                                           .map((lesson, index) =>
                                               <LessonCard key={index} lesson={lesson}/>
                                           )
                    ) : (
                        <p className="no-classes-large">Сегодня нет занятий</p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default App