import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. Route Path: /home ==> Component: HomeComponent
// 2. Route Path: /book/:eventId/:evetnName ==> Component: BookComponent
// In case if an Invalid URL is provided, the user must be redirected to the Home Page

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "book/:eventId/:eventName", component: BookComponent},
  {path: "**", redirectTo: "home", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
