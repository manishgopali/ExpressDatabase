import { Router } from 'express'

import { getUser, deleteUser } from '../controllers/user.controller'
import { createPostDto } from '../validators/user.validator'
import * as postController from '../controllers/user.controller'
import { validate } from '../utils/validate'
const router = Router()

router.get('/', getUser)

router.post('/', validate(createPostDto), postController.createUser)

router.delete('/:id', deleteUser)

router.post('/signup')

// router.post('/', (req, res, next) => {

// })

export default router
