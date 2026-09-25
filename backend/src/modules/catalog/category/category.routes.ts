import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../../../middleware/auth';
import { validateBody } from '../../../middleware/validate';
import { createCategorySchema, updateCategorySchema } from './category.schema';
import * as controller from './category.controller';

export const categoryRouter = Router();

categoryRouter.use(authenticate);

categoryRouter.get("/", controller.listCategories);
categoryRouter.get("/:id", controller.getCategory);

categoryRouter.post("/",authorize(Role.ADMIN,Role.MANAGER),validateBody(createCategorySchema),controller.createCategory)

categoryRouter.patch("/:id",authorize(Role.ADMIN,Role.MANAGER),validateBody(updateCategorySchema),controller.updateCategory)

categoryRouter.delete("/:id",authorize(Role.ADMIN,Role.MANAGER), controller.deactivateCategory);