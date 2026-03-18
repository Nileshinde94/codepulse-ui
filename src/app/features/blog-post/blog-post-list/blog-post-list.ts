import { Component ,inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogpostService } from '../service/blogpost-service';

@Component({
  selector: 'app-blog-post-list',
  imports: [RouterLink],
  templateUrl: './blog-post-list.html',
  styleUrl: './blog-post-list.css',
})
export class BlogPostList {

blogpostService = inject(BlogpostService);
getAllBlogPosts = this.blogpostService.getAllBlogPosts();
isloading = this.getAllBlogPosts.isLoading;
error=this.getAllBlogPosts.error;
response=this.getAllBlogPosts.value;

}
