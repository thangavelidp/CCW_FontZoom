import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { HubDetails } from 'src/app/models/hub-page';
import { SeoService } from 'src/app/services/seo-service';
import { SharedService } from 'src/app/services/shared.service';
import { SiteService } from 'src/app/services/site.service';
import { Response } from 'express'
import { RESPONSE } from '@nguniversal/express-engine/tokens'

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  entryDetails: any;
  assetsDetails: {};
  routerSubscription: Subscription;
  querySubscription: Subscription;
  countryUrl: string;
  hubDetails: HubDetails = new HubDetails()
  hub_param;
  imageCardType: string = '';
  preview;
  articleType: String = "News"
  articleLimit = 6;
  articleCount = 6;
  articleSkip: number = 0;
  totalRecords: number = 0;
  pageNotFound: boolean = false;
  private response: Response;
  pageName = 'Hub Page'
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RESPONSE) response: any,
    @Inject(DOCUMENT) private document: Document,
    private siteService: SiteService,
    private sharedService: SharedService,
    private _SeoService: SeoService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.route.url.subscribe(() => {
      //   this.countryName = (this.route.snapshot.paramMap.get('country_name') != null) ? this.route.snapshot.paramMap.get('country_name') : "global";
      this.countryUrl = this.route.snapshot.paramMap.get("country_name") != null ? this.route.snapshot.paramMap.get("country_name") + "/" : "";
      this.hub_param = (this.route.snapshot.paramMap.get('hub_param') != null) ? this.route.snapshot.paramMap.get('hub_param') : "";

    });

    this.querySubscription = this.route.queryParamMap.subscribe(queryParams => {
      //let langCode = queryParams.get('edit');
      if (queryParams.get('preview')) {
        this.preview = true;
      }
    });
    this.getHubData()
    
  }
 

  getHubData() {
    this.siteService.getHub(this.preview, this.hub_param).pipe(take(1)).subscribe(data => {
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

          this.sharedService.customDimensionValue = {"pageName": 'Hub page', "event": 'pageview'}
          this.sharedService.customDimensionStatus.next(true);

          let pageTitle = ("pageTitle" in pageData[0].fields) ? pageData[0].fields.pageTitle : '';
          //   let robots = ("robots" in pageData[0].fields) ? pageData[0].fields.robots : '';
          let shortDescription = ("shortDescription" in pageData[0].fields) ? pageData[0].fields.shortDescription : '';


          let banner = ("banner" in pageData[0].fields) ? pageData[0].fields.banner : {};

          let imageCardContainer = ("imageCardContainer" in pageData[0].fields) ? pageData[0].fields.imageCardContainer : [];
          let imageCardContainerSectionTitle = ("imageCardContainerSectionTitle" in pageData[0].fields) ? pageData[0].fields.imageCardContainerSectionTitle : {};
          let relatedVideoSectionTitle = ("relatedVideoSectionTitle" in pageData[0].fields) ? pageData[0].fields.relatedVideoSectionTitle : {};
          let newsAndArticlesSectionTitle = ("newsAndArticlesSectionTitle" in pageData[0].fields) ? pageData[0].fields.newsAndArticlesSectionTitle : {};
          let ourStorySoFar = ("ourStorySoFar" in pageData[0].fields) ? pageData[0].fields.ourStorySoFar : {};
          let navigationPod = ("navigationPod" in pageData[0].fields) ? pageData[0].fields.navigationPod : [];
          let overview = ("overview" in pageData[0].fields) ? pageData[0].fields.overview : [];
          let relatedImages = ("relatedImages" in pageData[0].fields) ? pageData[0].fields.relatedImages : [];
          let relatedImagesSectionTitle = ("relatedImagesSectionTitle" in pageData[0].fields) ? pageData[0].fields.relatedImagesSectionTitle : {};
          let testimonialSectionTitle = ("testimonialSectionTitle" in pageData[0].fields) ? pageData[0].fields.testimonialSectionTitle : {};
          let featurette = ("featurette" in pageData[0].fields) ? pageData[0].fields.featurette : [];
          let relatedVideos = ("relatedVideos" in pageData[0].fields) ? pageData[0].fields.relatedVideos : [];
          let testimonials = ("testimonials" in pageData[0].fields) ? pageData[0].fields.testimonials : [];
          let breadcrumb = ("breadcrumb" in pageData[0].fields) ? pageData[0].fields.breadcrumb : [];
          let urlSlug = ("urlSlug" in pageData[0].fields) ? pageData[0].fields.urlSlug : '';
          let latestNews = ("latestNews" in pageData[0].fields) ? pageData[0].fields.latestNews : {};
          if (urlSlug != '') {
            let className = urlSlug.replace('/', '')
            this.document.body.classList.add(className);
          }

          this.imageCardType = ("imageCardType" in pageData[0].fields) ? pageData[0].fields.imageCardType : '';

          let bannerDetails, imageCardContainerDetails = [], imageCardContainerSectionTitleDetails, ourStorySoFarDetails, relatedImagesDetails = [], relatedImagesSectionTitleDetails, overviewDetails = [], featuretteDetails = [], navigationPodDetails = [], relatedVideosDetails = [], relatedImagesTitleDetails, relatedVideoTitleDetails, newsAndArticlesSectionTitleDetails, testimonialsDetails = [], testimonialSectionTitleDetails, breadcrumbDetails = [], latestNewsDetails;



          if (!this.siteService.isObjectEmpty(imageCardContainerSectionTitle)) {
            try {
              let sectionTitleId = imageCardContainerSectionTitle.sys.id;
              let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
              imageCardContainerSectionTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)

              // return imageCardContainerSectionTitleDetails
            }
            catch (err) {

            }
          }
          if (!this.siteService.isObjectEmpty(relatedImagesSectionTitle)) {
            try {
              let sectionTitleId = relatedImagesSectionTitle.sys.id;
              let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
              relatedImagesTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)

              // return imageCardContainerSectionTitleDetails
            }
            catch (err) {

            }
          }
          if (!this.siteService.isObjectEmpty(latestNews)) {
            try {
              let sectionTitleId = latestNews.sys.id;
              let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
              latestNewsDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)
              // return imageCardContainerSectionTitleDetails
            }
            catch (err) {

            }
          }
          if (!this.siteService.isObjectEmpty(relatedVideoSectionTitle)) {
            try {
              let sectionTitleId = relatedVideoSectionTitle.sys.id;
              let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
              relatedVideoTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)

              // return imageCardContainerSectionTitleDetails
            }
            catch (err) {

            }
          }

          if (!this.siteService.isObjectEmpty(newsAndArticlesSectionTitle)) {
            try {
              let sectionTitleId = newsAndArticlesSectionTitle.sys.id;
              let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
              newsAndArticlesSectionTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)

              // return imageCardContainerSectionTitleDetails
            }
            catch (err) {

            }
          }

          if (!this.siteService.isObjectEmpty(testimonialSectionTitle)) {
            try {
              let sectionTitleId = testimonialSectionTitle.sys.id;
              let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
              testimonialSectionTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)

              // return imageCardContainerSectionTitleDetails
            }
            catch (err) {

            }
          }
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
          
          if (imageCardContainer.length > 0) {
            try {
              imageCardContainerDetails = imageCardContainer.map(imgCard => {
                
                let imgCardSysId = imgCard.sys.id;
                let imgCardEntryDetails = this.entryDetails[imgCardSysId];
                
                return this.sharedService.getImageCard(imgCardEntryDetails, this.entryDetails, this.assetsDetails)
              });
            } catch (error) {
              console.log("Error Handled");
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


          if (!this.siteService.isObjectEmpty(ourStorySoFar)) {
            try {
              let ourStorySoFarId = ourStorySoFar.sys.id;
              let ourStorySoFarEntryDetails = this.entryDetails[ourStorySoFarId];

              ourStorySoFarDetails = this.sharedService.getOurStoryDetails(ourStorySoFarEntryDetails, this.entryDetails, this.assetsDetails)
            }
            catch (err) {

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



          if (relatedVideos.length > 0) {
            try {
              relatedVideosDetails = relatedVideos.map(rvideo => {
                let rvideoSysId = rvideo.sys.id;
                let rvideoEntryDetails = this.entryDetails[rvideoSysId];
               return this.sharedService.getRelatedVideos(rvideoEntryDetails, this.entryDetails, this.assetsDetails)
              });
            } catch (error) {
              console.log("Error Handled");
            }
          }

          // if (relatedVideos.length > 0) {
          //   try {
          //     relatedVideosDetails = relatedVideos.map(rvideo => {
          //       let rpagesSysId = rvideo.sys.id;
          //       let rpagesEntryDetails = this.entryDetails[rpagesSysId];
          //       return this.sharedService.getRelatedPages(rpagesEntryDetails, this.entryDetails, this.assetsDetails)


          //     });
          //   } catch (error) {
          //     console.log("Error Handled");
          //   }
          // }

          if (testimonials.length > 0) {
            try {
              testimonialsDetails = testimonials.map(tstm => {
                let testimonialsSysId = tstm.sys.id;
                let testimonialsEntryDetails = this.entryDetails[testimonialsSysId];
                  return this.sharedService.getTestimonial(testimonialsEntryDetails, this.entryDetails, this.assetsDetails)

              });
            } catch (error) {
              console.log("Error Handled");
            }
          }


          this.hubDetails = new HubDetails(
            bannerDetails,
            featuretteDetails,
            latestNewsDetails,
            ourStorySoFarDetails,
            navigationPodDetails,
            overviewDetails,
            relatedImagesDetails,
            imageCardContainerDetails,
            imageCardContainerSectionTitleDetails,
            relatedImagesTitleDetails,
            relatedVideoTitleDetails,
            newsAndArticlesSectionTitleDetails,
            testimonialSectionTitleDetails,
            relatedVideosDetails,
            testimonialsDetails,
            breadcrumbDetails
          )
          this.sharedService.getDynamiArticleDetails(this.preview, this.articleType, this.articleLimit, this.articleCount, this.articleSkip, this.hubDetails, this.totalRecords, this.entryDetails, this.assetsDetails)
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
    );
  }

}
