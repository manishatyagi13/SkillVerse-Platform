import { Routes, Route } from 'react-router-dom'
import './App.css'
import DataScience from './pages/DataScience.jsx'
import WebDevelopment from './pages/WebDevelopment.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Certificate from './pages/Certificate.jsx'
import Auth from './pages/Auth.jsx'
import ArtificialIntelligence from './pages/ArtificialIntelligence.jsx'
import Navbar from './components/Navbar.jsx'

function Home() {
  return (
    <div className="skillverse">
      <header className="navbar" style={{ display: "none" }}>
        <a className="brand" href="/">
          <span className="brand-icon">S</span>
          SkillVerse
        </a>
        <nav className="nav-links">
          <a href="#explore">Explore</a>
          <a href="#paths">Learning Paths</a>
          <a href="#about">About</a>
        </nav>
        <a className="login-button" href="#explore">Get Started</a>
      </header>

      <main>
        <section className="hero-section" id="about">
          <div className="hero-content">
            <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
            <h1>Learn skills.<br />Build your <span>future.</span></h1>
            <p>Discover new skills, explore learning paths, and take the next step towards your dream career with SkillVerse.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#explore">Explore Courses ?</a>
              <a className="secondary-button" href="#paths">View Learning Paths</a>
            </div>
            <div className="hero-note">
              <span className="note-dot"></span>
              Start learning at your own pace
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>
            <div className="learning-card">
              <div className="card-top">
                <span className="card-symbol">?</span>
                <span className="live-label">YOUR NEXT CHAPTER</span>
              </div>
              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
              <div className="learning-symbol">S</div>
              <div className="floating-tag tag-one">? Discover</div>
              <div className="floating-tag tag-two">? Grow</div>
              <div className="floating-tag tag-three">? Achieve</div>
              <div className="card-caption">
                <span>THE POSSIBILITIES ARE YOURS</span>
                <h3>Make your next move count.</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="explore-section" id="explore">
          <div className="section-heading">
            <span className="eyebrow">FIND YOUR DIRECTION</span>
            <h2>What do you want to learn?</h2>
            <p>Choose an area and start building your future.</p>
          </div>
          <div className="category-grid">
            <article className="category-card">
              <span className="category-icon purple">?</span>
              <h3>Web Development</h3>
              <p>Learn to create beautiful websites and web applications.</p>
              <a href="/web-development">Explore path ?</a>
            </article>
            <article className="category-card">
              <span className="category-icon blue">?</span>
              <h3>Data Science</h3>
              <p>Turn data into insights and solve meaningful problems.</p>
              <a href="/data-science">Explore path →</a>
            </article>
            <article className="category-card">
              <span className="category-icon orange">?</span>
              <h3>Artificial Intelligence</h3>
              <p>Explore machine learning and intelligent technologies.</p>
              <a href="/artificial-intelligence">Explore path ?</a>
            </article>
          </div>
        </section>

        <section className="paths-section" id="paths">
          <span className="eyebrow">SMALL STEPS, BIG DREAMS</span>
          <h2>Your future is a skill away.</h2>
          <p>Pick a path, keep practising, and celebrate every milestone.</p>
          <a className="primary-button" href="#explore">Find Your Learning Path ?</a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="/"><span className="brand-icon">S</span> SkillVerse</a>
        <p>Keep learning. Keep growing. Keep becoming.</p>
        <span>© 2026 SkillVerse</span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/data-science" element={<DataScience />} />
    <Route path="/artificial-intelligence" element={<ArtificialIntelligence />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App






