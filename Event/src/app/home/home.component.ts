import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  // Implemented - No Changes Required
  constructor(private HomeService: HomeService, private router: Router) { }

  events: any[] = [];
  errorMessage?: string | null;

  // Implemented - No Changes Required
  fetchEvents() {
    this.events= [];
    this.errorMessage = null;
    this.HomeService.getEvents().subscribe(
      response => this.events = response,
      error => this.errorMessage = error.error.message
    )
  }

  // Implemented - No Changes Required
  ngOnInit(): void {
    this.fetchEvents();
  }

  // TO BE IMPLEMENTED
  book(selectedEvent: any) {
    // Code here to navigate to the URL /book/:eventId/:eventName
    // where eventId and eventName comes from the selectedEvent
    this.router.navigate(["/book", selectedEvent.id, selectedEvent.eventName]);
  }

}