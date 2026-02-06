import { Component, input, inject, effect } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/category.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {

  constructor() {
    effect(() => {
      if (this.categoryservice.updateCategoriesStatus() === 'success') {
        this.categoryservice.updateCategoriesStatus.set('idle');
        this.route.navigate(['/admin', 'categories']);
        alert('Category updated successfully.');
      }
      if (this.categoryservice.updateCategoriesStatus() === 'error') {
        this.categoryservice.updateCategoriesStatus.set('idle');
        alert('Error occurred while updating category. Please try again.');
      }
    });
  }

  id = input<string>();
  private categoryservice = inject(CategoryService);
  private route = inject(Router);

  categorydataById = this.categoryservice.getCategoryById(this.id);
  categoryResponse = this.categorydataById.value;

  editCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,
      Validators.minLength(3), Validators.maxLength(50)]
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,
      Validators.minLength(3), Validators.maxLength(100)]
    }),
  });

  get nameFrom() {
    return this.editCategoryFormGroup.controls.name;
  }
  get urlHandleFrom() {
    return this.editCategoryFormGroup.controls.urlHandle;
  }

  effectre = effect(() => {
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name ?? '')
    this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle ?? '')
  });

  onSubmit() {
    const id = this.id();
    if (this.editCategoryFormGroup.invalid || !id) {
      return;
    }
    const categoryFormValue = this.editCategoryFormGroup.getRawValue();
    const updateCategoryRequestDto: UpdateCategoryRequest = {
      name: categoryFormValue.name,
      urlHandle: categoryFormValue.urlHandle
    };
    this.categoryservice.updateCategory(id, updateCategoryRequestDto);
  }

  onDeleteCategory() {
    const id = this.id();
    if (id) {
      this.categoryservice.deleteCategory(id).subscribe({
        next: () => {
          this.route.navigate(['/admin', 'categories']);
          alert('Category deleted successfully.');
          
        },
        error: (error) => {
          alert('Error occurred while deleting category. Please try again.');
        }
      });
    }
  }

}
