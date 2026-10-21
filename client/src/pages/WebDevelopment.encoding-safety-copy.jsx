import { useState, useEffect } from 'react'
import { moduleQuizzes } from './moduleQuizzes'

function WebDevelopment() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('skillverse-completed-lessons')) || {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'skillverse-completed-lessons',
      JSON.stringify(completedLessons)
    )
  }, [completedLessons])

  const lessonDetails = {
    "Introduction to HTML": {
      explanation: "HTML stands for HyperText Markup Language. It provides the structure of a web page using elements such as headings, paragraphs, links, and images.",
      example: '<h1>Welcome to SkillVerse</h1>\n<p>My first web page.</p>',
      output: "Welcome to SkillVerse\nMy first web page."
    },
    "Headings and paragraphs": {
      explanation: "HTML headings organise content from h1 (most important) to h6. Use the p element for paragraphs of text.",
      example: '<h1>My Website</h1>\n<h2>About Me</h2>\n<p>Welcome to my website.</p>',
      output: "My Website\nAbout Me\nWelcome to my website."
    },
    "Links and images": {
      explanation: "The a element creates a clickable link using href. The img element displays an image using src and should include descriptive alt text.",
      example: '<a href="https://example.com">Visit Example</a>\n<img src="photo.jpg" alt="A beautiful view">',
      output: "A clickable link and an image with descriptive alternative text."
    },
    "Lists and tables": {
      explanation: "Use ul for a bulleted list, ol for a numbered list, and li for each list item. Tables organise data into rows and columns.",
      example: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>',
      output: "• HTML\n• CSS"
    },
    "Build your first web page": {
      explanation: "An HTML document usually contains a doctype, html, head, title, and body. The body contains the content visible on the page.",
      example: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, SkillVerse!</h1>\n  <p>I built my first page.</p>\n</body>\n</html>',
      output: "A web page displaying Hello, SkillVerse! and I built my first page."
    }
  }
  const topics = [
    {
      title: 'HTML Fundamentals',
      detail: 'Build the structure of web pages.',
      icon: 'HTML',
      lessons: [
        'Introduction to HTML',
        'Headings and paragraphs',
        'Links and images',
        'Lists and tables',
        'Build your first web page',
      ],
    },
    {
      title: 'CSS & Responsive Design',
      detail: 'Style websites for every screen size.',
      icon: 'CSS',
      lessons: [
        'Introduction to CSS',
        'Colors and typography',
        'Box model and spacing',
        'Flexbox and Grid',
        'Responsive design basics',
      ],
    },
    {
      title: 'JavaScript Essentials',
      detail: 'Add logic and interactivity to websites.',
      icon: 'JS',
      lessons: [
        'Variables and data types',
        'Conditions and loops',
        'Functions',
        'Arrays and objects',
        'DOM and events',
      ],
    },
    {
      title: 'React Fundamentals',
      detail: 'Build reusable user interface components.',
      icon: 'R',
      lessons: [
        'What is React?',
        'Components and JSX',
        'Props',
        'State and events',
        'Build a small React app',
      ],
    },
  ]

  const filteredTopics = topics.map((topic) => ({ ...topic, lessons: topic.lessons.filter((lesson) => lesson.toLowerCase().includes(searchTerm.toLowerCase())) })).filter((topic) => topic.lessons.length > 0)

  const activeTopic = topics.find(
    (topic) => topic.title === selectedTopic
  )

  return (
    <main className="course-page">
      <a className="course-back" href="/">? Back to SkillVerse</a>

      <section className="course-hero">
        <span className="eyebrow">YOUR LEARNING JOURNEY</span>
        <h1>Become a <span>Web Developer.</span></h1>
        <p>
          Learn how to build beautiful, responsive, and interactive websites
          from the ground up.
        </p>
        <div className="course-stats">
          <span>4 learning modules</span>
          <span>Beginner friendly</span>
          <span>Hands-on practice</span>
        </div>
      </section>

      <section className="course-content">
        <h2>Your learning roadmap</h2>
        <p>Choose a module to explore its lessons.</p>

        <div className="lesson-search">
          <input
            type="search"
            placeholder="Search lessons, e.g. HTML, Functions, React..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search lessons"
          />
          {searchTerm && (
            <button type="button" onClick={() => setSearchTerm('')}>
              Clear
            </button>
          )}
        </div>

        {searchTerm && (
          <p className="search-results-message" role="status">
            {(() => {
              const count = filteredTopics.reduce(
                (total, topic) => total + topic.lessons.length,
                0
              )
              return count === 0
                ? 'No matching lessons found. Try another keyword.'
                : `${count} matching ${count === 1 ? 'lesson' : 'lessons'} found`
            })()}
          </p>
        )}

        <div className="course-topic-grid">
          {filteredTopics.map((topic, index) => (
            <button
              className="course-topic"
              key={topic.title}
              type="button"
              onClick={() =>
                setSelectedTopic(
                  selectedTopic === topic.title ? null : topic.title
                )
              }
              aria-expanded={selectedTopic === topic.title}
            >
              <span className="topic-number">
                MODULE 0{index + 1}
              </span>
              <div className="topic-icon">{topic.icon}</div>
              <h3>{topic.title}</h3>
              <p>{topic.detail}</p>
              <span className="topic-status">
                {selectedTopic === topic.title
                  ? 'Close lessons ?'
                  : 'View lessons ?'}
              </span>
            </button>
          ))}
        </div>

        {activeTopic && (
          <section className="lesson-panel">
            <h2>{activeTopic.title} — Lessons</h2>
            <p>Tick each lesson when you finish it.</p>

            {(() => {
              const completedCount = activeTopic.lessons.filter(
                (lesson) => completedLessons[`${activeTopic.title}-${lesson}`]
              ).length

              const progress = Math.round(
                (completedCount / activeTopic.lessons.length) * 100
              )

              return (
                <>
                  <div className="lesson-progress">
                    <div className="lesson-progress-info">
                      <strong>Your progress</strong>
                      <span>
                        {completedCount} of {activeTopic.lessons.length} completed
                      </span>
                    </div>
                    <div
                      className="lesson-progress-track"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="lesson-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p>{progress}% complete</p>
                  </div>

                  <ol className="lesson-list">
                    {activeTopic.lessons.filter((lesson) => lesson.toLowerCase().includes(searchTerm.toLowerCase())).map((lesson, index) => {
                      const lessonKey = `${activeTopic.title}-${lesson}`
                      const isCompleted = Boolean(completedLessons[lessonKey])

                      return (
                        <li
                          key={lesson}
                          className={isCompleted ? 'lesson-completed' : ''}
                        >
                          <button
                            type="button"
                            className="lesson-open-button"
                            onClick={() => setSelectedLesson(lesson)}
                          >
                            Open lesson ?
                          </button>
                          <label className="lesson-checkbox">
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={(event) => {
                                setCompletedLessons((previous) => ({
                                  ...previous,
                                  [lessonKey]: event.target.checked,
                                }))
                                window.dispatchEvent(new Event('skillverse-progress-updated'))
                              }}
                            />
                            <span>
                              <span>Lesson {index + 1}</span>
                              <strong>{lesson}</strong>
                            </span>
                          </label>
                        </li>
                      )
                    })}
                  </ol>

                  {selectedLesson && (
                    <div className="lesson-detail">
                      <h3>{selectedLesson}</h3>
                      <p>
                        {lessonDetails[selectedLesson]?.explanation ||
                          "This lesson introduces an important concept in web development. Study the example and practise it in your own project."}
                      </p>

                      {lessonDetails[selectedLesson] && (
                        <>
                          <h4>Code example</h4>
                          <pre>
                            <code>{lessonDetails[selectedLesson].example.replace(/\\n/g, "\n")}</code>
                          </pre>
                          <h4>Expected output</h4>
                          <pre>
                            <code>{lessonDetails[selectedLesson].output}</code>
                          </pre>
                        </>
                      )}

                      <button
                        type="button"
                        className="lesson-close-button"
                        onClick={() => setSelectedLesson(null)}
                      >
                        Close lesson
                      </button>
                    </div>
                  )}
                </>

              <section className="module-quiz">
                <h3>Module Quiz: {activeTopic.title}</h3>
                <p>Answer all five questions, then submit to see your score.</p>

                {(moduleQuizzes[activeTopic.title] || []).map((question, questionIndex) => (
                  <fieldset key={questionIndex} className="quiz-question">
                    <legend>{questionIndex + 1}. {question.question}</legend>
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="quiz-option">
                        <input
                          type="radio"
                          name={`quiz-${activeTopic.title}-${questionIndex}`}
                          checked={quizAnswers[activeTopic.title]?.[questionIndex] === optionIndex}
                          disabled={quizSubmitted}
                          onChange={() => setQuizAnswers((previous) => ({
                            ...previous,
                            [activeTopic.title]: {
                              ...previous[activeTopic.title],
                              [questionIndex]: optionIndex,
                            },
                          }))}
                        />
                        {option}
                      </label>
                    ))}
                    {quizSubmitted && (
                      <p>
                        {quizAnswers[activeTopic.title]?.[questionIndex] === question.answer
                          ? 'Correct! ?'
                          : `Correct answer: ${question.options[question.answer]}`}
                      </p>
                    )}
                  </fieldset>
                ))}

                {!quizSubmitted ? (
                  <button
                    type="button"
                    onClick={() => setQuizSubmitted(true)}
                    disabled={(moduleQuizzes[activeTopic.title] || []).some(
                      (_, index) => quizAnswers[activeTopic.title]?.[index] === undefined
                    )}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <>
                    <h4>
                      Your score: {(moduleQuizzes[activeTopic.title] || []).filter(
                        (question, index) => quizAnswers[activeTopic.title]?.[index] === question.answer
                      ).length} / {(moduleQuizzes[activeTopic.title] || []).length}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers((previous) => ({ ...previous, [activeTopic.title]: {} }))
                        setQuizSubmitted(false)
                      }}
                    >
                      Try Again
                    </button>
                  </>
                )}
              </section>
              )
            })()}
          </section>
        )}
      </section>
    </main>
  )
}

export default WebDevelopment

















