import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html'
})
export class TestimonialComponent implements OnInit {
  @Input() testimonials;
  @Input() testimonialsTitle;
  defaultImage = '/assets/img_px.gif';
  isWebpImage = '';



  constructor(
    public utilities: UTILITIES
  ) { }

  ngOnInit(): void {
    this.isWebpImage = this.utilities.setWebPImg();
  }

  careersImageOptions: OwlOptions = {
    loop: true,
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
        dots: true,
        margin: 1
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
        items: 1,
        nav: true,
        dots: true
      }
    },
  }


}
