import Boom from '@hapi/boom'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const getUser = async (user: any) => {
    const users = await prisma.user.findMany()
    return users
}

export const createUser = async (user: any) => {
    const { name, email, address } = user
    return await prisma.user.create({
        data: {
            id: Math.ceil(Math.random() * 100),
            name,
            email,
            address,
        },
    })
}

export const deleteUser = async (user: any) => {
    const { id } = user
    try {
        return await prisma.user.delete({
            where: {
                id: Number(id),
            },
        })
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw Boom.notFound('user not found')
        } else {
            throw error
        }
    }
}
