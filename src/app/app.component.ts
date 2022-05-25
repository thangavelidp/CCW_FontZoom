import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { ChildNavigation } from './models/childNavigation';
import { Footer } from './models/footer';
import { Header } from './models/header';
import { Logo } from './models/logo';
import { Main } from './models/main';
import { Social } from './models/social';
import { SharedService } from './services/shared.service';
import { SiteService } from './services/site.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  entryDetails: any;
  assetsDetails: {};
  currentYear: Number;
  footerBottomNavigationDetails;
  activeButton;
  selectedItem: boolean = false;
  appMain: Main;
  headerScript;
  divID;
  siteNavigationDetails;
  innerWidth: number;
  
  @HostListener("window:resize", [])
  public onResize() {
    if (isPlatformBrowser) {
      this.innerWidth = window.innerWidth;
    }
  }

  constructor(private router: Router,
    private siteService: SiteService,
    private sharedService: SharedService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    let link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    this.document.head.appendChild(link);
    if (this.innerWidth > 901) {
      link.setAttribute('href', '/assets/css/desktop.css');
    }
    if (this.innerWidth > 601 || this.innerWidth < 900) {
      link.setAttribute('href', '/assets/css/ipad.css');
    }
    if (this.innerWidth < 600 ) {
      link.setAttribute('href', '/assets/css/mobile.css');
    }
  }
  ngOnInit() {
    this.getHeaderandFooterDetails()
  }

  showPhase(event) {
    this.activeButton = event;
  }

  getHeaderandFooterDetails() {
    this.siteService.getheaderandFooter('').pipe(take(1)).subscribe(data => {
      try {


        let headerData = data.items;
        this.currentYear = data.year

        if (headerData != null && headerData.length > 0) {

          if (data.includes['Entry'].length > 0) {
            this.entryDetails = this.siteService.formatData(data.includes.Entry)
          }
          if (data.includes['Asset'].length > 0) {
            this.assetsDetails = this.siteService.formatData(data.includes.Asset)
          }
        }
        let siteNavigation = ("siteNavigation" in headerData[0].fields) ? headerData[0].fields.siteNavigation : [];
        let footerBottomNavigation = ("footerBottomNavigation" in headerData[0].fields) ? headerData[0].fields.footerBottomNavigation : [];
        let headerLogo = ("headerLogo" in headerData[0].fields) ? headerData[0].fields.headerLogo : [];
        this.headerScript = ("header" in headerData[0].fields) ? headerData[0].fields.header : '';
        let social = ("social" in headerData[0].fields) ? headerData[0].fields.social : [];
        let headerLogoDetails, siteNavigationDetails, footerBottomNavigationDetails, socialDetails;
        let logoDetails = {}



        let headerScriptArray = this.headerScript.split(/(<script[^>]+?>|<script>|<\/script>)/img).filter(x => { return (x.trim() !== '' && x.trim() !== '<script>' && x.trim() !== '</script>'); })

        // if (isPlatformBrowser(this.platformId)) {
        if (headerScriptArray.length > 0) {
          headerScriptArray.map(header => {
            let script = this.document.createElement('script');
            script.innerHTML = header;
            this.document.head.appendChild(script);
          });
        }
        this.sharedService.customDimensionStatus.subscribe((data) => {
          if (data) {
            if (this.headerScript != '') {
              if (isPlatformBrowser(this.platformId) && Object.keys(this.sharedService.customDimensionValue).length > 0) {
                let customDimension = this.sharedService.customDimensionValue;
                let customDimensionScript = this.document.createElement('script');
                customDimensionScript.innerHTML = "window.dataLayer = window.dataLayer || [];window.dataLayer.push({'pagename': '" + customDimension['pageName'] + "','event':'pageview'});";
                this.document.head.appendChild(customDimensionScript);
              }
            }
          }
        })



        headerLogoDetails = headerLogo.map(logo => {
          let logoSysId = logo.sys.id;
          let logoEntryDetails = this.assetsDetails[logoSysId];

          let logoTitle = logoEntryDetails.fields.title;
          let logoURL = logoEntryDetails.fields.file.url;
          let logoWidth = logoEntryDetails.fields.file.details.image.width;
          let logoHeight = logoEntryDetails.fields.file.details.image.height;

          logoDetails = {}
          logoDetails["title"] = logoTitle;
          logoDetails["url"] = logoURL;
          logoDetails["width"] = logoWidth;
          logoDetails["height"] = logoHeight

          // return new Logo(
          //   logoTitle,
          //   logoURL,
          //   logoWidth,
          //   logoHeight
          // )

          //  return this.sharedService.getMediaDetails(logoEntryDetails, this.entryDetails, this.assetsDetails)

        })

        socialDetails = social.map(scl => {
          let sclSysId = scl.sys.id;
          let sclEntryDetails = this.entryDetails[sclSysId];

          let sclTitle = sclEntryDetails.fields.title;
          let sclURL = sclEntryDetails.fields.url;
          let sclTarget = ("target" in sclEntryDetails.fields) ? sclEntryDetails.fields.target : 'Open in same tab';
          if (sclTarget == 'Open in same tab') {
            sclTarget = '_self'
          } else {
            sclTarget = '_blank'
          }

          return new Social(sclTitle, sclURL, sclTarget)
        });

        siteNavigationDetails = siteNavigation.map((hmenu, index) => {
          let hmenuSysId = hmenu.sys.id;
          let hmenuEntryDetails = this.entryDetails[hmenuSysId];
          let headerTitle = ("title" in hmenuEntryDetails.fields) ? hmenuEntryDetails.fields.title : '';
          let headerUrl = ("url" in hmenuEntryDetails.fields) ? hmenuEntryDetails.fields.url : '';
          let headerTarget = ("target" in hmenuEntryDetails.fields) ? hmenuEntryDetails.fields.target : 'Open in same tab';
          if (headerTarget == 'Open in same tab') {
            headerTarget = '_self'
          } else {
            headerTarget = '_blank'
          }
          let headerChildNavigation = ("childNavigation" in hmenuEntryDetails.fields) ? hmenuEntryDetails.fields.childNavigation : [];
          let ChildNavDetails = headerChildNavigation.map(childNav => {
            let childNavSysId = childNav.sys.id;
            let childNavEntryDetails = this.entryDetails[childNavSysId];
            let childNavTitle = ("title" in childNavEntryDetails.fields) ? childNavEntryDetails.fields.title : '';
            let childNavUrl = ("url" in childNavEntryDetails.fields) ? childNavEntryDetails.fields.url : '';
            let childNavTarget = ("target" in childNavEntryDetails.fields) ? childNavEntryDetails.fields.target : 'Open in same tab';
            if (childNavTarget == 'Open in same tab') {
              childNavTarget = '_self'
            } else {
              childNavTarget = '_blank'
            }
            return new ChildNavigation(
              childNavTitle,
              childNavUrl,
              childNavTarget
            )

          })
          return new Header(
            headerTitle,
            headerUrl,
            headerTarget,
            ChildNavDetails
          )
        })

        footerBottomNavigationDetails = footerBottomNavigation.map(fmenu => {
          let fmenuSysId = fmenu.sys.id;
          let fmenuEntryDetails = this.entryDetails[fmenuSysId];
          let fmenuTitle = ("title" in fmenuEntryDetails.fields) ? fmenuEntryDetails.fields.title : '';
          let fmenuUrl = ("url" in fmenuEntryDetails.fields) ? fmenuEntryDetails.fields.url : '';
          let fmenuTarget = ("target" in fmenuEntryDetails.fields) ? fmenuEntryDetails.fields.target : 'Open in same tab';
          if (fmenuTarget == 'Open in same tab') {
            fmenuTarget = '_self'
          } else {
            fmenuTarget = '_blank'
          }
          if (fmenuTitle.includes('{}')) {
            fmenuTitle = fmenuTitle.replace("{}", this.currentYear)
          }

          return new Footer(
            fmenuTitle,
            fmenuUrl,
            fmenuTarget
          )

        })

        this.appMain = new Main(
          siteNavigationDetails,
          footerBottomNavigationDetails,
          logoDetails,
          socialDetails
        )
      } catch (error) {

      }
    })
	}
	

}