import {prisma} from '../../db'

export function findAll(){
    return prisma.category.findMany({orderBy: {name:"asc"}});
}

export function findById(id: string){
    return prisma.category.findUnique({where: {id}});
}

export function findByName(name: string){
    return prisma.category.findUnique({where: {name}});
}

export function create(data:{name:string, isActive?:boolean}){
    return prisma.category.create({data});
}


export function update(id:string,data:{name?:string, isActive?:boolean}){
    return prisma.category.update({where: {id},data});
}

export function deactivate(id:string){
    return prisma.category.update({where: {id},data:{isActive:false}});
}