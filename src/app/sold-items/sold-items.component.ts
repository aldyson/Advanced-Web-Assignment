import { Component, OnInit } from '@angular/core';
import { JsonService } from '../shared/json.service'
import { Http } from '@angular/http';
import {Constants} from "../shared/constants";

@Component({
  selector: 'app-sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.css'],
  providers: [JsonService]
})
export class SoldItemsComponent implements OnInit {
  data;

  url = Constants.URL;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  getJSON() {
    this.http.get(this.url + '/assets/data.json')
        .subscribe(response => {
          this.data = response.json().imagePaths;
        });
  }

}
