import { SubscribersService } from './../services/subscribers.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from '../models/subscriber';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subscribers: Subscriber[] = []

constructor(private subscribersService: SubscribersService){}

  ngOnInit(): void {
    this.loadAllSubscribers()
  }

  loadAllSubscribers(){
    this.subscribersService.loadSubscribers().subscribe({
      next: (response) => {
        this.subscribers = response
        console.log(response)
  }})
  }
  
  onDelete(subId: string){
    if(confirm("Are you sure you want to delete this subscriber?")) {
      this.subscribersService.deleteSubscriber(subId).subscribe({
        next: (response) => {
          console.log(response)
          if(response){
            this.loadAllSubscribers()
            alert("Subscriber Deleted!")
            
          }
          else{
            alert("Something went wrong! Try again later.")
          }
       }})}
   
  }
}
