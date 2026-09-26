import {z}  from "zod";

export const createProductSchema = z.object({
    sku     :   z.string()  .min(1,"SKU is required").max(50),
    barcode :   z.string()  .min(1).max(50).optional(),
    name    :   z.string()  .min(1,"Name is required").max(200),
    description: z.string().max(1000).optional(),
    costPrice: z.number().nonnegative("Cost price cannot be negative").optional(),
    salePrice: z.number().nonnegative("Sale price cannot be negative").optional(),
    categoryId: z.uuid().optional(),
    unitId: z.uuid("A valid unit is required"),
    isActive:   z.boolean() .optional(),
});

export const updateProductSchema= createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
