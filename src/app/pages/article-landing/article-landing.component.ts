import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ArticleLandingDetails } from 'src/app/models/article-landing';
import { SeoService } from 'src/app/services/seo-service';
import { SharedService } from 'src/app/services/shared.service';
import { SiteService } from 'src/app/services/site.service';

import { Response } from 'express'
import { RESPONSE } from '@nguniversal/express-engine/tokens'

@Component({
  selector: 'app-article-landing',
  templateUrl: './article-landing.component.html',
  styleUrls: ['./article-landing.component.css']
})
export class ArticleLandingComponent implements OnInit {
  preview;
  topicParam;
  articleLandingDetails: ArticleLandingDetails = new ArticleLandingDetails();
  entryDetails;
  assetsDetails;
  pageSectionTitle;
  articleLimit = 9;
  articleCount = 9;
  articleSkip = 0;
  articleType: String = "News"
  totalRecords;
  isBrowser: boolean;
  innerWidth: number;
  pageLongDescription;
  pageName = 'Article Landing Page'
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth;
      
    }
  }
  pageNotFound: boolean = false;
  private response: Response;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RESPONSE) response: any,
    @Inject(DOCUMENT) private document: Document,
    private siteService: SiteService,
    private sharedService: SharedService,
    private _SeoService: SeoService,
    private router: Router
  ) { 
    this.document.body.classList.add('article-landing')
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth
    }

    if(this.innerWidth < 767){
      this.articleCount = 3;
      this.articleLimit = 3
    }
    
  }

  ngOnInit(): void {
    this.totalRecords = this.sharedService.dynamicArticleTotalRecords
    this.getArticleLandingData();
    this.getArticleCount()
 
    
  }


  getArticleCount(){
    this.siteService.getDynamicArticle(this.preview, this.articleType, this.articleLimit, this.articleCount,  this.articleSkip).pipe(take(1)).subscribe(
      data => {
      try {
        return this.totalRecords = data.total;
      }
      catch(error){
      }
    }
    )
  }



  getPageNumber(page) {
    if (page > 1) {
      let pageno = page - 1;
      this.articleSkip = pageno
    }
    else {
      this.articleSkip = 0
    }
    this.sharedService.getDynamiArticleDetails(this.preview, this.articleType, this.articleLimit, this.articleCount, this.articleSkip, this.articleLandingDetails, this.totalRecords, this.entryDetails, this.assetsDetails)
    let showmore;
    showmore = document.getElementById("articleLanding");
    showmore.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getArticleLandingData() {
    this.siteService.getArticleLanding(this.preview, this.topicParam).pipe(take(1)).subscribe(data => {
      try {
        let pageData = data.items;

        if (pageData != null && pageData.length > 0) {

          if (data.includes['Entry'].length > 0) {
            this.entryDetails = this.siteService.formatData(data.includes.Entry)
          }
          if (data.includes['Asset'].length > 0) {
            this.assetsDetails = this.siteService.formatData(data.includes.Asset)
          }
          this._SeoService.setSeoTitle(pageData);
          this._SeoService.addSeoTags(pageData, this.preview,);
          if ('canonical' in pageData[0].fields) {
            this._SeoService.setSeoCanonical(pageData, this.preview);
          }
          else {
            let win_href = this.router.url.split('?')[0];
            let newUrl = this._SeoService.setSeoUrl(win_href, this.preview, '');

          }

           //Custom Dimention
           this.sharedService.customDimensionValue = {"pageName": 'Article Landing', "event": 'pageview'}
           this.sharedService.customDimensionStatus.next(true);
           //Custom Dimention

          let pageTitle = ("pageTitle" in pageData[0].fields) ? pageData[0].fields.pageTitle : '';
          //   let robots = ("robots" in pageData[0].fields) ? pageData[0].fields.robots : '';
          let shortDescription = ("shortDescription" in pageData[0].fields) ? pageData[0].fields.shortDescription : '';
          this.pageLongDescription = ("longDescription" in pageData[0].fields) ? pageData[0].fields.longDescription : '';
          let pageSectionTitle = ("pageSectionTitle" in pageData[0].fields) ? pageData[0].fields.pageSectionTitle : {};
          let breadcrumb = ("breadcrumb" in pageData[0].fields) ? pageData[0].fields.breadcrumb : {};

          let breadcrumbDetails;
          let banner = ("banner" in pageData[0].fields) ? pageData[0].fields.banner : {};

          if (!this.siteService.isObjectEmpty(pageSectionTitle)) {
            try {
              let sectionTitleId = pageSectionTitle.sys.id;
              let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
              this.pageSectionTitle = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)
              // return imageCardContainerSectionTitleDetails
            }
            catch (err) {

            }
          }

          let bannerDetails;

          if (!this.siteService.isObjectEmpty(banner)) {
            try {
              let bannerId = banner.sys.id;
              let bannerEntryDetails = this.entryDetails[bannerId];

              let bannerText = bannerEntryDetails.fields.staticTextName;
              let videoDetails;
              if ("video" in bannerEntryDetails.fields) {
                bannerDetails = this.sharedService.getVideoDetails(bannerEntryDetails, this.entryDetails, this.assetsDetails);
                bannerDetails["title"] = pageTitle;
                bannerDetails["shortDescription"] = shortDescription;

              }
              if ("image" in bannerEntryDetails.fields) {
                if (bannerEntryDetails.sys.contentType.sys.id === "ccwStaticText") {
                  bannerDetails = {}
                  bannerDetails = this.sharedService.getFeaturedImageDetails(bannerId, bannerEntryDetails, this.entryDetails, this.assetsDetails)
                  if (!this.siteService.isObjectEmpty(bannerDetails)) {
                    bannerDetails["title"] = pageTitle;
                    bannerDetails["shortDescription"] = shortDescription;
                  }

                }
              }

            }
            catch (err) {

            }
          }

          if (!this.siteService.isObjectEmpty(breadcrumb)) {
            try {
              let bcId = breadcrumb.sys.id;
              let bcEntryDetails = this.entryDetails[bcId];

              breadcrumbDetails = this.sharedService.getBreadCrumb(bcEntryDetails, this.entryDetails, this.assetsDetails)
              
            }
            catch (err) {

            }
          }

          let dynamicArticleDetails;




          this.articleLandingDetails = new ArticleLandingDetails(
            bannerDetails,
            dynamicArticleDetails,
            breadcrumbDetails
          );
          this.sharedService.getDynamiArticleDetails(this.preview, this.articleType, this.articleLimit, this.articleCount, this.articleSkip, this.articleLandingDetails, this.totalRecords, this.entryDetails, this.assetsDetails)

        }
      }
      catch (error) {
      }
    }
    ,
      error => {
      this.document.body.classList.add('error-page');
      this.pageNotFound = true;
      if (!isPlatformBrowser(this.platformId)) {
        this.response.status(404);
      }
      let nonFoundPageData = [{
        "fields": {
          "metaTitle": "404 - Page Not Found",
          // "metaDescription"	:	"Not Found",
          // "metaKeywords"	:	"notFound",
          "robots": "noindex,follow"
        }
      }];
      this._SeoService.setSeoTitle(nonFoundPageData);
      this._SeoService.setSeoRobots(nonFoundPageData);
    //  this.router.navigateByUrl('/pagenotfound');
    });
  }




}
