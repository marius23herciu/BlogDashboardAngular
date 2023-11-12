import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  categoryField: string = ""
  fieldsStatus: string = "Add"
  categories: string[] = [] 
  newCategSuccess = false
  newCategFail = false
  editCategSuccess = false
  editCategFail = false
  deletedCateg = false
  deletedCategFail = false
  categoryName = ''
  oldCategoryName = ''
  editedCategoryName = ''

  constructor (private route: ActivatedRoute, private categoriesService: CategoriesService) {}
  
  ngOnInit(): void{
    this.loadCategories();
  }

  onSubmit(){
     console.log(this.categoryField)

     if(this.fieldsStatus=="Add"){
     this.categoriesService.addCategory(this.categoryField).subscribe({
      next: (response) => {
        console.log(response)
        this.categoryName = this.categoryField
        console.log(this.categoryName)
        this.loadCategories()
        if(response){
          console.log('success')
          this.newCategSuccess = true
          this.newCategFail = false
          this.editCategSuccess = false
          this.editCategFail = false
          this.deletedCateg = false
          this.deletedCategFail = false
        }
        else{
          console.log('fail')
          this.newCategSuccess = false
          this.newCategFail = true
          this.editCategSuccess = false
          this.editCategFail = false
          this.deletedCateg = false
          this.deletedCategFail = false
        }
  },
  error: (err: HttpErrorResponse) => (JSON.parse(JSON.stringify(err)))})
     }

     else if(this.fieldsStatus=="Edit"){

      this.categoriesService.editCategory(this.oldCategoryName, this.categoryField).subscribe({
        next: (response) => {
          console.log(response)
          this.editedCategoryName = this.categoryField
          console.log(this.categoryName)
          this.loadCategories()
          if(response){
            console.log('success')
            this.newCategSuccess = false
            this.newCategFail = false
            this.editCategSuccess = true
            this.editCategFail = false
            this.deletedCateg = false
            this.deletedCategFail = false
            this.categoryField = ""
          }
          else{
            console.log('fail')
            this.newCategSuccess = false
            this.newCategFail = false
            this.editCategSuccess = false
            this.editCategFail = true
            this.deletedCateg = false
            this.deletedCategFail = false
            this.categoryField = ""
          }
    },
    error: (err: HttpErrorResponse) => (JSON.parse(JSON.stringify(err)))})

       this.fieldsStatus="Add"
     }
    
  }




  loadCategories(){
    this.categoriesService.loadCategories().subscribe({
      next: (response) => {
        this.categories = response
        console.log(response)
  }})
  }

  clickEditButton(category:string) {
    console.log(category)
    this.categoryField=category
    this.oldCategoryName = category
    this.fieldsStatus="Edit"
  }

  onDelete(category:string){
    if(confirm("Are you sure you want to delete " + category + "?")) {
      this.categoriesService.deleteCategory(category).subscribe({
        next: (response) => {
          this.categoryName = category
            console.log(this.categoryName)
            this.loadCategories()
            if(response){
              console.log('success')
              this.newCategSuccess = false
              this.newCategFail = false
              this.editCategSuccess = false
              this.editCategFail = false
              this.deletedCateg = true
              this.deletedCategFail = false
            }
            else{
              console.log('fail')
              this.newCategSuccess = false
              this.newCategFail = false
              this.editCategSuccess = false
              this.editCategFail = false
              this.deletedCateg = false
              this.deletedCategFail = true
            }
    },
    error: (err: HttpErrorResponse) => (JSON.parse(JSON.stringify(err)))})
    }
  }
}
