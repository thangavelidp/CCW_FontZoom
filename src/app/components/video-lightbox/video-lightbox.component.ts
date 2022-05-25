import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-video-lightbox',
  templateUrl: './video-lightbox.component.html',
  styleUrls: ['./video-lightbox.component.css']
})
export class VideoLightboxComponent implements OnInit {
  @Input('mat-dialog-close') dialogResult: any
  public videoshowUrl: boolean = false;
  isWebpImage = '';
  
  
  
  constructor(
    private dialogRef: MatDialogRef<VideoLightboxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    @Inject(PLATFORM_ID) private platformId,
    public sanitizer: DomSanitizer,
    public utilities: UTILITIES
    ) {
  }
  videoURL: any;
  youtubeUrl: any;
  textContent: any;
  leaders;
  textBox;
  index:number
  defaultImage = '/assets/img_px.gif';
  careersImageOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    //dots: true,
    navSpeed: 700,
    autoplay: false,
    navText: ['', ''],
    // margin: 20,
    responsive: {
      0: {
        items: 1,
        center: true,
        dots: false,
        nav: true,
        margin: 1
      },
      600: {
        items: 1,
        dots: false,
        nav: true,
      },
      700: {
        items: 1,
        dots: false,
        nav: true,
      },
      740: {
        items: 1,
        dots: false,
        nav: true,
      },
      940: {
        items: 1,
        nav: true,
        dots: true
      }
    },
  }

  ngOnInit() {
       if (this.data.videoURL != undefined) {
      if (this.data.videoURL.includes("https://")) {
        this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.videoURL + '?autoplay=1');
      }
      else {
        this.videoURL = this.data.videoURL;
      }
    }
    if (this.data.videoURL == undefined) {
      this.textBox = this.data.textBox;
      this.index = this.data.index
      this.careersImageOptions.startPosition = this.index;  
      
    }
    this.isWebpImage = this.utilities.setWebPImg();
  }

  
  // showlessscroll() {
  //   let showmore;
  //   showmore = document.getElementById("divToScroll");
  //   showmore.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // }

  onConfirmClick() {
    this.dialogRef.close(true)
  }


}
