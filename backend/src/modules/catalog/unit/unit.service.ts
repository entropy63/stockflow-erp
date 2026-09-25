import * as repo from "./unit.repository"
import { ConflictError, NotFoundError } from "../../../domain/errors"
import type { CreateUnitInput,UpdateUnitInput } from "./unit.schema"

export  function listUnits(){
    return repo.findAll();
}

export async function getUnit(id: string){
    const unit = await repo.findById(id);
    if (!unit){throw new NotFoundError("Unit",id);}
    return unit
}

async function assertUnique(name:string,abbreviation:string, exceptId?:string) {
    const nameClash =await repo.findByName(name);
    if (nameClash&&nameClash.id!==exceptId){throw(new ConflictError("A unit with this name already exists"));}
    const abbrClash =await repo.findByAbbreviation(abbreviation);
    if (abbrClash&&abbrClash.id!==exceptId){throw(new ConflictError("A unit with this abbreviation already exists"));}
}

export async function createUnit(input: CreateUnitInput) {
    await assertUnique(input.name, input.abbreviation);
    return repo.create(input);
}

export async function updateUnit(id:string,input: UpdateUnitInput) {
    const existing = await getUnit(id);
    await assertUnique(input.name??existing.name,input.abbreviation??existing.abbreviation,id)
    return repo.update(id,input)
}

export async function deactivateUnit(id:string) {
    await getUnit(id);
    return repo.deactivate(id)
}