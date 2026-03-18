import { Injectable, inject } from '@angular/core';
import { HttpClient, httpResource, HttpResourceFn, HttpResourceRef } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddBlogPostRequest, BlogPost } from '../Models/blogpost.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {

  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  createBlogPost(data: AddBlogPostRequest): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/BlogPosts`, data);
  }

  getAllBlogPosts(): HttpResourceRef<BlogPost[] | undefined> {
    return httpResource<BlogPost[]>(()=>`${this.apiBaseUrl}/api/BlogPosts`);
  }
}
