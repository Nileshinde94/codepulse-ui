import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogpostService } from '../service/blogpost-service';
import { AddBlogPostRequest } from '../Models/blogpost.models';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [ReactiveFormsModule,MarkdownComponent],
  templateUrl: './add-blogpost.html',
})
export class AddBlogpost {

  private blogpostService = inject(BlogpostService);
  private router = inject(Router);

  addBlogPostForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    shortDescription: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    content: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    featuredImageUrl: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    urlHandle: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    publishedDate: new FormControl(
      new Date().toISOString().split('T')[0],
      { nonNullable: true, validators: [Validators.required] }
    ),
    author: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    isVisible: new FormControl(true, { nonNullable: true }),
  });

  onSubmit(): void {
    const formValue = this.addBlogPostForm.getRawValue();

    const blogPostData: AddBlogPostRequest = {
      title: formValue.title,
      shortDescription: formValue.shortDescription,
      content: formValue.content,
      featuredImageUrl: formValue.featuredImageUrl,
      urlHandle: formValue.urlHandle,
      author: formValue.author,
      publishedDate: new Date(formValue.publishedDate),
      isVisible: formValue.isVisible,
    };

    this.blogpostService.createBlogPost(blogPostData).subscribe({
      next: () => {
        this.addBlogPostForm.reset();
        this.router.navigate(['/admin/blogposts']);
      },
      error: (err) => console.error(err),
    });

    // create edit method and navigate to edit page after creating the blog post
    
  }
}
