import { Router } from 'express';
import { CategoryController } from './category.controller';

const CategoryRoutes = Router();

CategoryRoutes.post('/create-category', CategoryController.createCategory);

CategoryRoutes.get('/', CategoryController.getAllCategories);

export default CategoryRoutes;
