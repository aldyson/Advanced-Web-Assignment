import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isSignedIn() {
    this.userEmail = sessionStorage.getItem('email');
    return !!this.userEmail;
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
