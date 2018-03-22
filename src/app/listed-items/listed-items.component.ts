import {Component, OnInit, Input} from '@angular/core';
import {Http} from "@angular/http";
import {Constants} from "../shared/constants";
import {NgForm} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";
declare let google: any;
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
  listingItem = false;
  url = Constants.URL;
  geocoder;

  constructor(private http: Http, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.getItems();
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
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

  onListItem (form: NgForm) {
    const value = form.value;
    this.getLatLng(value);
  }

  getLatLng(value) {
    this.geocoder.geocode({
          'address': value.addressLine1 + ", " + value.postCode
        }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0]);
            value.itemLat = results[0].geometry.location.lat();
            value.itemLng = results[0].geometry.location.lng();
            value.addressLine1 = results[0].address_components[0].short_name + " " + results[0].address_components[1].short_name;
            value.addressLine2 = results[0].address_components[2].short_name;
            value.county = results[0].address_components[3].short_name;
            value.postCode = results[0].address_components[6].short_name;
            value.seller_id = sessionStorage.getItem('id');
            value.contact_number = sessionStorage.getItem('contact_number');
            value.email_address = sessionStorage.getItem('email');
            this.postItem(value);
          }
        }, error => console.log(error)
    );
  }

  postItem(value) {

  }
}
