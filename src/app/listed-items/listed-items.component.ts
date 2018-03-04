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
  }

}
