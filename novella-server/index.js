import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dues from './src/test_due_data.js'
import { student_data  } from './src/test_student_data.js'

// App
const app = express()

const issued_books = []
const books = []
const students = student_data
const due_books = dues

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

// Get routes

app.get('/get_books', (req, res) => {
  return res.send(books)
})

app.get('/get_users', (req, res) => {
  return res.send(students)
})

app.get('/due_books', (req, res) => {
  return res.send(due_books)
})

app.post('/issue_book', (req, res) => {
  const issue = {
    index: req.body.index,
    student_name: req.body.student_name,
    grade: req.body.grade,
    book_name: req.body.book_name,
    author: req.body.author
  }
  issued_books.push(issue)
  return res.send(issue)
})

app.post('/add_student', (req, res) => {
  return res.send('Add Student')
})

app.post('/add_book', (req, res) => {
  return res.send('Add Book')
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT} !`)
})