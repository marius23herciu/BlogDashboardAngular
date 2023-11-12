import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {

  posts: Post[] = [] 
  categories: string[] = []
  category = ''
  searchString = ''
  radioOption = ''

  page: number=1
  count: number=0
  tableSize: number=5
  tableSizes: any = [5,10,15,20]

  constructor (private postsService: PostsService, private route: ActivatedRoute, private categoriesService: CategoriesService) {}

  ngOnInit(){
    this.loadAllPosts()
    this.loadCategories()
  }


  loadAllPosts(){
    this.postsService.loadPosts().subscribe({
      next: (response) => {
        this.posts = response
        console.log(response)
  }})
  }

  loadPostsByCategory(category: string){
    this.postsService.loadPostsByCategory(category).subscribe({
      next: (response) => {
        this.posts = response
        console.log(response)
  }})
  }

  loadPostsBySearching(search: string){
    this.postsService.loadPostsBySearching(search).subscribe({
      next: (response) => {
        this.posts = response
        console.log(response)
  }})
  }

  loadPosts(){
    if(this.category == '' || this.category == 'All categories' && this.radioOption == ''){
      this.loadAllPosts()
    }
    else if (this.radioOption == 'filter'){
      if(this.category == 'All categories'){
        this.loadAllPosts()
      }
      else{
        this.loadPostsByCategory(this.category)
      }
    }
    else if (this.radioOption == 'search'){
      this.loadPostsBySearching(this.searchString)
    }
  }

  onDelete(id:string){
    if(confirm("Are you sure you want to delete this post?")) {
      this.postsService.deletePost(id).subscribe({
        next: (response) => {
          if(response){
            this.loadAllPosts()
            alert("Post Deleted!")
            
          }
          else{
            alert("Something went wrong! Try again later.")
          }
       }})}
}
  onFeatured(id:string, featuredStatus: string){

    if ( featuredStatus == 'true'){
      this.postsService.markFeatured(id).subscribe({
        next: (response) => {
          if ( response ){
            alert('This Post Was Changed to Featured Featured!')
            this.loadAllPosts()
          }
          else{
            alert('You allready have 4 featured posts. Unmark other featured post before marking this one.')
          }
        }
      })
    }
    else{
      this.postsService.unmarkFeatured(id).subscribe({
        next: (response) => {
          if ( response ){
            alert('This Post Was Removed FromFeatured!')
            this.loadAllPosts()
          }
          else{
            alert('Something went wrong. Try again later.')
          }
        }
      })
    }
   
  }

  loadCategories(){
    this.categoriesService.loadCategories().subscribe({
      next: (response) => {
        this.categories = response
        this.categories.push('All categories')
        console.log(response)
  }})
  }

  onTableDataChange(event: any, category: string)
  {
    this.page = event;
   
  }

  onTableSizeChange(event: any, category: string):void
  {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
