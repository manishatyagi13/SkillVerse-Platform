import { useState } from 'react'
import { Link } from 'react-router-dom'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password) {
      setMessage('Please fill in all required fields.')
      return
    }

    if (!isLogin && !name.trim()) {
      setMessage('Please enter your name.')
      return
    }

    setMessage(
      isLogin
        ? 'Login form validated! Real authentication needs a backend.'
        : 'Sign-up form validated! Real account creation needs a backend.'
    )
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-brand">
          <span className="auth-brand-icon">S</span>
          SkillVerse
        </Link>

        <h1>{isLogin ? 'Welcome back!' : 'Create your account'}</h1>
        <p className="auth-subtitle">
          {isLogin
            ? 'Continue your learning journey.'
            : 'Start learning something amazing today.'}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? 'auth-tab active' : 'auth-tab'}
            onClick={() => {
              setIsLogin(true)
              setMessage('')
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={!isLogin ? 'auth-tab active' : 'auth-tab'}
            onClick={() => {
              setIsLogin(false)
              setMessage('')
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <label className="auth-field">
              Full name
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          )}

          <label className="auth-field">
            Email address
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="auth-field">
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
            />
          </label>

          <button className="auth-submit" type="submit">
            {isLogin ? 'Login to SkillVerse' : 'Create Account'}
          </button>
        </form>

        {message && <p className="auth-message" role="status">{message}</p>}

        <p className="auth-footer">
          {isLogin ? "New to SkillVerse? " : 'Already have an account? '}
          <button
            type="button"
            className="auth-switch"
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage('')
            }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </section>
    </main>
  )
}

export default Auth
