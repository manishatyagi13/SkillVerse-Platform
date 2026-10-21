import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="shared-navbar">
      <Link className="shared-brand" to="/">
        <span className="shared-brand-icon">S</span>
        SkillVerse
      </Link>

      <nav className="shared-nav-links">
        <Link to="/">Home</Link>
        <Link to="/web-development">Learn</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/certificate">Certificate</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  )
}

export default Navbar
