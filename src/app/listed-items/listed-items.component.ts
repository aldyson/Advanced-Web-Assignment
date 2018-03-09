import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-listed-items',
  templateUrl: './listed-items.component.html',
  styleUrls: ['./listed-items.component.css']
})
export class ListedItemsComponent implements OnInit {
  @Input() item;
  @Input() index: number;

  sampleItems = [
    { name: 'A thing', price: '£60'},
    { name: 'Another thing', price: '£35'},
    { name: 'Something else', price: '£20'},
    { name: 'The last thing', price: '£45'},
  ];

  constructor() { }

  ngOnInit() {
    this.getLocation();
  }

  //TODO: Move these three methods to run as soon as the user accesses the application.
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
