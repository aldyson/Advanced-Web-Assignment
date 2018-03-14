import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {Constants} from "../shared/constants";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url = Constants.URL;

  constructor(private http: Http) { }

  ngOnInit() {
    this.initialise();
  }

  initialise() {
    this.http.get(this.url + '/assets/data.json')
        .subscribe(response => {
          localStorage.getItem('accounts') == null ? localStorage.setItem('accounts', JSON.stringify(response.json().accounts)) : '';
          localStorage.getItem('markers') == null ? localStorage.setItem('markers', JSON.stringify(response.json().markers)) : '';
          localStorage.getItem('imagePaths') == null ? localStorage.setItem('imagePaths', JSON.stringify(response.json().imagePaths)) : '';
        });
  }

}
