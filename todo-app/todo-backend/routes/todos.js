const express = require('express')
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router()

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  let addedTodos = await redis.getAsync('added_todos')
  addedTodos = addedTodos ? parseInt(addedTodos) : 0
  addedTodos += 1

  await redis.setAsync('added_todos', addedTodos.toString())

  res.send(todo)
})

router.get('/statistics', async (_, res) => {
  const addedTodos = await redis.getAsync('added_todos')

  res.send({
    added_todos: addedTodos ? parseInt(addedTodos) : 0,
  })
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body

  if (text !== undefined) req.todo.text = text
  if (done !== undefined) req.todo.done = done

  const updatedTodo = await req.todo.save()
  res.send(updatedTodo)
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
