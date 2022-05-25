import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { VideoLightboxComponent } from '../video-lightbox/video-lightbox.component';
import { UTILITIES } from 'src/app/utils/ccw-utils';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() overviewPod;
  youtubeUrl;
  dialogRef: any;
  VideoLink;
  showIframe: boolean = false;
  defaultImage = '/assets/img_px.gif';
  isWebpImage = '';

  constructor(
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public utilities: UTILITIES
  ) { }

  ngOnInit(): void {
    this.overviewPod.map(overview => {
      if (overview.video != undefined) {
        if (overview.video.videoUrl != undefined && overview.video.videoUrl.includes("https:")) {
          this.youtubeUrl = overview.video.videoUrl;
          this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(overview.video.videoUrl + '?autoplay=0');
        }
      }


    })
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
    // this.overviewPod.map(videoLink => {

    //   this.youtubeUrl = videoLink.youtubeurl;
    //   this.VideoLink = videoLink.videoUrl;

  
    // })
  }
  closeclk() {
    this.dialogRef.close();
  }
}
