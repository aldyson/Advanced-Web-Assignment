import {Component, OnInit, Input} from '@angular/core';
import {Http} from "@angular/http";
import {Constants} from "../shared/constants";

@Component({
  selector: 'app-listed-items',
  templateUrl: './listed-items.component.html',
  styleUrls: ['./listed-items.component.css']
})
export class ListedItemsComponent implements OnInit {
  @Input() item;
  @Input() index: number;

  items = JSON.parse(localStorage.getItem('markers'));
  userItems = [];
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
    for (let i=0;i<items.length;i++) {
      if (items[i]['seller_id'] == sessionStorage.getItem('id')) {
        this.userItems.push(items[i]);
      }
    }
  }
}
