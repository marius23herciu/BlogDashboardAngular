import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

faCoffee = faCoffee;
permalink: string = ''
imgSrc: any = '/assets/img/img-placeholder.jpg'
selectedImg: any
categories: string[] = [] 
postForm = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(10)]],
  permalink: ['', Validators.required],
  excerpt: ['',[Validators.required, Validators.minLength(50)]],
  category: ['', Validators.required],
  postImg: ['', Validators.required],
  content: ['', Validators.required]
})
queryPost: Post = {
    id: '',
    title: '',
    permalink: '',
    category: '',
    postImgPath: '',
    excerpt: '',
    content: '',
    isFeatured: false,
    views: 0,
    status: 0,
    createdAt: new Date() 
}
formStatus: string ='Add New'
imageLoaded = false

queryId = ''

loading = false;
loaded = true;

constructor (private route: ActivatedRoute, private categoriesService: CategoriesService, private fb: FormBuilder,
  private postsService: PostsService, private http: HttpClient, private router: Router) {
  this.route.queryParams.subscribe(val=> {
    console.log(val)
    this.queryId=val['id']
    
    if (this.queryId!=undefined){
      this.loadPostFromParam(this.queryId); 

      setTimeout(async ()=>{ 
         this.imgSrc = '/assets/'.concat(this.queryPost.postImgPath)
        await this.createFile(this.imgSrc, 'iAmAFile.png', 'image/png')
        .then((file) => {
             const reader = new FileReader();
             reader.onload = (e) => {
             this.imgSrc = e.target?.result
            }
            reader.readAsDataURL(file);

            this.selectedImg = file 
            console.log(file);
            this.imageLoaded = true
            console.log(this.imageLoaded);
         });
        this.postForm = this.fb.group({
          title: [this.queryPost.title, [Validators.required, Validators.minLength(10)]],
          permalink: [this.queryPost.permalink, Validators.required],
          excerpt: [this.queryPost.excerpt,[Validators.required, Validators.minLength(50)]],
          category: [this.queryPost.category, Validators.required],
          content: [this.queryPost.content, Validators.required],
          postImg: ['', Validators.required],
        })

    }, 500);
     
    }
   else{
    
      this.formStatus='Add New'
      console.log(this.queryId)
    }
  })
}

ngOnInit(): void{
  this.loadCategories();
}



async createFile(path: string, name: string, type: string): Promise<File> {
  let response = await fetch(path);
  let data = await response.blob();
  let metadata = {
      type: type
  };
  return new File([data], name, metadata);
}

onSubmit(){
  this.loading = true
  if(this.formStatus =='Add New' ){
    debugger
    const formData: FormData = new FormData();
    
    formData.append('Title', this.postForm.value.title!);
    formData.append('Permalink', this.postForm.value.permalink!);
    formData.append('CategoryName', this.postForm.value.category!);
    formData.append('Image', this.selectedImg);
    formData.append('Excerpt', this.postForm.value.excerpt!);
    formData.append('Content', this.postForm.value.content!);
  
    if(this.formStatus == 'Add New'){
      return this.http.post('https://localhost:7246/api/posts', formData,
      {
        headers : new HttpHeaders()})
      .subscribe({
        next: (response) => {
          if(response){
            alert("New Post Created!")
            this.postForm.reset();
            this.imgSrc = '/assets/img/img-placeholder.jpg'
            this.loading = false
            this.router.navigate(["/posts"])
          }
          else{
            alert("Something went wrong! Try again later.")
            this.loading = false
          }
       }})
    }
    else{
      return this.http.put('https://localhost:7246/api/posts/edit', formData,
      {
        headers : new HttpHeaders()})
      .subscribe({
        next: (response) => {
          if(response){
            alert("Post Edited Successfully!")
            this.postForm.reset();
            this.imgSrc = '/assets/img/img-placeholder.jpg'
            this.loading = false
            this.router.navigate(["/posts"])
          }
          else{
            alert("Something went wrong! Try again later.")
            this.loading = false
          }
       }})
    }
  }
  else{
    debugger
  const formData: FormData = new FormData();
  formData.append('Id', this.queryPost.id!);
  formData.append('Title', this.postForm.value.title!);
  formData.append('Permalink', this.postForm.value.permalink!);
  formData.append('CategoryName', this.postForm.value.category!);
  formData.append('Image', this.selectedImg);
  formData.append('Excerpt', this.postForm.value.excerpt!);
  formData.append('Content', this.postForm.value.content!);

  if(this.formStatus == 'Add New'){
    return this.http.post('https://localhost:7246/api/posts', formData,
    {
      headers : new HttpHeaders()})
    .subscribe({
      next: (response) => {
        if(response){
          alert("New Post Created!")
          this.postForm.reset();
          this.imgSrc = '/assets/img/img-placeholder.jpg'
          this.loading = false
          this.router.navigate(["/posts"])
        }
        else{
          alert("Something went wrong! Try again later.")
          this.loading = false
        }
     }})
  }
  else{
    return this.http.put('https://localhost:7246/api/posts', formData,
    {
      headers : new HttpHeaders()})
    .subscribe({
      next: (response) => {
        if(response){
          alert("Post Edited Successfully!")
          this.postForm.reset();
          this.imgSrc = '/assets/img/img-placeholder.jpg'
          this.loading = false
          this.router.navigate(["/posts"])
        }
        else{
          alert("Something went wrong! Try again later.")
          this.loading = false
        }
     }})
  }
  }
}

onTitleChange(event: &Event){
  const title = (event.target as HTMLInputElement).value;
  let permalink = title.replace(/\s/g, '-')

  this.permalink = permalink
  console.log(permalink)
}

showPreview(event: Event){
  console.log('preview event')
  console.log(event)


  const target= event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    this.imgSrc = e.target?.result
  }
  reader.readAsDataURL(file);

  this.selectedImg = file 
}

loadCategories(){
  this.categoriesService.loadCategories().subscribe({
    next: (response) => {
      this.categories = response
      console.log(response)
}})
}

  async loadPostFromParam(id: string){
  this.formStatus='Edit'
  await this.postsService.loadPostById(id, true).subscribe({
    next: (response) => {
      this.queryPost = response
      console.log(response)
}})
}
}
