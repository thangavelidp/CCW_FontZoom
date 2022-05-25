import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UTILITIES } from 'src/app/utils/ccw-utils';
import { VideoLightboxComponent } from '../video-lightbox/video-lightbox.component';

@Component({
  selector: 'app-related-pages',
  templateUrl: './related-pages.component.html',
  styleUrls: ['./related-pages.component.css']
})
export class RelatedPagesComponent implements OnInit {
  @Input() relatedPages;
  @Input() relatedPagesTitle;
  defaultImage = '/assets/img_px.gif';

  youTubeURL;
  dialogRef: any;
  VideoLink;
  video;
  isWebpImage = '';



  constructor(
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public utilities: UTILITIES
  ) { }

  ngOnInit(): void {
    this.isWebpImage = this.utilities.setWebPImg();
  }

  toggleVideo(videoUrl) {
    if (videoUrl) {
      const dialogRef = this.dialog.open(VideoLightboxComponent, {
        data: {
          videoURL: videoUrl,
        },
      });
    }
  }

}
