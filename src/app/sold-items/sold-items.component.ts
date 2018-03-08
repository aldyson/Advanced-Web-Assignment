import { Component, OnInit } from '@angular/core';
import { JsonService } from '../shared/json.service'

@Component({
  selector: 'app-sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.css'],
  providers: [JsonService]
})
export class SoldItemsComponent implements OnInit {

  constructor(private jsonService: JsonService) { }

  ngOnInit() {
  }

  getJSON() {
    this.jsonService.getJsonData()
  }

}
