import { Link } from 'react-router-dom'
import '../App.css'

function DataScience() {
  return (
    <div className="skillverse">
      <main className="paths-section">
        <span className="eyebrow">YOUR LEARNING JOURNEY</span>
        <h1>Data Science</h1>
        <p>
          Learn how to analyze data, discover patterns, and build
          data-driven solutions.
        </p>

        <h2>What you will learn</h2>
        <p>1. Python Programming</p>
        <p>2. Statistics and Probability</p>
        <p>3. Data Analysis with Pandas</p>
        <p>4. Data Visualization</p>
        <p>5. Machine Learning Fundamentals</p>

        <Link className="primary-button" to="/dashboard">
          Go to Dashboard
        </Link>
        {' '}
        <Link className="secondary-button" to="/">
          Back to Home
        </Link>
      </main>
    </div>
  )
}

export default DataScience