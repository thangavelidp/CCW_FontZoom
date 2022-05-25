import { trigger, state, style, transition, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
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
export class NewsComponent implements OnInit {
  @Input() peopleCard;
  @Input() displayCount;
  card;
  news;
  isWebpImage = '';
  @Input() sectionTitle;
  maxSize = 7;
  defaultImage = '/assets/img_px.gif';
  @Input() newsArticleList;
  @Input() totalRecords;
  @Output() pageNumber: EventEmitter<any> = new EventEmitter();;
  p: number = 0;
  collection: any[];
  innerWidth: number;
  isBrowser: boolean;
  constructor(
    public utilities: UTILITIES
  ) {
  //  if (this.isBrowser) {
      this.innerWidth = window.innerWidth
  //  }
  }

  ngOnInit(): void {
    this.isWebpImage = this.utilities.setWebPImg();

    if(this.innerWidth < 767){
      this.maxSize = 5
    }
  }
  toggleFlip(index) {
   // if (this.isBrowser) {
      // if (this.innerWidth > 1023) {
        index.flip = (index.flip == 'inactive') ? 'active' : 'inactive';
     // }
  //  }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //if (this.isBrowser) {
      this.innerWidth = window.innerWidth;
   // }
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
        nav: true
      },
      //  320: {
      //   items: 1,
      //   center: true,
      //   dots: true,
      //   nav: true
      //    },

      600: {
        items: 1,
        
        nav: true
        // center: true,
        // dots: true,
        // margin: 15
      },
      700: {
        items: 1,
        dots: false,
        
        nav: true
      },
      740: {
        items: 1,
        // margin: 15,
        nav: true,
        dots: false
      },
      940: {
        items: 3,
        nav: true,
        dots: false
      }
    },
  }
  getPage(page: number) {
    this.pageNumber.emit(this.p = page);
  }

}
