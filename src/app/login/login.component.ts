import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from "../shared/constants";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accounts = JSON.parse(localStorage.getItem('accounts'));
  errors = {
    'email': '',
    'password': ''
  };
  url = Constants.URL;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    if (localStorage.getItem('accounts')) {
      this.accounts = JSON.parse(localStorage.getItem('accounts'));
    } else {
      this.http.get(this.url + '/assets/data.json')
          .subscribe(response => {
            this.accounts = response.json().accounts;
          });
    }
  }

  onLogin(form: NgForm) {
    const value = form.value;
    this.validate(value);
  }

  validate(value) {
    let account = this.accounts.find( function( ele ) {
      return ele.email === value.email;
    } );

    if (!account) {
      this.errors.email = "Incorrect email address";
      this.errors.password = '';
    } else if (account.password !== value.password) {
      this.errors.email = '';
      this.errors.password = "Incorrect password";
    } else {
      this.signIn(account)
    }
  }

  signIn(account) {
    sessionStorage.setItem('id', account.id);
    sessionStorage.setItem('email', account.email);
    sessionStorage.setItem('firstName', account.firstName);
    sessionStorage.setItem('lastName', account.lastName);
    sessionStorage.setItem('signedIn', 'true');

    this.router.navigate(['/listed-items']);
  }

}
