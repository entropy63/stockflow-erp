import {prisma} from '../../db';
import type {Role,User} from '@prisma/client';

export function findUserByEmail(email: string): Promise<User | null>{
    return prisma.user.findUnique({where: {email}});
}

export function findUserById(id: string): Promise<User | null>{
    return  prisma.user.findUnique({where: {id}});
}

export function createUser(data:{
    email: string;
    passwordHash: string;
    name: string;
    role: Role;
}){
    return prisma.user.create({data});
}