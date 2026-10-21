const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SkillVerse backend is running!' })
})

async function startServer() {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`SkillVerse server running on port ${PORT}`)
  })
}

startServer()
