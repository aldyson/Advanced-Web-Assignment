import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from "../shared/constants";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  accounts = JSON.parse(localStorage.getItem('accounts'));
  errors = {
    'email' : ''
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

  onRegister(form: NgForm) {
    const value = form.value;
    this.validate(value);
  }

  validate(value) {
    for (let i=0;i<this.accounts.length;i++) {
      if (value.email == this.accounts[i].email) {
        return this.errors.email = 'This email address has already been taken';
      }
    }

    this.createUser(value);
  }

  createUser(value) {
    const userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.accounts.push({
      'id': userId,
      'firstName': value.firstName,
      'lastName': value.lastName,
      'email': value.email,
      'password': value.password,
    });

    localStorage.setItem('accounts', JSON.stringify(this.accounts));

    this.signIn(value, userId);
  }

  signIn(value, userId) {
    sessionStorage.setItem('id', userId);
    sessionStorage.setItem('email', value.email);
    sessionStorage.setItem('firstName', value.firstName);
    sessionStorage.setItem('lastName', value.lastName);

    this.router.navigate(['/listed-items']);
  }

}
