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
  listedItem = false;
  newItem = {
    'name' : '',
    'type' : 'computer',
    'description' : '',
    'price' : '',
    'lat' : '',
    'lng' : '',
    'formatted_address' : '',
    'seller_id' : '',
    'contact_number' : '',
    'email_address' : '',
  };
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
    this.userItems = [];
    for (let i=0;i<items.length;i++) {
      if (items[i]['seller_id'] == sessionStorage.getItem('id') && items[i]['sold'] !== true) {
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
            this.newItem.name = value.itemName;
            this.newItem.type = value.itemType;
            this.newItem.description = value.description;
            this.newItem.price = value.price;
            this.newItem.lat = results[0].geometry.location.lat();
            this.newItem.lng = results[0].geometry.location.lng();
            this.newItem.formatted_address = results[0].formatted_address;
            this.newItem.seller_id = sessionStorage.getItem('id');
            this.newItem.contact_number = sessionStorage.getItem('contact_number');
            this.newItem.email_address = sessionStorage.getItem('email');
            this.postItem(this.newItem);
          }
        }, error => console.log(error)
    );
  }

  postItem(newItem) {
    this.items.push(newItem);
    localStorage.setItem('markers', JSON.stringify(this.items));
    this.getUserItems(this.items);
    this.listingItem = false;
    this.listedItem = true;
  }
}
