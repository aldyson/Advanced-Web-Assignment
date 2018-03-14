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
  markers = JSON.parse(localStorage.getItem('markers'));
  imagePaths = JSON.parse(localStorage.getItem('imagePaths'));
  currentMarker: number;
  productInView;
  mailTo;
  contactNo;

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
      this.markers = JSON.parse(localStorage.getItem('markers'));
    } else {
      this.http.get(this.url + '/assets/data.json')
          .subscribe(response => {
            this.markers = response.json().markers;
          });
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
    this.currentMarker = index;
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

}

interface Marker{
  name: string,
  lat: number,
  lng: number
}
