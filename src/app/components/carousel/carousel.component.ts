import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CarouselComponent implements OnInit {
  @Input() peopleCard;
  @Input() displayCount;
  card;
  news;
  @Input() sectionTitle;
  defaultImage = '/assets/img_px.gif';
  @Input() newsArticleList;
  isWebpImage = '';

  constructor(public utilities: UTILITIES) { }

  ngOnInit(): void {
    this.isWebpImage = this.utilities.setWebPImg();
  }
  toggleFlip(index) {
    // if (this.isBrowser) {
       index.flip = (index.flip == 'inactive') ? 'active' : 'inactive';
    //  }
  }
  customOptions: OwlOptions = {
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
        // dots: true,
        // margin: 15
      },
      700: {
        items: 1
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
        dots: true
      },
      1024: {
        items: 3,
        nav: true,
        dots: false
      }
    },
  }

}
