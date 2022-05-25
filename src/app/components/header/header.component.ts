import { Component, Inject, OnInit, Input, HostListener, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() headerMenu;
  public currentIndex = 0;
  @Input('story') year: number;
  @Input() active = false;
  selectedItem;
  currentItem;
  @Input() logo;
  @Input() socialMenu;
  schema = {}
  defaultImage = '/assets/img_px.gif';
  public toggleClass: boolean;
  menuTitle: string = '';
  isBrowser: boolean;
  dropdowns = {
    menuTitle: false
  }
  innerWidth: number;

  //font zoom
  maxFontSize=30;
  minFontSize=10;
  fontSizeX=14;

  //accessibility for color
  private body: HTMLElement;
  private demos: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth
    }
    this.body = document.body;
    this.demos = document.querySelectorAll('.classes_list a');
  }

  ngOnInit(): void {
    this.headerMenu.map(menu => {
      this.menuTitle = menu.title
      if (this.router.url == menu.url) {
        this.listClick(event, menu)
      }      
    })

    //accessibility menu for color
    this.headerMenu.push(
      {
        "title": "Accessibility",
        "url": "",
        "target": "_self",
        "childNavigation": [
          {
            "title": "GrayScale",
            "url": "",
            "target": "_self"
          },
          {
            "title": "Protanopia",
            "url": "#",
            "target": "_self"
          },
          {
            "title": "Protanomaly",
            "url": "#",
            "target": "_self"
          },
          {
            "title": "Deuteranopia",
            "url": "#",
            "target": "_self"
          },
          {
            "title": "Deuteranomaly",
            "url": "#",
            "target": "_self"
          },
          {
            "title": "Tritanopia",
            "url": "#",
            "target": "_self"
          },
          {
            "title": "Tritanomaly",
            "url": "#",
            "target": "_self"
          },
          {
            "title": "Achromatopsia",
            "url": "#",
            "target": "_self"
          },
          {
            "title": "Achromatomaly",
            "url": "#",
            "target": "_self"
          }
        ]
      }
    );

    //Org Schema
    this.schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "IDP Education",
      "url": "https://careers.idp.com",
      "logo": {
        "@type": "ImageObject",
        "url": "http://images.ctfassets.net/8bbwomjfix8m/642uXdFT31j1WCP1GfLn74/18bf4641e4cc7232aa8ed2fb592cf1d0/idp-logo.svg",
        "width": 243,
        "height": 58

        //Org Schema
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth;
    }
  }
  togg(name) {
    if (this.isBrowser) {
      if (this.innerWidth <= 767) {
        this.dropdowns[name] = !this.dropdowns[name];
      }
    }

  }
  clsMenu() {
    this.document.body.classList.remove('menu_open');
  }
  opnMenu() {
    this.document.body.classList.add('menu_open');
  }
  selectTab(index) {
    this.currentIndex = index;
  }

  listClick(event, newValue) {

    this.selectedItem = newValue;
    this.currentItem = this.document.body.classList;
    if (this.currentItem = "active") {

    };
  }

  //Font zoom function
	changeFontSize(isIncrement:boolean){
    let a = document.querySelectorAll( 'body > *' )[0];
    console.log(a.children)
   
      
    for (var i = 0; i < a.children.length; i++) {
    a.children[i].querySelectorAll('*').forEach((ele)=>{
      //  console.log(ele);
        console.log(ele,window.getComputedStyle(ele,null).getPropertyValue('font-size'));
         let fontSize = window.getComputedStyle(ele,null).getPropertyValue('font-size');
         fontSize.replace('px','');
         let fontSizeNumber = parseInt(fontSize);
         //for each
    if(fontSizeNumber >= this.maxFontSize)
    {
      console.log(">=30 condition-font-size",fontSizeNumber)
      fontSizeNumber = (isIncrement) ? fontSizeNumber : fontSizeNumber-1;
    }
    else if(fontSizeNumber<=this.minFontSize){
      fontSizeNumber = (isIncrement) ? fontSizeNumber+1 : fontSizeNumber;
    }
    else if(fontSizeNumber<=this.maxFontSize){
      console.log("<=30 condition-font-size",fontSizeNumber)
      fontSizeNumber = (isIncrement) ? fontSizeNumber+1 : fontSizeNumber-1;
    }
    else{
      fontSizeNumber = (isIncrement) ? fontSizeNumber+1 : fontSizeNumber-1;
    }
  
    
    console.log(ele);
    ele.setAttribute('style','font-size:'+fontSizeNumber+'px');
  
      });
    }
   }

   // Janet Color Blindness
  hasClass(el: any, cls: any) {
    return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
  }
  accessibilityList(event, headerMenu: any, buttonId: string, button: any) {
    
    if (headerMenu.title == 'Accessibility') {
      event.preventDefault();
      this.body = document.body;
      this.demos = document.querySelectorAll('.classes_list a');
      if (this.hasClass(this.body, buttonId)) {
        this.body.className = '';
        button.className = button.className.replace(' active ', '');
      } else {
        this.body.className = buttonId;
        this.deactiveAllButtons();
        button.className += ' active ';
      }
    }
  }
  deactiveAllButtons() {
    [].forEach.call(this.demos, function (button: any) {
      button.className = button.className.replace(' active ', '');
    });
  }

}
