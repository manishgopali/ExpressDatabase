import { config } from 'dotenv'
import cors from 'cors'

import express, { Request, Response } from 'express'
import crypto from 'crypto'

config()

interface Todo {
    id: string
    name: string
    active: boolean
}

interface TodoRequestBody {
    name: string
    active: boolean
}

let todos: Todo[] = [
    { id: crypto.randomUUID(), name: 'just a thing', active: true },
]
const aVAr = express()

aVAr.use(express.json())
aVAr.use(express.urlencoded({ extended: true }))
aVAr.use(cors())

aVAr.get('/todos', (req: Request, res: Response) => {
    if (req.query.active) {
        res.send(todos.filter((todo) => todo.active))
    }
    res.send(todos)
})

aVAr.delete('/todos/:id', (req: Request, res: Response) => {
    todos = todos.filter((todo) => todo.id !== req.params.id)
    res.sendStatus(200)
})

aVAr.patch('/todos/:id', (req: Request, res: Response) => {
    const { name } = req.body as TodoRequestBody
    const updatedTodos = todos.map((todo) =>
        todo.id === req.params.id ? { ...todo, name } : todo
    )
    todos = updatedTodos
    res.sendStatus(200)
})

aVAr.post('/todos', (req: Request, res: Response) => {
    const { name, active } = req.body as TodoRequestBody
    const newTodo: Todo = { id: crypto.randomUUID(), name, active }
    todos.push(newTodo)
    res.sendStatus(201)
})

const PORT = process.env.PORT || 3001

aVAr.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})
