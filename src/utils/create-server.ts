import { config } from 'dotenv'
import cors from 'cors'
import express, { Request, Response } from 'express'
import crypto from 'crypto'

config()

const aVAr = express()

aVAr.use(express.json())
aVAr.use(express.urlencoded({ extended: true }))
aVAr.use(cors())

interface Todo {
    id: string
    name: string
    active: boolean
}

// interface TodoRequestBody {
//     name: string
//     active: boolean
// }

const users: Todo[] = [
    { id: crypto.randomUUID(), name: 'just a thing', active: true },
]

aVAr.get('/users', (req: Request, res: Response) => {
    if (req.query.active) {
        res.send(users.filter((todo) => todo.active))
    }
    res.send(users)
})

export default aVAr
