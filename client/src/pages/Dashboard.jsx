import { useEffect, useState } from 'react'

const TOTAL_LESSONS = 20
const STORAGE_KEY = 'skillverse-completed-lessons'

function Dashboard() {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    const updateProgress = () => {
      try {
        setCompletedLessons(
          JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
        )
      } catch {
        setCompletedLessons({})
      }
    }

    window.addEventListener('storage', updateProgress)
    window.addEventListener('skillverse-progress-updated', updateProgress)

    return () => {
      window.removeEventListener('storage', updateProgress)
      window.removeEventListener('skillverse-progress-updated', updateProgress)
    }
  }, [])

  const completedCount = Object.values(completedLessons).filter(
    (completed) => completed === true
  ).length

  const remainingCount = Math.max(0, TOTAL_LESSONS - completedCount)
  const progressPercentage = Math.min(
    100,
    Math.round((completedCount / TOTAL_LESSONS) * 100)
  )

  return (
    <div className="dashboard-page">
      <h1>Student Dashboard</h1>
      <p>Welcome back to SkillVerse!</p>

      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h3>Total Lessons</h3>
          <p>{TOTAL_LESSONS}</p>
        </div>

        <div className="dashboard-card">
          <h3>Completed Lessons</h3>
          <p>{completedCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Remaining Lessons</h3>
          <p>{remainingCount}</p>
        </div>
      </div>

      <div className="dashboard-progress">
        <h2>Overall Progress</h2>
        <p>{progressPercentage}% completed</p>

        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <a href="/web-development">Continue Learning →</a>
      {' | '}
      <a href="/">Back to Home</a>
      <a href="/certificate">View Certificate 🏆</a>
    </div>
  )
}

export default Dashboard


