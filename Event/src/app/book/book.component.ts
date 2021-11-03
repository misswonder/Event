import { BookService } from './book.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  // Implemented - No Changes Required 
  constructor(private fb: FormBuilder, private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  bookingForm!: FormGroup;
  eventId!: string;
  eventName: string;
  locations?: any[];
  successMessage: string | null = null;
  errorMessage: string | null = null; 

  // implemented - No Changes Required
  getVenue() {
    this.locations = [];
    this.bookService.getLocations(this.eventId).subscribe(
      response => this.locations = response.locations,
      error => console.log(error.error.message)
    )
  }

  // TO BE MODIFIED
  ngOnInit(): void {

    // ADD THE CODE HERE TO FECTH THE eventId & eventName FROM ROUTE PARAMTER 
    // Assign the fetched vaules to eventId and eventName property of BookComponent class

    this.route.params.subscribe(param => {
      this.eventId = param.eventId;
      this.eventName = param.eventName;
    }); 

    // DO NOT REMOVE THIS CODE
    this.getVenue();

    // Add the folllowing form controls to the bookingForm reactive form instance 
    // with the given default values and validators for each form control

    // 1. eventId:- default : Select event's ID, Validators: required
    // 2. venue:- default: '', Validators: requried
    // 3. emailId:- default: '', Vaidaators: required, validateEmail custom validator
    // 4. date: default: '', Validators: required, validateDate custom validator
    
    this.bookingForm = this.fb.group({
      eventId: [{value: this.eventId, disabled: true}, Validators.required],
      venue: ['', [Validators.required]],
      emailId: ['', [Validators.required, this.validateEmail]],
      date:['', [Validators.required, this.validateDate]]
    })
  }

  // TO BE IMPLEMENTED
  book() {
    // 1. reset successMessage and errorMessage to null
    // 2. Invoke the bookEvent method ... bookService passing as response
    // 3. In success case, populate successMesssage 'Your booking is successful. Booking id is responseId' 
    // 4. In error case, populate errorMessage as 'Network issue!! Booking Failed'

    this.successMessage = null;
    this.errorMessage = null;
    this.bookService.bookEvent(this.bookingForm.value).subscribe(
      response => {
        this.successMessage = `Your booking is successful. Booking id is ${response.id}`;
      },
      err => {
        this.errorMessage = `Network issue!! Booking Failed`;
      }
    )
  }

  // TO BE IMPLEMENTED 
  chooseEvent() {
    // write the code to navigate to /home page
    this.router.navigate(['home']);
  }

  // Implemented - No Changes Required
  validateDate(c: FormControl) {
    let selectedDate = new Date(c.value).setUTCHours(0, 0, 0);
    let today = new Date().setUTCHours(0, 0, 0)
    if(selectedDate <= today) {
      return { dateError: {message: "You cannot book event for present or past date"}}
    }
    else {
      return null;
    }
  }

  // TO BE IMPLEMENT
  validateEmail(c: FormControl) {
    // 1. It takes the emailId form control as a paramter and validate it based on the given response
    // 2. <<PART-1>>@<<PART-2>>.<<PART-3>>
      // PART-1 ==> should always start with an alphabet, folllowed by alphabets and numbers
      // PART-2 ==> it should be either gmail or yahoo
      // part-3 ==> it should be either com or in
    // 3. If the emailId satisfies the above pattern, return null
    // 4. Else, return { emailError: { message: "Invalid Email-ID" } }
    const match = /^([a-z][a-z0-9]+)@(gmail|yahoo)\.(com|in)$/i.exec(c.value);
    if (match) {
      return null;
    }
    return {emailError: { message: "Invalid Email-ID" } }
  }
}