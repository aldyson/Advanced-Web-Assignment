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
    this.getLocation();
  }

  initialise() {
    this.http.get(this.url + '/assets/data.json')
        .subscribe(response => {
          localStorage.getItem('accounts') == null ? localStorage.setItem('accounts', JSON.stringify(response.json().accounts)) : '';
          localStorage.getItem('markers') == null ? localStorage.setItem('markers', JSON.stringify(response.json().markers)) : '';
          localStorage.getItem('imagePaths') == null ? localStorage.setItem('imagePaths', JSON.stringify(response.json().imagePaths)) : '';
        });
  }

    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.success, this.error);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    success(position) {
        localStorage.setItem('lat', position.coords.latitude);
        localStorage.setItem('lng', position.coords.longitude);
    }

    error(err) {
        console.log(`ERROR(${err.code}): ${err.message}`);
    }

}
