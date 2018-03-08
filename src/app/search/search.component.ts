import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from "../shared/constants";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  lat: number = 42.858217;
  lng: number = -70.929990;
  markers;

  markerName: string;
  markerLat: string;
  markerLng: string;

  url = Constants.URL;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getMarkers();
  }

  getMarkers() {
    this.http.get(this.url + '/assets/data.json')
        .subscribe(response => {
          this.markers = response.json().markers;
        });
  }

  markerClicked(marker: Marker, index: number) {
    console.log("Clicked marker: " + marker.name + ' at index ' + index);
  }

  mapClicked($event: any) {
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
    };

    this.markers.push(newMarker);
  }

  addMarker() {
    console.log("Adding Marker");

    var newMarker = {
      name: this.markerName,
      lat: this.markerLat,
      lng: this.markerLng
    }

    this.markers.push(newMarker);
  }

}

interface Marker{
  name: string,
  lat: number,
  lng: number
}
