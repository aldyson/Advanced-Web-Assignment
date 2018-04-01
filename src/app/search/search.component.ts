import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from "../shared/constants";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  lat = parseFloat(localStorage.getItem('lat'));
  lng = parseFloat(localStorage.getItem('lng'));
  markers = [];
  markerGroup = [];
  imagePaths = JSON.parse(localStorage.getItem('imagePaths'));
  currentMarker: number;
  productInView;
  mailTo;
  contactNo;
  favourites = sessionStorage.getItem('favourites') ? JSON.parse(sessionStorage.getItem('favourites')) : [];

  markerName: string;
  markerLat: string;
  markerLng: string;

  url = Constants.URL;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getLocation();
    this.getImagePaths();
    this.getMarkers();
  }

  getMarkers() {
    if (localStorage.getItem('markers')) {
      let markersData = JSON.parse(localStorage.getItem('markers'));
      this.filterMarkers(markersData);
    } else {
      this.http.get(this.url + '/assets/data.json')
          .subscribe(response => {
            let markersData = response.json().markers;
            this.filterMarkers(markersData);
          });
    }
  }

  filterMarkers(markers) {
    for (let i=0; i < markers.length; i++) {
      if (markers[i].seller_id !== sessionStorage.getItem('id') && markers[i]['sold'] !== true) {
        this.markers.push(markers[i]);
      }
    }
  }

  getImagePaths() {
    if (localStorage.getItem('imagePaths')) {
      this.imagePaths = JSON.parse(localStorage.getItem('imagePaths'));
    } else {
      this.http.get(this.url + '/assets/data.json')
          .subscribe(response => {
            this.imagePaths = response.json().imagePaths;
          });
    }
  }

  getMarkerUrl(m) {
    return this.imagePaths[m.type];
  }

  markerClicked(marker: Marker, index: number) {
    this.markerGroup = [];
    this.currentMarker = index;
    sessionStorage.setItem('currentMarker', this.currentMarker.toString());

    for (let i=0; i < this.markers.length; i++) {
      if (this.markers[i].lat == marker.lat && this.markers[i].lng == marker.lng) {
        this.markerGroup.push(this.markers[i]);
      }
    }

    this.displayMarkers(this.markerGroup);
  }

  displayMarkers(markerGroup) {

  }

  mapClicked($event: any) {
    // var newMarker = {
    //   name: 'Untitled',
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    // };
    //
    // this.markers.push(newMarker);
  }

  addMarker() {
    console.log("Adding Marker");

    let newMarker = {
      name: this.markerName,
      lat: this.markerLat,
      lng: this.markerLng
    };

    this.markers.push(newMarker);
  }

  viewProductDetails(m) {
    this.productInView = m;
    console.log(m);
    this.mailTo = "mailto:" + m.email_address;
    this.contactNo = "tel:" + m.contact_number;
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

interface Marker{
  name: string,
  lat: number,
  lng: number
}
