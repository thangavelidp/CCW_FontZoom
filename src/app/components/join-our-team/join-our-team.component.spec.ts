import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOurTeamComponent } from './join-our-team.component';

describe('JoinOurTeamComponent', () => {
  let component: JoinOurTeamComponent;
  let fixture: ComponentFixture<JoinOurTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinOurTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOurTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
