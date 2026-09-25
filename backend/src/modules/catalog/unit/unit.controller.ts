import * as service from "./unit.service"
import type { Request,Response } from "express"
import type { CreateUnitInput,UpdateUnitInput } from "./unit.schema"

export async function listUnits(_req:Request,res:Response){
    res.json(await service.listUnits());
}

export async function getUnit(req:Request<{id:string}>,res:Response){
    res.json(await service.getUnit(req.params.id));
}

export async function createUnit(req:Request,res:Response){
    const input = req.body as  CreateUnitInput;
    res.status(201).json(await service.createUnit(input));
}

export async function updateUnit(req:Request<{id:string}>,res:Response){
    const input = req.body as  UpdateUnitInput;
    res.json(await service.updateUnit(req.params.id,input));
}

export async function deactivateUnit(req:Request<{id:string}>,res:Response){
    res.json(await service.deactivateUnit(req.params.id));
}