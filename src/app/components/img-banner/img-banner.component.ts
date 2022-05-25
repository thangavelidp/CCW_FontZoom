import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';
@Component({
  selector: 'app-img-banner',
  templateUrl: './img-banner.component.html',
  styleUrls: ['./img-banner.component.css']
})
export class ImgBannerComponent implements OnInit {
  @Input() relatedImages;
  @Input() relatedImagesTitle;
  defaultImage = '/assets/img_px.gif';
  isWebpImage = '';



  constructor(public utilities: UTILITIES) { }

  ngOnInit(): void {
    this.isWebpImage = this.utilities.setWebPImg();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 7000,

    //dots: true,
    navSpeed: 300,
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
        dots: true
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
        items: 1,
        nav: false,
        dots: true
      }
    },
  }
}
