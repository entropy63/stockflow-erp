import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../../../middleware/auth';
import { validateBody } from '../../../middleware/validate';
import { createProductSchema, updateProductSchema } from './product.schema';
import * as controller from './product.controller';

export const productRouter = Router();

productRouter.use(authenticate);

productRouter.get("/", controller.listProducts);
productRouter.get("/:id", controller.getProduct);

productRouter.post("/",authorize(Role.ADMIN,Role.MANAGER),validateBody(createProductSchema),controller.createProduct)

productRouter.patch("/:id",authorize(Role.ADMIN,Role.MANAGER),validateBody(updateProductSchema),controller.updateProduct)

productRouter.delete("/:id",authorize(Role.ADMIN,Role.MANAGER), controller.deactivateProduct);