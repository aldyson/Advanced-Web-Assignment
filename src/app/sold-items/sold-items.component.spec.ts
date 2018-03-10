import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http } from '@angular/http';
import { SoldItemsComponent } from './sold-items.component';

describe('SoldItemsComponent', () => {
  let component: SoldItemsComponent;
  let fixture: ComponentFixture<SoldItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldItemsComponent ],
      providers: [
        {provide: Http, deps: [MockBackend]}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
