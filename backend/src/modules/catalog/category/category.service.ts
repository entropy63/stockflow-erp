import * as repo from "./category.repository"
import { ConflictError, NotFoundError } from "../../../domain/errors"
import type { CreateCategoryInput,UpdateCategoryInput } from "./category.schema"

export  function listCategories(){
    return repo.findAll();
}

export async function getCategory(id: string){
    const category = await repo.findById(id);
    if (!category){throw new NotFoundError("Category",id);}
    return category
}

export async function createCategory(input: CreateCategoryInput) {
    const existing =await repo.findByName(input.name);
    if (existing){throw(new ConflictError("A category with this name already exists"));}
    return repo.create(input)
}

export async function updateCategory(id:string,input: UpdateCategoryInput) {
    await getCategory(id);
    if (input.name){
        const clash= await repo.findByName(input.name);
        if (clash &&clash.id!==id){throw(new ConflictError("A category with this name already exists"))}
    }
    return repo.update(id,input)
}

export async function deactivateCategory(id:string) {
    await getCategory(id);
    return repo.deactivate(id)
}