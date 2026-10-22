import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const modules = [
  {
    name: 'Python Fundamentals',
    lessons: [
      ['Introduction to Python', 'Python is a beginner-friendly programming language used for automation, data analysis and machine learning.', 'What is Python commonly used for?', ['Only web browsing', 'Data analysis and programming', 'Only making documents', 'Only editing photos'], 1],
      ['Variables and Data Types', 'Variables store values. Common Python data types include integers, floats, strings and booleans.', 'Which type stores text?', ['int', 'float', 'str', 'bool'], 2],
      ['Conditions and Loops', 'Conditions make decisions using if and else. Loops repeat tasks using for or while.', 'Which keyword starts a condition in Python?', ['if', 'repeat', 'check', 'choose'], 0],
      ['Functions and Collections', 'Functions reuse code. Lists store ordered items, and dictionaries store key-value pairs.', 'Which brackets create a Python list?', ['{}', '[]', '()', '<>'], 1],
    ],
  },
  {
    name: 'Statistics and Probability',
    lessons: [
      ['Understanding Data', 'Data can be numerical or categorical. Understanding its type helps select suitable analysis methods.', 'Which is categorical data?', ['Height in cm', 'Age in years', 'Eye colour', 'Weight in kg'], 2],
      ['Mean, Median and Mode', 'Mean is the average, median is the middle value after sorting, and mode is the most frequent value.', 'What is the mean of 2, 4 and 6?', ['2', '3', '4', '6'], 2],
      ['Probability Basics', 'Probability measures how likely an event is, from 0 for impossible to 1 for certain.', 'What is the probability of a certain event?', ['0', '0.5', '1', '10'], 2],
      ['Correlation and Distributions', 'Correlation describes how variables move together. It does not by itself prove causation.', 'Does correlation always prove causation?', ['Yes', 'No', 'Only for large data', 'Always'], 1],
    ],
  },
  {
    name: 'Data Analysis with Pandas',
    lessons: [
      ['NumPy Basics', 'NumPy provides efficient arrays and numerical operations for scientific computing in Python.', 'Which library is designed for numerical arrays?', ['NumPy', 'Flask', 'Django', 'React'], 0],
      ['Pandas DataFrames', 'A DataFrame is a table of rows and columns. Pandas helps load, clean and analyse structured data.', 'What is a Pandas DataFrame?', ['A database server', 'A table-like data structure', 'A website', 'A chart only'], 1],
      ['Cleaning Missing Data', 'Missing values can be inspected, filled or removed depending on the dataset and analysis goal.', 'Which is a common way to handle missing values?', ['Ignore every issue', 'Fill or remove values appropriately', 'Duplicate all rows', 'Rename columns only'], 1],
      ['Filtering and Grouping', 'Filtering selects rows that meet conditions. Grouping summarises data by categories.', 'What does filtering do?', ['Selects rows matching a condition', 'Deletes Python', 'Creates passwords', 'Always sorts images'], 0],
    ],
  },
  {
    name: 'Data Visualization',
    lessons: [
      ['Choosing the Right Chart', 'Bar charts compare categories, line charts show trends over time, and scatter plots show relationships.', 'Which chart is useful for trends over time?', ['Pie chart only', 'Line chart', 'Word cloud', 'Table border'], 1],
      ['Matplotlib Fundamentals', 'Matplotlib is a Python library for creating plots, charts and customised visualisations.', 'Which library can create Python plots?', ['Matplotlib', 'Express', 'Mongo only', 'HTML only'], 0],
      ['Exploratory Data Analysis', 'EDA uses summaries and visualisations to understand patterns, outliers and data quality before modelling.', 'What is a main goal of EDA?', ['Understand the dataset', 'Guarantee perfect predictions', 'Hide outliers', 'Delete all features'], 0],
      ['Communicating Insights', 'Effective visualisations use clear labels, suitable scales and honest representations of the data.', 'What improves chart readability?', ['Missing labels', 'Misleading scales', 'Clear labels and titles', 'Unexplained colours only'], 2],
    ],
  },
  {
    name: 'Machine Learning',
    lessons: [
      ['Machine Learning Basics', 'Machine learning finds patterns in data to make predictions or decisions without manually writing every rule.', 'What does machine learning learn from?', ['Examples and data', 'Monitor size', 'Keyboard layout', 'File names only'], 0],
      ['Supervised and Unsupervised Learning', 'Supervised learning uses labelled examples. Unsupervised learning discovers structure in unlabelled data.', 'Which learning type uses labelled examples?', ['Supervised', 'Unsupervised', 'Neither', 'Random typing'], 0],
      ['Training and Evaluation', 'Data is commonly split into training and testing sets to evaluate how well a model generalises.', 'Why keep a test set?', ['Evaluate performance on unseen data', 'Make the dataset invisible', 'Increase file size', 'Avoid evaluation'], 0],
      ['Model Evaluation and Ethics', 'Metrics such as accuracy and precision help evaluate models. Check bias, privacy and data leakage too.', 'What should responsible ML consider?', ['Only speed', 'Bias and privacy', 'Only colour', 'File size alone'], 1],
    ],
  },
]

const allLessons = modules.flatMap((module, moduleIndex) =>
  module.lessons.map((lesson, lessonIndex) => ({
    id: moduleIndex * 4 + lessonIndex,
    module: module.name,
    title: lesson[0],
    content: lesson[1],
    question: lesson[2],
    options: lesson[3],
    answer: lesson[4],
  }))
)

const STORAGE_KEY = 'skillverse-ds-progress'

function DataScience() {
  const [completed, setCompleted] = useState([])
  const [current, setCurrent] = useState(0)
  const [choice, setChoice] = useState(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (Array.isArray(saved)) setCompleted(saved)
    } catch {
      setCompleted([])
    }
  }, [])

  const lesson = allLessons[current]
  const isCompleted = completed.includes(lesson.id)
  const percent = Math.round((completed.length / allLessons.length) * 100)

  function checkAnswer() {
    if (choice === null) return
    setChecked(true)
    if (choice === lesson.answer && !completed.includes(lesson.id)) {
      const updated = [...completed, lesson.id]
      setCompleted(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
  }

  function selectLesson(index) {
    setCurrent(index)
    setChoice(null)
    setChecked(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb', color: '#20213a', fontFamily: 'Inter, Arial, sans-serif' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e7e7f0', padding: '18px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: '#6544d8', fontWeight: 800, fontSize: 21, textDecoration: 'none' }}>✦ SkillVerse</Link>
        <nav style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
          <Link to="/dashboard" style={{ color: '#555', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/certificate" style={{ color: '#6544d8', textDecoration: 'none' }}>Certificates</Link>
        </nav>
      </header>

      <main style={{ maxWidth: 1180, margin: 'auto', padding: '32px 18px' }}>
        <section style={{ background: 'linear-gradient(120deg,#31246f,#7550db)', color: '#fff', padding: '30px', borderRadius: 22, marginBottom: 24 }}>
          <div style={{ fontSize: 13, letterSpacing: 2, opacity: .85 }}>SKILLVERSE LEARNING PATH</div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', margin: '12px 0' }}>Data Science</h1>
          <p style={{ lineHeight: 1.7, maxWidth: 680 }}>Learn Python, statistics, data analysis, visualisation and machine learning through guided lessons and quizzes.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
            <strong>{completed.length} of {allLessons.length} lessons completed</strong>
            <strong>{percent}% complete</strong>
          </div>
          <div style={{ height: 9, background: '#ffffff45', borderRadius: 20, marginTop: 10, overflow: 'hidden' }}>
            <div style={{ width: `${percent}%`, height: '100%', background: '#75f0c0', transition: 'width .25s' }} />
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 22, alignItems: 'start' }}>
          <aside style={{ background: '#fff', border: '1px solid #e8e8f1', borderRadius: 18, padding: 20 }}>
            <h2 style={{ fontSize: 19, marginTop: 0 }}>Course content</h2>
            {modules.map((module, mi) => (
              <div key={module.name} style={{ marginBottom: 18 }}>
                <h3 style={{ fontSize: 14, color: '#6544d8' }}>{mi + 1}. {module.name}</h3>
                {module.lessons.map((item, li) => {
                  const index = mi * 4 + li
                  return (
                    <button key={item[0]} onClick={() => selectLesson(index)} style={{ width: '100%', textAlign: 'left', padding: '10px 9px', margin: '3px 0', border: current === index ? '1px solid #7755dd' : '1px solid transparent', borderRadius: 9, background: current === index ? '#f0ebff' : '#fff', color: '#303047', cursor: 'pointer', lineHeight: 1.45 }}>
                      <span style={{ marginRight: 7 }}>{completed.includes(index) ? '✓' : '○'}</span>{li + 1}. {item[0]}
                    </button>
                  )
                })}
              </div>
            ))}
          </aside>

          <section style={{ background: '#fff', border: '1px solid #e8e8f1', borderRadius: 18, padding: 'clamp(20px,4vw,32px)' }}>
            <div style={{ color: '#7652d8', fontWeight: 700, fontSize: 13 }}>{lesson.module.toUpperCase()}</div>
            <h2 style={{ fontSize: 27, lineHeight: 1.3 }}>{lesson.title}</h2>
            <p style={{ color: '#56566c', fontSize: 16, lineHeight: 1.9 }}>{lesson.content}</p>

            <div style={{ background: '#f7f5ff', borderRadius: 14, padding: 20, marginTop: 25 }}>
              <h3 style={{ marginTop: 0 }}>Quick quiz</h3>
              <p style={{ fontWeight: 600, lineHeight: 1.6 }}>{lesson.question}</p>
              {lesson.options.map((option, i) => (
                <button key={option} disabled={checked} onClick={() => setChoice(i)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: 13, margin: '9px 0', borderRadius: 10, border: choice === i ? '2px solid #7652d8' : '1px solid #dedbea', background: checked && i === lesson.answer ? '#ddf8eb' : choice === i ? '#eee8ff' : '#fff', color: '#292940', cursor: checked ? 'default' : 'pointer' }}>
                  {String.fromCharCode(65 + i)}. {option}
                  {checked && i === lesson.answer ? ' ✓' : ''}
                </button>
              ))}
              {checked && (
                <p role="status" style={{ color: choice === lesson.answer ? '#168253' : '#b53b45', fontWeight: 700, lineHeight: 1.6 }}>
                  {choice === lesson.answer ? 'Correct! Your lesson progress has been saved.' : 'Not quite. Review the correct option above, then try again.'}
                </p>
              )}
              {!checked ? (
                <button onClick={checkAnswer} disabled={choice === null} style={{ background: choice === null ? '#c8c2dc' : '#6544d8', color: '#fff', border: 0, padding: '12px 20px', borderRadius: 10, fontWeight: 700, cursor: choice === null ? 'not-allowed' : 'pointer' }}>Check answer</button>
              ) : choice !== lesson.answer ? (
                <button onClick={() => { setChoice(null); setChecked(false) }} style={{ background: '#6544d8', color: '#fff', border: 0, padding: '12px 20px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Try again</button>
              ) : null}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              <button disabled={current === 0} onClick={() => selectLesson(current - 1)} style={{ padding: '11px 16px', borderRadius: 9, border: '1px solid #dedbea', background: '#fff', cursor: current === 0 ? 'not-allowed' : 'pointer' }}>← Previous</button>
              <button disabled={current === allLessons.length - 1} onClick={() => selectLesson(current + 1)} style={{ padding: '11px 16px', borderRadius: 9, border: 0, background: '#6544d8', color: '#fff', cursor: current === allLessons.length - 1 ? 'not-allowed' : 'pointer' }}>Next lesson →</button>
            </div>
            {completed.length === allLessons.length && (
              <div style={{ marginTop: 24, padding: 18, borderRadius: 12, background: '#e3f8ed' }}>
                <h3>🎉 Course completed!</h3>
                <p>You have passed the quizzes for all 20 lessons.</p>
                <Link to="/certificate" style={{ color: '#176d49', fontWeight: 700 }}>Open certificate page →</Link>
              </div>
            )}
            <p style={{ color: '#77758a', fontSize: 12, marginTop: 22 }}>Progress is saved in this browser on this device.</p>
          </section>
        </div>
      </main>
    </div>
  )
}

export default DataScience
