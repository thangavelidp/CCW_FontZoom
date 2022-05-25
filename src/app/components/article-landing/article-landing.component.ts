import { trigger, state, style, transition, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-article-landing',
  templateUrl: './article-landing.component.html',
  styleUrls: ['./article-landing.component.css'],
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
export class ArticleLandingComponent implements OnInit {
  @Input() peopleCard;
  @Input() sectionTitle;
  defaultImage = '/assets/img_px.gif';
  isWebpImage = '';


  //  flip: string = 'inactive';
  innerWidth: number;

  constructor(
    public utilities: UTILITIES
  ) {
    if (isPlatformBrowser) {
      this.innerWidth = window.innerWidth
    }
  }

  ngOnInit(): void {
    this.isWebpImage = this.utilities.setWebPImg();
   
    console.log("this.peopleCard", this.peopleCard)
    // flip = 'inactive';
    // this.peopleCard.map(card => {
    //   console.log("card", card);
    // })
  }
  toggleFlip(index) {
    if (isPlatformBrowser) {
      if (this.innerWidth > 1023) {
        index.flip = (index.flip == 'inactive') ? 'active' : 'inactive';
      }
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser) {
      this.innerWidth = window.innerWidth;
    }
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,

    //dots: true,
    navSpeed: 700,
    navText: ['', ''],
    // margin: 20,
    responsive: {
      0: {
        items: 1,
        center: true,
        dots: false,
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
        items: 1,
        dots: false
      },
      740: {
        items: 3,
        // margin: 15,
        // nav: true,
        dots: false
      },
      940: {
        items: 3,
        nav: false,
        dots: false
      }
    },
  }

}
