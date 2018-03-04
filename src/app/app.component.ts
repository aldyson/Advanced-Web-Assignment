import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sampleItems = [
    { name: 'A thing', price: '£60'},
    { name: 'Another thing', price: '£35'},
    { name: 'Something else', price: '£20'},
    { name: 'The last thing', price: '£45'},
  ];
  name = '';
}
