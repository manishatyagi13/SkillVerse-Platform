import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'skillverse-completed-lessons'
const TOTAL_LESSONS = 20

function Certificate() {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    } catch {
      return {}
    }
  })

  const [studentName, setStudentName] = useState(
    () => localStorage.getItem('skillverse-student-name') || ''
  )

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

  const isEligible = completedCount >= TOTAL_LESSONS

  const saveName = (event) => {
    event.preventDefault()
    localStorage.setItem('skillverse-student-name', studentName.trim())
    setStudentName(studentName.trim())
  }

  if (!isEligible) {
    return (
      <div className="certificate-page">
        <div className="certificate-notice">
          <h1>🏆 Your Certificate Awaits!</h1>
          <p>Complete all 20 lessons to unlock your SkillVerse certificate.</p>
          <h2>{completedCount} of {TOTAL_LESSONS} lessons completed</h2>
          <div className="certificate-progress">
            <div style={{ width: `${Math.min(100, completedCount / TOTAL_LESSONS * 100)}%` }} />
          </div>
          <Link to="/web-development">Continue Learning →</Link>
          {' | '}
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="certificate-page">
      <form className="certificate-name-form" onSubmit={saveName}>
        <label htmlFor="student-name">Enter your name for the certificate</label>
        <input
          id="student-name"
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)}
          placeholder="Your full name"
          required
        />
        <button type="submit">Save Name</button>
      </form>

      <section className="certificate">
        <p className="certificate-brand">SKILLVERSE</p>
        <p className="certificate-subtitle">CERTIFICATE OF COMPLETION</p>
        <h1>Congratulations!</h1>
        <p className="certificate-description">This certificate is proudly presented to</p>
        <h2 className="certificate-student">
          {studentName.trim() || 'Your Name'}
        </h2>
        <p className="certificate-description">
          for successfully completing the Web Development course
          and all 20 lessons on SkillVerse.
        </p>
        <div className="certificate-footer">
          <div>
            <strong>{new Date().toLocaleDateString()}</strong>
            <span>Completion Date</span>
          </div>
          <div className="certificate-seal">SV</div>
          <div>
            <strong>SkillVerse</strong>
            <span>Learning Platform</span>
          </div>
        </div>
      </section>

      <div className="certificate-actions">
        <button onClick={() => window.print()}>Print / Save as PDF</button>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  )
}

export default Certificate
