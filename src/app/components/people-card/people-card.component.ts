import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UTILITIES } from 'src/app/utils/ccw-utils';


@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css']
})


export class PeopleCardComponent implements OnInit {
  @Input() peopleCard:any;
  @Input() overlayTab: any;
  @Input() whatWeDo: any;
  @Input() ourPeoples: any;
  
  @Input() sectionTitle;
  @Input() imageCardType;
  @Input() active = false;
  defaultImage = '/assets/img_px.gif';
  public ourPeople = true;
  public ourLeader = false;
  public ourBoard = false;

  public GlobalExcellenceAwards = true;
  public COVID19scholarships = false;
  public COVID19studentsupport = false;
  public MelbourneCity = false;
  public HotcoursesFoundation = false;

  isWebpImage = '';




  constructor(public utilities: UTILITIES) { }
public tabName:any;
public currentIndex = [0];
  
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
        // dots: true,
        // margin: 15
      },
      700: {
        items: 2
      },
      740: {
        items: 3,
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
  customWhatweDoOptions: OwlOptions = {
    loop: false,
    touchDrag:false,
    mouseDrag:false,
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
        // dots: true,
        // margin: 15
      },
      700: {
        items: 2
      },
      740: {
        items: 3,
        // margin: 15,
      // nav: true,
        dots: true
      },
      940: {
        items: 3,
        nav: true,
        dots: false,
        
      }
    },
  }
  customCardOptions: OwlOptions = {
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
        items: 2,
        // center: true,
        // dots: true,
        // margin: 15
      },
      700: {
        items: 2
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
        nav: false,
        dots: true
      }
    },
  }
// News Career carousel Options 
  

  ngOnInit(): void {
    this.isWebpImage = this.utilities.setWebPImg();
   }

  // isOpen(tabName:any){
  //   if (tabName == 'ourPeople'){
  //     this.ourPeople = true;
  //     this.ourLeaders = false;
  //     this.ourBrdofDir = false;
  //   } else if(tabName == 'ourLeaders'){
  //     this.ourPeople = false;
  //     this.ourLeaders = true;
  //     this.ourBrdofDir = false;
  //   }else if(tabName == 'ourBrdofDir'){
  //     this.ourPeople = false;
  //     this.ourLeaders = false;
  //     this.ourBrdofDir = true;
  //   }
  // }
  

  ck_ourplr(index) {   
    this.currentIndex = index;

  //  this.peopleCard.map(title => {
  //    if(tabName == title.title){
  //      active = 
  //    }
     
  //  })
    // (event.target).addClass('active');
    if (index == 0) {
      this.ourPeople = true;
      this.ourLeader = false;
      this.ourBoard = false;
      
    }
    if (index == 1) {
      this.ourPeople = false;
      this.ourLeader = true;
      this.ourBoard = false;
    }
    if (index == 2) {
      this.ourPeople = false;
      this.ourLeader = false;
      this.ourBoard = true;
    }

  }
  // ck_ourplr(index) {
  //   this.ourPeople = true;
  //   this.ourLeader = false;
  //   this.ourBoard = false;
  // }
  // ck_ourldr() {
  //   this.ourPeople = false;
  //   this.ourLeader = true;
  //   this.ourBoard = false;
  // }
  // ck_ourbrd() {
  //   this.ourPeople = false;
  //   this.ourLeader = false;
  //   this.ourBoard = true;
  // }
  ck_ourplr1(index) {   
    this.currentIndex = index;

  //  this.peopleCard.map(title => {
  //    if(tabName == title.title){
  //      active = 
  //    }
     
  //  })
    // (event.target).addClass('active');


    if (index == 0) {
      this.GlobalExcellenceAwards = true;
      this.COVID19scholarships = false;
      this.COVID19studentsupport = false;
      this.MelbourneCity = false;
      this.HotcoursesFoundation = false;      
    }
    if (index == 1) {
      this.GlobalExcellenceAwards = false;
      this.COVID19scholarships = true;
      this.COVID19studentsupport = false;
      this.MelbourneCity = false;
      this.HotcoursesFoundation = false;  
    }
    if (index == 2) {
      this.GlobalExcellenceAwards = false;
      this.COVID19scholarships = false;
      this.COVID19studentsupport = true;
      this.MelbourneCity = false;
      this.HotcoursesFoundation = false; 
    }
    if (index == 3) {
      this.GlobalExcellenceAwards = false;
      this.COVID19scholarships = false;
      this.COVID19studentsupport = false;
      this.MelbourneCity = true;
      this.HotcoursesFoundation = false; 
    }
    if (index == 4) {
      this.GlobalExcellenceAwards = false;
      this.COVID19scholarships = false;
      this.COVID19studentsupport = false;
      this.MelbourneCity = false;
      this.HotcoursesFoundation = true; 
    }

  }
}
