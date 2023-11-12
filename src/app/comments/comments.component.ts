import { Component, OnInit } from '@angular/core';
import { UserComment } from '../models/user-comment';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{
  usersComments: UserComment[] = []

constructor(private commentsService: CommentsService){}

  ngOnInit(): void {
    this.loadUnapprovedComments()
  }

  loadUnapprovedComments(){
    this.commentsService.loadUnapprovedComments().subscribe({
      next: (response) => {
        this.usersComments = response
        console.log(response)
  }})
  }

  onDelete(commId: string){
    if(confirm("Are you sure you want to delete this comment?")) {
      this.commentsService.deleteComment(commId).subscribe({
        next: (response) => {
          console.log(response)
          if(response){
            this.loadUnapprovedComments()
            alert("Comment Deleted!")
            
          }
          else{
            alert("Something went wrong! Try again later.")
          }
       }})}
  }

  onApprove(commId: string){
    if(confirm("Are you sure you want to approve this comment?")) {
      this.commentsService.approveComment(commId).subscribe({
        next: (response) => {
          console.log(response)
          if(response){
            this.loadUnapprovedComments()
            alert("Comment Approved!")
            
          }
          else{
            alert("Something went wrong! Try again later.")
          }
       }})}
  }
}
