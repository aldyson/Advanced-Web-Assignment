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
  items = JSON.parse(localStorage.getItem('markers'));
  usersSoldItems = [];
  url = Constants.URL;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    if (localStorage.getItem('markers')) {
      this.items = JSON.parse(localStorage.getItem('markers'));
    } else {
      this.http.get(this.url + '/assets/data.json')
          .subscribe(response => {
            this.items = response.json().markers;
          });
    }
    this.getUserItems(this.items);
  }

  getUserItems(items) {
    this.usersSoldItems = [];
    for (let i=0;i<items.length;i++) {
      if (items[i]['seller_id'] == sessionStorage.getItem('id') && items[i]['sold'] == true) {
        this.usersSoldItems.push(items[i]);
      }
    }
  }

}
