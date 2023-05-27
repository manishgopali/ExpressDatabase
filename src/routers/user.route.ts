import { Router } from 'express'

const router = Router()

router.use('/', (req, res, next) => {
    console.log('User endpoint user')
    res.send({ id: 'just a testing router' })
})

export default router
