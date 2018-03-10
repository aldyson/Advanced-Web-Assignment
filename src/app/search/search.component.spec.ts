import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { SearchComponent } from './search.component';
import {FormsModule} from "@angular/forms";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SearchComponent ],
      providers: [
        {provide: Http, deps: [MockBackend]}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
