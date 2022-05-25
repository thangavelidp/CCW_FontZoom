import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { HomeDetails } from 'src/app/models/home-page';
import { SharedService } from 'src/app/services/shared.service';
import { SiteService } from 'src/app/services/site.service';
import { take, map } from 'rxjs/operators';
import { SeoService } from 'src/app/services/seo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Response } from 'express'
import { RESPONSE } from '@nguniversal/express-engine/tokens'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  entryDetails: any;
  assetsDetails: {};
  routerSubscription: Subscription;
  querySubscription: Subscription;
  countryUrl:string;
  preview;
  articleType: String = "News"
  articleLimit = 6;
  articleCount = 6;
  articleSkip: number = 0;
  totalRecords: number = 0;
  pageName = 'Home Page'
  public homeDetails: HomeDetails = new HomeDetails();

  pageNotFound: boolean = false;
  private response: Response;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RESPONSE) response: any,
    @Inject(DOCUMENT) private document: Document,
    private siteService: SiteService,
    private sharedService: SharedService,
    private _SeoService: SeoService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { 
    this.document.body.classList.add('home');
  }

  ngOnInit(): void {
    this.routerSubscription = this.route.url.subscribe(() => {
   //   this.countryName = (this.route.snapshot.paramMap.get('country_name') != null) ? this.route.snapshot.paramMap.get('country_name') : "global";
      this.countryUrl = this.route.snapshot.paramMap.get("country_name") != null ? this.route.snapshot.paramMap.get("country_name") + "/" : "";
     
      
    });


    this.querySubscription = this.route.queryParamMap.subscribe(queryParams => {
      //let langCode = queryParams.get('edit');
      if (queryParams.get('preview')) {
        this.preview = true;
      }
    });


    this.getHomeData();
  }

  getHomeData() {
    this.siteService.getHome(this.preview).pipe(take(1)).subscribe(data => {
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
          } else {
            let win_href = this.router.url.split('?')[0];
            this._SeoService.setSeoUrl(win_href, this.preview, '');
          }

          this.sharedService.customDimensionValue = {"pageName": 'Home page', "event": 'pageview'}
          this.sharedService.customDimensionStatus.next(true);

          //  let metaDescription = ("metaDescription" in pageData[0].fields) ? pageData[0].fields.metaDescription : '';
          //  let metaKeywords = ("metaKeywords" in pageData[0].fields) ? pageData[0].fields.metaKeywords : '';
          //  let metaTitle = ("metaTitle" in pageData[0].fields) ? pageData[0].fields.metaTitle : '';
          let pageTitle = ("pageTitle" in pageData[0].fields) ? pageData[0].fields.pageTitle : '';
          //   let robots = ("robots" in pageData[0].fields) ? pageData[0].fields.robots : '';
          let shortDescription = ("shortDescription" in pageData[0].fields) ? pageData[0].fields.shortDescription : '';


          let banner = ("banner" in pageData[0].fields) ? pageData[0].fields.banner : {};
          let featurette = ("featurette" in pageData[0].fields) ? pageData[0].fields.featurette : [];
          let latestNews = ("latestNews" in pageData[0].fields) ? pageData[0].fields.latestNews : {};
          let ourStorySoFar = ("ourStorySoFar" in pageData[0].fields) ? pageData[0].fields.ourStorySoFar : {};
          let navigationPod = ("navigationPod" in pageData[0].fields) ? pageData[0].fields.navigationPod : [];
          let overview = ("overview" in pageData[0].fields) ? pageData[0].fields.overview : [];
          let relatedImages = ("relatedImages" in pageData[0].fields) ? pageData[0].fields.relatedImages : [];

          let bannerDetails, featuretteDetails = [], latestNewsDetails, ourStorySoFarDetails, navigationPodDetails = [], overviewDetails = [], relatedImagesDetails = [];

          if (!this.siteService.isObjectEmpty(banner)) {
            try {
              let bannerId = banner.sys.id;
              let bannerEntryDetails = this.entryDetails[bannerId];
              let bannerText = bannerEntryDetails.fields.staticTextName;
              let videoDetails;
              if("video" in bannerEntryDetails.fields){
                bannerDetails = this.sharedService.getVideoDetails(bannerEntryDetails,this.entryDetails, this.assetsDetails);
               bannerDetails["title"] = pageTitle;
               bannerDetails["shortDescription"] = shortDescription;
               
              }
              if("image" in bannerEntryDetails.fields){
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

          if (featurette.length > 0) {
            try {
              featuretteDetails = featurette.map(featurette => {
                let featuretteSysId = featurette.sys.id;
                let featuretteEntryDetails = this.entryDetails[featuretteSysId];

                return this.sharedService.getFeaturetteDetails(featuretteEntryDetails, this.entryDetails, this.assetsDetails)
              });
            } catch (error) {
              console.log("Error Handled");
            }
          }

          if (!this.siteService.isObjectEmpty(latestNews)) {
            try {
              let sectionTitleId = latestNews.sys.id;
              let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
              //  console.log("sectionTitleEntryDetails", sectionTitleEntryDetails);
              latestNewsDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)
             // console.log("this.pageSectionTitle", this.pageSectionTitle)
              // return imageCardContainerSectionTitleDetails
            }
            catch (err) {

            }
          }

          // if (!this.siteService.isObjectEmpty(latestNews)) {
          //   try {
          //     let latestNewsId = latestNews.sys.id;
          //     let latestNewsEntryDetails = this.entryDetails[latestNewsId];
          //     let latestNewsSectionTitle = ("sectionTitle" in latestNewsEntryDetails.fields) ? latestNewsEntryDetails.fields.sectionTitle:'';
          //     let latestNewsSectionIntro = ("sectionIntro" in latestNewsEntryDetails.fields) ? latestNewsEntryDetails.fields.sectionIntro:'';
          //     let ctaLabel = ("ctaLabel" in latestNewsEntryDetails.fields) ? latestNewsEntryDetails.fields.ctaLabel:'';
          //     let ctaUrl = ("ctaUrl" in latestNewsEntryDetails.fields) ? latestNewsEntryDetails.fields.ctaUrl:'';
          //     let ctaTarget = ("ctaTarget" in latestNewsEntryDetails.fields) ? latestNewsEntryDetails.fields.ctaTarget:'';

          //     latestNewsDetails = new SectionTitle(
          //       latestNewsSectionTitle,
          //       ctaLabel,
          //       ctaUrl,
          //       ctaTarget,

          //     )



          //   }
          //   catch (err) {

          //   }
          // }


          if (!this.siteService.isObjectEmpty(ourStorySoFar)) {
            try {
              let ourStorySoFarId = ourStorySoFar.sys.id;
              let ourStorySoFarEntryDetails = this.entryDetails[ourStorySoFarId];

              ourStorySoFarDetails = this.sharedService.getOurStoryDetails(ourStorySoFarEntryDetails, this.entryDetails, this.assetsDetails)
            }
            catch (err) {

            }
          }

          if (navigationPod.length > 0) {
            try {
              navigationPodDetails = navigationPod.map(overlayPod => {
                let overlayPodSysId = overlayPod.sys.id;
                let overlayPodEntryDetails = this.entryDetails[overlayPodSysId];
                return this.sharedService.getFeaturetteDetails(overlayPodEntryDetails, this.entryDetails, this.assetsDetails);
              });
            } catch (error) {
              console.log("Error Handled", error);
            }
          }

          if (overview.length > 0) {
            try {
              overviewDetails = overview.map(overview => {
                let overviewSysId = overview.sys.id;
                let overviewEntryDetails = this.entryDetails[overviewSysId];
                
                return this.sharedService.getFeaturetteDetails(overviewEntryDetails, this.entryDetails, this.assetsDetails)

              });
            } catch (error) {
              console.log("Error Handled");
            }
          }

          if (relatedImages.length > 0) {
            try {
              relatedImagesDetails = relatedImages.map(relatedImages => {
                let relatedImagesSysId = relatedImages.sys.id;
                let relatedImagesEntryDetails = this.entryDetails[relatedImagesSysId];
                if (relatedImagesEntryDetails.sys.contentType.sys.id === "ccwStaticText") {
                  return this.sharedService.getFeaturedImageDetails(relatedImagesSysId, relatedImagesEntryDetails, this.entryDetails, this.assetsDetails)
                }
              });
            } catch (error) {
              console.log("Error Handled");
            }
          }

          //added for to avoid argument error in homeDetails model
          let DynamicArticleDetails;
          //added for to avoid argument error in homeDetails model

          this.homeDetails = new HomeDetails(
            bannerDetails,
            featuretteDetails,
            latestNewsDetails,
            ourStorySoFarDetails,
            navigationPodDetails,
            overviewDetails,
            relatedImagesDetails,
            DynamicArticleDetails,
            
          )

           this.sharedService.getDynamiArticleDetails(this.preview, this.articleType, this.articleLimit, this.articleCount, this.articleSkip, this.homeDetails, this.totalRecords, this.entryDetails, this.assetsDetails)



        }
        else {
          this.router.navigate(['/pagenotfound']);
        }
      }
      catch (error) {
      }

    },
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
    }
    )
  }

}
