import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Constants} from "../shared/constants";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites = sessionStorage.getItem('favourites') ? JSON.parse(sessionStorage.getItem('favourites')) : [];
  url = Constants.URL;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  removeFromFavourites(index) {
    this.favourites.splice(index, 1);
    sessionStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

}
