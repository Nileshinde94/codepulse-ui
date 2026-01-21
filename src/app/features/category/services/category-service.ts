import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, UpdateCategoryRequest } from '../models/category.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);


  addCategoriesStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  updateCategoriesStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');
  private baseUrl = environment.apiBaseUrl;
  addCategory(categoryData: AddCategoryRequest) {
    this.addCategoriesStatus.set('loading');
    this.http.post<void>(`${this.baseUrl}/api/Categories`, categoryData).subscribe({
      next: () => {
        this.addCategoriesStatus.set('success');
      },
      error: (error) => {
        this.addCategoriesStatus.set('error');
      }
    });

  }

  getallCategories() {

    return httpResource<Category[]>(() => `${this.baseUrl}/api/Categories`);
  }

  getCategoryById(id: InputSignal<string | undefined>) {
    return httpResource<Category>(() => `${this.baseUrl}/api/Categories/${id()}`);

  }

  updateCategory(id: string, categoryData: UpdateCategoryRequest) {
    this.updateCategoriesStatus.set('loading');
    return this.http.put<void>(`${this.baseUrl}/api/Categories/${id}`, categoryData).subscribe({
      next: () => {
        this.updateCategoriesStatus.set('success');
      },
      error: (error) => {
        this.updateCategoriesStatus.set('error');
      }
    });
  }
}


