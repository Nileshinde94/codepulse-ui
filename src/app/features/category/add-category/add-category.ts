
import { Component,effect,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.models';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router=inject(Router)
  constructor() {
    effect(()=>{
      if(this.categoryService.addCategoriesStatus() === 'success'){
        this.categoryService.addCategoriesStatus.set('idle');
       this.router.navigate(['/admin','categories']);
      }
      if(this.categoryService.addCategoriesStatus() === 'error'){
        alert('Error occurred while adding category. Please try again.');
      }
    });
  }
private categoryService=inject(CategoryService);

  addCategoryFormGroup=new FormGroup({
    name:new FormControl<string>('',{nonNullable:true,
      validators:[Validators.required,
      Validators.minLength(3),Validators.maxLength(50)]
    }),
    urlHandle:new FormControl<string>('',{nonNullable:true,
validators:[Validators.required,
Validators.minLength(3),Validators.maxLength(100)]
    }),
  });

  get nameFrom(){
    return this.addCategoryFormGroup.controls.name;
  }
  get urlHandleFrom(){
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  onSubmit(){
    const categoryFormValue=this.addCategoryFormGroup.getRawValue();
    const addcategoryRequestDTo:AddCategoryRequest={
      name:categoryFormValue.name,
      urlHandle:categoryFormValue.urlHandle
    };
    this.categoryService.addCategory(addcategoryRequestDTo);

    
    this.addCategoryFormGroup.reset();
  }

}
