
import { Routes } from '@angular/router';
import { CategoriesList } from './features/category/categories-list/categories-list';
import { AddCategory } from './features/category/add-category/add-category';
import { EditCategory } from './features/category/edit-category/edit-category';
import { BlogPostList } from './features/blog-post/blog-post-list/blog-post-list';
import { AddBlogpost } from './features/blog-post/add-blogpost/add-blogpost';

export const routes: Routes = [
    {
        path:'admin/categories',
        component:CategoriesList
    },
    {
        path:'admin/categories/add',
        component:AddCategory
    },
    {
        path:'admin/categories/edit/:id',
        component:EditCategory
    },
    {
        path:'admin/blogposts',
        component:BlogPostList
    },
    {
        path:'admin/blogposts/create',
        component:AddBlogpost
    }

];
