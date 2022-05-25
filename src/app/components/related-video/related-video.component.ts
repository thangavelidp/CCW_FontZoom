import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UTILITIES } from 'src/app/utils/ccw-utils';
import { VideoLightboxComponent } from '../video-lightbox/video-lightbox.component';

@Component({
  selector: 'app-related-video',
  templateUrl: './related-video.component.html',
  styleUrls: ['./related-video.component.css']
})
export class RelatedVideoComponent implements OnInit {
  @Input() relatedVideo;
  @Input() relatedVideoTitle;
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
  ngOnChanges(changes: any) {
    this.video = this.relatedVideo
  }

  toggleVideo(videoUrl) {
    if (videoUrl) {
      const dialogRef = this.dialog.open(VideoLightboxComponent, {
        data: {
          videoURL: videoUrl,
        },
      });
    }
    // this.video = this.relatedVideo.filter(videoLink => {           
    //   this.youTubeURL = videoLink.youtubeurl;
    //   this.VideoLink = videoLink.videoUrl;
    //   // if (videoUrl) {
    //   //   const dialogRef = this.dialog.open(VideoLightboxComponent, {
    //   //     data: {
    //   //       videoURL: videoUrl,
    //   //     },
    //   //   });
    //   // }

    // })
  }
  // closeclk() {
  //   this.dialogRef.close();
  // }

}
