import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable ,signal} from '@angular/core';
import { AddCategoryRequest, Category } from '../models/category.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http=inject(HttpClient);


addCategoriesStatus=signal<'idle' | 'loading' | 'error' | 'success'>('idle');
private baseUrl=environment.apiBaseUrl;
  addCategory(categoryData:AddCategoryRequest) {
    this.addCategoriesStatus.set('loading');
     this.http.post<void>(`${this.baseUrl}/api/Categories`, categoryData).subscribe({
      next:()=> {
        this.addCategoriesStatus.set('success');
      },
      error:(error)=>{
        this.addCategoriesStatus.set('error');
      }
     });

  }

  getallCategories() {
     
    return httpResource<Category[]>(()=> `${this.baseUrl}/api/Categories`);
  }
}


