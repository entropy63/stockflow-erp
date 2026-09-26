import * as service from "./product.service"
import type { Request,Response } from "express"
import type { CreateProductInput,UpdateProductInput } from "./product.schema"

export async function listProducts(req:Request,res:Response){
    const {categoryId,unitId,isActive} =  req.query;
    res.json(await service.listProducts({
        categoryId: typeof categoryId ==="string"?categoryId:undefined,
        unitId: typeof unitId ==="string"?unitId:undefined,
        isActive: isActive ==="true"? true : isActive === "false"?false:undefined,}
    ));
}

export async function getProduct(req:Request<{id:string}>,res:Response){
    res.json(await service.getProduct(req.params.id));
}

export async function createProduct(req:Request,res:Response){
    const input = req.body as  CreateProductInput;
    res.status(201).json(await service.createProduct(input));
}

export async function updateProduct(req:Request<{id:string}>,res:Response){
    const input = req.body as  UpdateProductInput;
    res.json(await service.updateProduct(req.params.id,input));
}

export async function deactivateProduct(req:Request<{id:string}>,res:Response){
    res.json(await service.deactivateProduct(req.params.id));
}