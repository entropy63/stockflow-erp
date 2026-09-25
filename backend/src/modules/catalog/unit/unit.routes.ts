import { Router } from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../../../middleware/auth';
import { validateBody } from '../../../middleware/validate';
import { createUnitSchema, updateUnitSchema } from './unit.schema';
import * as controller from './unit.controller';

export const unitRouter = Router();

unitRouter.use(authenticate);

unitRouter.get("/", controller.listUnits);
unitRouter.get("/:id", controller.getUnit);

unitRouter.post("/",authorize(Role.ADMIN,Role.MANAGER),validateBody(createUnitSchema),controller.createUnit)

unitRouter.patch("/:id",authorize(Role.ADMIN,Role.MANAGER),validateBody(updateUnitSchema),controller.updateUnit)

unitRouter.delete("/:id",authorize(Role.ADMIN,Role.MANAGER), controller.deactivateUnit);