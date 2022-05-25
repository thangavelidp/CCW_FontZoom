import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.css']
})
export class OurStoryComponent implements OnInit {
  @Input() ourStroy: any;
  public currentIndex = 7;
  @Input('story') year: number;
  defaultImage = '/assets/img_px.gif';
  @Input() active = false;
  public storyData: any;
  selectedItem;
  public nxtIndex = 0;
  public disableNext = false;
  public disablePrev = true;
  innerWidth: number;
  isWebpImage = '';
  constructor(
    public utilities: UTILITIES
  ) { }

  ngOnInit(): void {
    this.selectedItem = this.ourStroy.story[7];
    if (isPlatformBrowser) {
      if (window.innerWidth >= 767) {
        this.storyData = this.ourStroy.story;
      } else {
        this.selectedItem = this.ourStroy.story[7];
        this.currentIndex = 0;
        this.storyData = this.next(this.nxtIndex, this.ourStroy.story.reverse());
      }
    }
    this.isWebpImage = this.utilities.setWebPImg();
  }


  selectTab(index) {
    this.currentIndex = index;
  }

  listClick(event, newValue) {
    this.selectedItem = newValue;
  }

  next(index, arr) {
    return arr.slice(index, index + 3);
  };
  nxtArIcn() {
    this.nxtIndex += 3;
    this.currentIndex = 0;
    this.storyData = this.next(this.nxtIndex, this.ourStroy.story);
    this.selectedItem = this.storyData[0];
    if (this.storyData.length < 3) {
      this.disableNext = true;
      this.disablePrev = false;
    } else if (this.storyData.length == 3) {
      this.disablePrev = false;
      this.disableNext = false;
    } else {
      this.disableNext = false;
      this.disablePrev = true;
    }
  };
  prvArIcn() {
    this.nxtIndex -= 3;
    this.currentIndex = 0;
    this.storyData = this.next(this.nxtIndex, this.ourStroy.story);
    this.selectedItem = this.storyData[0];
    if (this.storyData.length < 3) {
      this.disablePrev = false;
      this.disableNext = true;
    } else if (this.storyData.length == 3) {
      if (this.storyData[0].year == this.ourStroy.story[0].year) {
        this.disablePrev = true;
      } else {
        this.disablePrev = false;
      }
      this.disableNext = false;
    } else {
      this.disablePrev = true;
      this.disableNext = false;
    }
  }
  @HostListener("window:resize", [])
  public onResize() {
    if (isPlatformBrowser) {
      this.innerWidth = window.innerWidth; 
      this.detectScreenSize();
    }
  }
  public detectScreenSize() {
    if (isPlatformBrowser) {
      if (this.innerWidth >= 767) {
        this.storyData = this.ourStroy.story;
      } else {
        this.storyData = this.next(this.nxtIndex, this.ourStroy.story.reverse());
      }
    }
  }
}