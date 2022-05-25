import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UTILITIES } from 'src/app/utils/ccw-utils';
import { VideoLightboxComponent } from '../video-lightbox/video-lightbox.component';

@Pipe({ name: 'escapeHtml', pure: false })
class EscapeHtmlPipe implements PipeTransform {
  transform(value: any, args: any[] = []) {
    // Escape 'value' and return it
  }
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',

  styleUrls: ['./navigation.component.css'],

})
export class NavigationComponent implements OnInit {
  @Input() overlayPod;
  youTubeURL;
  dialogRef: any;
  VideoLink;
  defaultImage = '/assets/img_px.gif';
  isWebpImage = '';



  constructor(public sanitizer: DomSanitizer,
    public utilities: UTILITIES,
    public dialog: MatDialog,) { }

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
    // this.overlayPod.map(overlay => {            
    //   console.log("overlay", overlay)
    // })
  }
  closeclk() {
    this.dialogRef.close();
  }
}
