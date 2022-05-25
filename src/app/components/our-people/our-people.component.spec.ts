import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPeopleComponent } from './our-people.component';

describe('OurPeopleComponent', () => {
  let component: OurPeopleComponent;
  let fixture: ComponentFixture<OurPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
