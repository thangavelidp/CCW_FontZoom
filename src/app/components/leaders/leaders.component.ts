import { Component, HostListener, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoLightboxComponent } from '../video-lightbox/video-lightbox.component';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {
  @Input() ourLeaders;
  @Input() sectionTitle;
  @Input() topicType;;
  dialogRef: any;
  innerWidth: number;
  isBrowser: boolean;
  isWebpImage = '';




  defaultImage = '/assets/img_px.gif';

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth;
    }
  }

  @Output() topic_param: EventEmitter<any> = new EventEmitter();;

  //@ViewChild('divToScroll') divToScroll: ElementRef;
  mobileBod: boolean = true;
  slideBod: boolean = false;
  index: number;

  constructor(
    private _router: Router,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public utilities: UTILITIES
  ) {
    this.onResize(event)

    this.innerWidth = window.innerWidth
}
  ngOnInit(): void {
  if (this.topicType == 'showMobilePod') {
      this.mobileBod = false;
      this.slideBod = true;
    }
    this.isWebpImage = this.utilities.setWebPImg();
  }

  toggleVideo(index) {
    if (this.innerWidth > 767) {
      const dialogRef = this.dialog.open(VideoLightboxComponent, {
        data: {
          textBox: this.ourLeaders[0].card,
          index: index
        }
      });
    }
  }
  closeclk() {
    this.dialogRef.close();
  }

  back() {
    this.mobileBod = true;
    this.slideBod = false;
    document.body.classList.remove("directors");
  }
  CarouCardOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,

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
        items: 1,
        nav: false,
        dots: false
      },
      941: {
        items: 3,
        nav: true,
        dots: false
      }
    },
  }

  detectindex(index) {
    this.mobileBod = false;
    this.slideBod = true;
    this.CarouCardOptions.startPosition = index;
    this.showlessscroll();
    document.body.classList.add("directors");
    this.index = index;
    this.topic_param.emit(this.topic_param + "/director" + index);
    // this._router.navigate([], {
    //   queryParams: {
    //     bod: index
    //   }
    // })
  }

  // addUrlParam(){
  //   console.log(">>>>", this.topic_param)


  // }
  showlessscroll() {
    let showmore;
    //showmore = document.getElementById("divToScroll");
    //  showmore.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scroll({
      behavior: 'smooth',
      top: 100,
      left: 0,

    });
  }
}
