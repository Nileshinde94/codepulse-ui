import { Component ,inject,effect} from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-categories-list',
  imports: [RouterLink],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.css',
})

export class CategoriesList {

  private categoryservice = inject(CategoryService);
  private categoriesResource = this.categoryservice.getallCategories();

  isLoading = this.categoriesResource.isLoading;
  isError = this.categoriesResource.error;
  values = this.categoriesResource.value;
}
