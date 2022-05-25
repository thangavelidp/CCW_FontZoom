import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';

import { VideoLightboxComponent } from '../video-lightbox/video-lightbox.component';

@Component({
  selector: 'app-our-people',
  templateUrl: './our-people.component.html',
  styleUrls: ['./our-people.component.css']
})
export class OurPeopleComponent implements OnInit {
  @Input() sectionTitle;
  @Input() peopleCard;
  isWebpImage = '';
  defaultImage = '/assets/img_px.gif';
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
  CarouCardOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    //dots: true,
    navSpeed: 700,
    navText: ['', ''],
    // margin: 20,
    responsive: {
      0: {
        items: 1,
        center: true,
        dots: true,
      },
      //  320: {
      //   items: 1,
      //   center: true,
      //   dots: true,
      //   nav: true
      //    },

      600: {
        items: 1,
        // center: true,
        dots: true,
        // margin: 15
      },
      700: {
        items: 1,
        dots: true
      },
      740: {
        items: 1,
        // margin: 15,
        // nav: true,
        dots: true
      },
      940: {
        items: 3,
        nav: true,
        dots: false
      }
    },
  }

}
