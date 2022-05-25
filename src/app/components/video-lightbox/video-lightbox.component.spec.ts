import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLightboxComponent } from './video-lightbox.component';

describe('VideoLightboxComponent', () => {
  let component: VideoLightboxComponent;
  let fixture: ComponentFixture<VideoLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoLightboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
