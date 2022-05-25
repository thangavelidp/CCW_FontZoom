import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLandingComponent } from './article-landing.component';

describe('ArticleLandingComponent', () => {
  let component: ArticleLandingComponent;
  let fixture: ComponentFixture<ArticleLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
