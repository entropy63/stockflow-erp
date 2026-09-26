import {prisma} from '../../../db'

const withRelations = {category:true,unit: true} as const;

export function findAll(where:{categoryId?:string,unitId?:string, isActive?:boolean}){
    return prisma.product.findMany({
        where,
        orderBy: {name:"asc"},
        include: withRelations,
    });
}

export function findById(id: string){
    return prisma.product.findUnique({where: {id},include:withRelations});
}

export function findBySku(sku: string){
    return prisma.product.findUnique({where: {sku}});
}

export function findByBarcode(barcode: string){
    return prisma.product.findUnique({where: {barcode}});
}

export function create(data:{
    sku:string,
    barcode?:string,
    name:string, 
    description?:string,
    costPrice?:number,
    salePrice?:number,
    categoryId?:string,
    unitId:string,
    isActive?:boolean}){
    return prisma.product.create({data,include:withRelations});
}


export function update(id:string,
    data:{
    sku?:string,
    barcode?:string,
    name?:string, 
    description?:string,
    costPrice?:number,
    salePrice?:number,
    categoryId?:string,
    unitId?:string,
    isActive?:boolean}){
    return prisma.product.update({where: {id},data,include:withRelations});
}

export function deactivate(id:string){
    return prisma.product.update({where: {id},data:{isActive:false},include:withRelations});
}