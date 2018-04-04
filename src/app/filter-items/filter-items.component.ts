import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from "../shared/constants";

@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.component.html',
  styleUrls: ['./filter-items.component.css']
})
export class FilterItemsComponent implements OnInit {

  markersData = [];
  filteredItems = [];
  itemFilter = sessionStorage.getItem('itemFilter') !== null ? sessionStorage.getItem('itemFilter') : 'computer';
  favourites = sessionStorage.getItem('favourites') ? JSON.parse(sessionStorage.getItem('favourites')) : [];

  url = Constants.URL;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getMarkers();
  }

  getMarkers() {
    if (localStorage.getItem('markers')) {
      this.markersData = JSON.parse(localStorage.getItem('markers'));
      this.filterMarkers(this.markersData);
    } else {
      this.http.get(this.url + '/assets/data.json')
          .subscribe(response => {
            this.markersData = response.json().markers;
            this.filterMarkers(this.markersData);
          });
    }
  }

  filterMarkers(markers) {
    sessionStorage.setItem('itemFilter', this.itemFilter);
    this.filteredItems = [];
    for (let i=0; i < markers.length; i++) {
      if (markers[i].type == this.itemFilter && markers[i]['sold'] !== true) {
        this.filteredItems.push(markers[i]);
      }
    }
  }

  addToFavourites(product) {
    this.favourites = sessionStorage.getItem('favourites') ? JSON.parse(sessionStorage.getItem('favourites')) : [];
    this.favourites.push(product);
    sessionStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  isAddedToFavourites(product) {
    this.favourites = sessionStorage.getItem('favourites') ? JSON.parse(sessionStorage.getItem('favourites')) : [];
    if (this.favourites !== null) {
      for(let i = 0; i < this.favourites.length; i++) {
        if (this.favourites[i].id == product.id) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

}
