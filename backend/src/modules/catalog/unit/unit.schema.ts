import {z}  from "zod";

export const createUnitSchema = z.object({
    name:z.string().min(1,"Name is required").max(50),
    abbreviation:z.string().min(1,"Abbreviation is required").max(10),
    isActive:z.boolean().optional(),
});

export const updateUnitSchema= createUnitSchema.partial();

export type CreateUnitInput = z.infer<typeof createUnitSchema>
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>
