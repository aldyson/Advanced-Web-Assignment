import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should display navigation menu if user is signed in', () => {
    sessionStorage.setItem('email', 'test@email.com');
    component.isSignedIn();
    fixture.detectChanges();
    let compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-toggle').elementToBeClickable);
  });
});
