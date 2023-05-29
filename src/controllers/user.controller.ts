import { NextFunction, Request, Response } from 'express'
import * as userService from '../services/user.service'

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await userService.getUser(req.body)
        res.send(data)
    } catch (e) {
        next(e)
    }
}

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await userService.createUser(req.body)
        res.send('data inserted successfully')
    } catch (e) {
        next(e)
    }
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await userService.deleteUser(req.params)
        res.send('data deleted successfully')
    } catch (err) {
        next(err)
    }
}
