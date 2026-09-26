import * as repo from "./product.repository"
import { findById as findCategoryById } from "../category/category.repository"
import { findById as findUnitById } from "../unit/unit.repository"
import { ConflictError, NotFoundError, ValidationError } from "../../../domain/errors"
import type { CreateProductInput, UpdateProductInput } from "./product.schema"

export  function listProducts(filters:{categoryId?:string, unitId?:string, isActive?:boolean}){
    return repo.findAll(filters);
}

export async function getProduct(id: string){
    const product = await repo.findById(id);
    if (!product){throw new NotFoundError("Product",id);}
    return product
}

async function assertRelations(categoryId:string | null | undefined, unitId:string | null | undefined) {
    if (unitId){
        const unit =await findUnitById(unitId);
        if(!unit){throw new ValidationError("The specified unit does not exist");}
    }
    if (categoryId){
        const category =await findCategoryById(categoryId);
        if(!category){throw new ValidationError("The specified category does not exist");}
    }
}

async function assertUnique(sku:string,barcode?:string, exceptId?:string) {
    const skuClash =await repo.findBySku(sku);
    if (skuClash&&skuClash.id!==exceptId){throw(new ConflictError("A product with this SKU already exists"));}
    if(barcode){    
        const barcodeClash =await repo.findByBarcode(barcode);
        if (barcodeClash&&barcodeClash.id!==exceptId){throw(new ConflictError("A product with this barcode already exists"));}
        }
}

export async function createProduct(input: CreateProductInput) {
    await assertRelations(input.categoryId,input.unitId)
    await assertUnique(input.sku,input.barcode)
    return repo.create(input)
}

export async function updateProduct(id:string,input: UpdateProductInput) {
    const existing = await getProduct(id);
    await assertRelations(input.categoryId?? existing.categoryId,input.unitId?? existing.unitId)
    await assertUnique(input.sku?? existing.sku,input.barcode?? existing.barcode?? undefined,id)
    return repo.update(id,input)
}

export async function deactivateProduct(id:string) {
    await getProduct(id);
    return repo.deactivate(id)
}