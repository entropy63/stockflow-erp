import {prisma} from '../../../db'

export function findAll(){
    return prisma.unit.findMany({orderBy: {name:"asc"}});
}

export function findById(id: string){
    return prisma.unit.findUnique({where: {id}});
}

export function findByName(name: string){
    return prisma.unit.findUnique({where: {name}});
}

export function findByAbbreviation(abbreviation: string){
    return prisma.unit.findUnique({where: {abbreviation}});
}

export function create(data:{name:string,abbreviation:string, isActive?:boolean}){
    return prisma.unit.create({data});
}


export function update(id:string,data:{name?:string, isActive?:boolean, abbreviation?:string}){
    return prisma.unit.update({where: {id},data});
}

export function deactivate(id:string){
    return prisma.unit.update({where: {id},data:{isActive:false}});
}