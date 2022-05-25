import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicImageCardComponent } from './topic-image-card.component';

describe('TopicImageCardComponent', () => {
  let component: TopicImageCardComponent;
  let fixture: ComponentFixture<TopicImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicImageCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
