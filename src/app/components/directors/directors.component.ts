import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {
  @Input("directors") directors;
  @Output() topic_param: EventEmitter<any> = new EventEmitter();;
  @ViewChild('divID') divID: ElementRef;
  defaultImage = '/assets/img_px.gif';
  //@ViewChild('divToScroll') divToScroll: ElementRef;
  mobileBod: boolean = true;
  slideBod: boolean = false;
  @Input() topicType;
  index: number;
  isWebpImage = '';
  


  constructor(
    private _router: Router,
    public utilities: UTILITIES
  ) { }

  ngOnInit(): void {
  if (this.topicType == 'showMobilePod') {
      this.mobileBod = false;
      this.slideBod = true;
    }

    this.isWebpImage = this.utilities.setWebPImg();
  }


  CarouCardOptions: OwlOptions = {
    loop: true,
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
        items: 2,
        // center: true,
        dots: true,
        // margin: 15
      },
      700: {
        items: 2,
        dots: true
      },
      740: {
        items: 3,
        // margin: 15,
        // nav: true,
        dots: true
      },
      940: {
        items: 3,
        nav: false,
        dots: true
      }
    },
  }

  detectindex(index) {
    this.mobileBod = false;
    this.slideBod = true;
    this.CarouCardOptions.startPosition = index - 1;
    this.showlessscroll();
    document.body.classList.add("directors");
    this.index = index;
    this.topic_param.emit(index)
  }
  // back() {
  //   this.mobileBod = true;
  //   this.slideBod = false;
  //   document.body.classList.remove("directors");
  // }

  addUrlParam() {
    this.topic_param.emit(this.index);
  }
  showlessscroll() {
    let showmore;
    // showmore = document.getElementById("divToScroll");
    // showmore.scrollToTop();
    window.scroll({
      behavior: 'smooth',
      top: 100,
      left: 0,

    });
  }


}
