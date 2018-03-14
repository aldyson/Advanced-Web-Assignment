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
    console.log(this.accounts);
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
    for (let i=0;i<this.accounts.length;i++) {
      if (value.email == this.accounts[i].email) {
        if (value.password !== this.accounts[i].email) {
          return this.errors.password = 'Incorrect Password';
        } else {
          this.signIn(this.accounts[i]);
        }
      } else {
        return this.errors.email = 'No account exists with this email address';
      }
    }
  }

  signIn(account) {
    sessionStorage.setItem('id', account.id);
    sessionStorage.setItem('email', account.email);
    sessionStorage.setItem('firstName', account.firstName);
    sessionStorage.setItem('lastName', account.lastName);

    this.router.navigate(['/listed-items']);
  }

}
