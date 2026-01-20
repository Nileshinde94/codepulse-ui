
import { Routes } from '@angular/router';
import { CategoriesList } from './features/category/categories-list/categories-list';
import { AddCategory } from './features/category/add-category/add-category';

export const routes: Routes = [
    {
        path:'admin/categories',
        component:CategoriesList
    },
    {
        path:'admin/categories/add',
        component:AddCategory
    }
];
