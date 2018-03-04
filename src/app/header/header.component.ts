import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail: string;

  constructor() { }

  ngOnInit() {
  }

  isSignedIn() {
    this.userEmail = sessionStorage.getItem('email');
    return !!this.userEmail;
  }

}
