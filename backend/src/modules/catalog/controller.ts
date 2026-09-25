import * as service from "./service"
import type { Request,Response } from "express"
import type { CreateCategoryInput,UpdateCategoryInput } from "./schema"

export async function listCategories(_req:Request,res:Response){
    res.json(await service.listCategories());
}

export async function getCategory(req:Request,res:Response){
    res.json(await service.getCategory(req.params.id));
}

export async function createCategory(req:Request,res:Response){
    const input = req.body as  CreateCategoryInput;
    res.status(201).json(await service.createCategory(input));
}

export async function updateCategory(req:Request,res:Response){
    const input = req.body as  UpdateCategoryInput;
    res.json(await service.updateCategory(req.params.id,input));
}

export async function deactivateCategory(req:Request,res:Response){
    res.json(await service.deactivateCategory(req.params.id));
}