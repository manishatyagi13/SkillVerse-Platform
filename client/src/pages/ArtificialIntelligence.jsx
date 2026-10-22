import { useState, useEffect } from 'react'

const modules = [
  {
    title: 'Introduction to Artificial Intelligence',
    lessons: [
      {
        title: 'What is Artificial Intelligence?',
        content: 'Artificial Intelligence (AI) is a field of computer science that develops systems capable of performing tasks that normally require human intelligence, such as reasoning, learning and problem-solving.'
      },
      {
        title: 'Types of AI',
        content: 'Narrow AI is designed for specific tasks, such as voice assistants. Artificial General Intelligence (AGI) describes a hypothetical system with broad human-like abilities. Most AI used today is Narrow AI.'
      },
      {
        title: 'Applications of AI',
        content: 'AI is used in healthcare, education, banking, recommendation systems, image recognition, translation and customer support.'
      }
    ],
    questions: [
      { q: 'What does AI stand for?', options: ['Automated Internet', 'Artificial Intelligence', 'Advanced Input', 'Applied Information'], answer: 1 },
      { q: 'Which is an example of AI?', options: ['A simple ruler', 'A paper notebook', 'A voice assistant', 'An ordinary light switch'], answer: 2 },
      { q: 'Where can AI be used?', options: ['Healthcare', 'Education', 'Banking', 'All of these'], answer: 3 }
    ]
  },
  {
    title: 'Machine Learning Basics',
    lessons: [
      {
        title: 'What is Machine Learning?',
        content: 'Machine Learning (ML) is a branch of AI that allows computers to learn patterns from data and make predictions or decisions without explicitly programming every rule.'
      },
      {
        title: 'Supervised and Unsupervised Learning',
        content: 'Supervised learning uses labelled examples. Unsupervised learning discovers patterns in data without labelled answers, such as grouping similar customers.'
      },
      {
        title: 'Training and Testing Data',
        content: 'Training data helps a model learn patterns. Test data evaluates how well the trained model performs on data it has not seen before.'
      }
    ],
    questions: [
      { q: 'Machine Learning is a branch of:', options: ['AI', 'HTML', 'CSS', 'Networking only'], answer: 0 },
      { q: 'Supervised learning uses:', options: ['No data', 'Labelled data', 'Only images', 'Only random numbers'], answer: 1 },
      { q: 'Why do we use test data?', options: ['To delete a model', 'To style a page', 'To evaluate model performance', 'To create HTML'], answer: 2 }
    ]
  },
  {
    title: 'Neural Networks and Deep Learning',
    lessons: [
      {
        title: 'Neural Network Basics',
        content: 'An artificial neural network contains connected computational units arranged in layers. These units process input data and learn patterns by adjusting their parameters.'
      },
      {
        title: 'What is Deep Learning?',
        content: 'Deep Learning uses neural networks with multiple layers. It is useful for tasks such as speech recognition, image analysis and language processing.'
      },
      {
        title: 'Responsible AI',
        content: 'Responsible AI involves considering fairness, privacy, transparency, security and potential harms when designing and using AI systems.'
      }
    ],
    questions: [
      { q: 'A neural network is made of connected:', options: ['Web pages', 'Computational units', 'Spreadsheets only', 'Routers only'], answer: 1 },
      { q: 'Deep Learning commonly uses:', options: ['Only HTML tags', 'Paper documents', 'Multi-layer neural networks', 'No data'], answer: 2 },
      { q: 'Which is an important responsible AI consideration?', options: ['Fairness', 'Privacy', 'Transparency', 'All of these'], answer: 3 }
    ]
  }
]

const storageKey = 'skillverse-ai-progress'

function ArtificialIntelligence() {
  const [activeModule, setActiveModule] = useState(0)
  const [activeLesson, setActiveLesson] = useState(0)
  const [answers, setAnswers] = useState({})
  const [scores, setScores] = useState({})
  const [completed, setCompleted] = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
      setAnswers(saved.answers || {})
      setScores(saved.scores || {})
      setCompleted(saved.completed || [])
    } catch {
      // Start with fresh progress if saved data is unreadable.
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ answers, scores, completed }))
  }, [answers, scores, completed])

  const module = modules[activeModule]
  const lesson = module.lessons[activeLesson]
  const moduleKey = String(activeModule)
  const currentAnswers = answers[moduleKey] || {}
  const allAnswered = module.questions.every((_, i) => currentAnswers[i] !== undefined)
  const score = scores[moduleKey]

  function markComplete() {
    const key = `${activeModule}-${activeLesson}`
    setCompleted(previous => previous.includes(key) ? previous : [...previous, key])
  }

  function submitQuiz() {
    if (!allAnswered) return
    const result = module.questions.reduce(
      (total, question, index) => total + (currentAnswers[index] === question.answer ? 1 : 0),
      0
    )
    setScores(previous => ({ ...previous, [moduleKey]: result }))
  }

  return (
    <main style={{ maxWidth: 1000, margin: '35px auto', padding: '24px', color: '#22223b' }}>
      <a href="/" style={{ color: '#6d4aff', textDecoration: 'none' }}>← Back to SkillVerse</a>
      <header style={{ padding: '28px 0' }}>
        <p style={{ color: '#7657e8', fontWeight: 700 }}>SKILLVERSE LEARNING PATH</p>
        <h1>Artificial Intelligence</h1>
        <p>Learn AI concepts, study lessons and test your knowledge with quizzes.</p>
        <p><strong>Lessons completed:</strong> {completed.length} / 9</p>
        <div style={{ height: 8, background: '#ece9f8', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ width: `${completed.length / 9 * 100}%`, height: '100%', background: '#7657e8' }} />
        </div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
        {modules.map((item, index) => (
          <button key={item.title} onClick={() => { setActiveModule(index); setActiveLesson(0) }} style={{ padding: 16, textAlign: 'left', borderRadius: 12, border: activeModule === index ? '2px solid #7657e8' : '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>
            <strong>{index + 1}. {item.title}</strong>
            <p>{item.lessons.filter((_, i) => completed.includes(`${index}-${i}`)).length} / {item.lessons.length} lessons complete</p>
          </button>
        ))}
      </section>

      <section style={{ border: '1px solid #e5e1f2', borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <p style={{ color: '#7657e8', fontWeight: 700 }}>MODULE {activeModule + 1} · LESSON {activeLesson + 1}</p>
        <h2>{lesson.title}</h2>
        <p style={{ lineHeight: 1.8 }}>{lesson.content}</p>
        <button onClick={markComplete} disabled={completed.includes(`${activeModule}-${activeLesson}`)} style={{ padding: '12px 18px', border: 0, borderRadius: 8, background: completed.includes(`${activeModule}-${activeLesson}`) ? '#e4f5e9' : '#7657e8', color: completed.includes(`${activeModule}-${activeLesson}`) ? '#22663b' : '#fff', cursor: 'pointer' }}>
          {completed.includes(`${activeModule}-${activeLesson}`) ? '✓ Lesson Completed' : 'Mark Lesson Complete'}
        </button>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
          <button disabled={activeLesson === 0} onClick={() => setActiveLesson(n => n - 1)}>← Previous Lesson</button>
          <button disabled={activeLesson === module.lessons.length - 1} onClick={() => setActiveLesson(n => n + 1)}>Next Lesson →</button>
        </div>
      </section>

      <section style={{ border: '1px solid #e5e1f2', borderRadius: 16, padding: 24 }}>
        <h2>Module Quiz</h2>
        <p>Answer all {module.questions.length} questions and submit to see your score.</p>
        {module.questions.map((question, index) => (
          <fieldset key={question.q} style={{ border: '1px solid #eee', borderRadius: 10, padding: 16, margin: '16px 0' }}>
            <legend><strong>{index + 1}. {question.q}</strong></legend>
            {question.options.map((option, optionIndex) => (
              <label key={option} style={{ display: 'block', padding: 6, cursor: score !== undefined ? 'default' : 'pointer' }}>
                <input type="radio" name={`ai-${activeModule}-${index}`} checked={currentAnswers[index] === optionIndex} disabled={score !== undefined} onChange={() => setAnswers(previous => ({ ...previous, [moduleKey]: { ...(previous[moduleKey] || {}), [index]: optionIndex } }))} />
                {' '}{option}
              </label>
            ))}
          </fieldset>
        ))}
        {score === undefined ? (
          <button disabled={!allAnswered} onClick={submitQuiz} style={{ padding: '12px 18px', border: 0, borderRadius: 8, background: allAnswered ? '#7657e8' : '#aaa', color: '#fff', cursor: allAnswered ? 'pointer' : 'not-allowed' }}>Submit Quiz</button>
        ) : (
          <div>
            <h3>Your Score: {score} / {module.questions.length}</h3>
            <p>{score === module.questions.length ? 'Excellent work!' : 'Good effort! Review the lessons and keep practising.'}</p>
            <button onClick={() => { setAnswers(previous => { const next = { ...previous }; delete next[moduleKey]; return next }); setScores(previous => { const next = { ...previous }; delete next[moduleKey]; return next }) }}>Retake Quiz</button>
          </div>
        )}
      </section>
    </main>
  )
}

export default ArtificialIntelligence
