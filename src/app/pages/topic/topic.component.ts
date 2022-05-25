import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { Location } from '@angular/common';
import { StaticMap, StaticMapTab } from 'src/app/models/static-map';
import { Response } from 'express'
import { RESPONSE } from '@nguniversal/express-engine/tokens'
import { TopicDetails } from 'src/app/models/topic-page';
import { SeoService } from 'src/app/services/seo-service';
import { SharedService } from 'src/app/services/shared.service';
import { SiteService } from 'src/app/services/site.service';
import { BreadCrumb } from 'src/app/models/breadcrumb';
import { Usp } from 'src/app/models/usp';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  entryDetails: any;
  assetsDetails: {};
  routerSubscription: Subscription;
  querySubscription: Subscription;
  countryUrl: string;
  topicDetails: TopicDetails = new TopicDetails()
  topicParam;
  imageCardType: string = '';
  private response: Response;
  pageNotFound: boolean = false;
  preview;
  showComp: boolean = false;
  hideNav = true;
  hideImgCard = true;
  navigationPodType;
  pageSectionTitle: any;
  pageLongDescription: string = '';
  additionalSectionTitle: any;
  directorValue: any;
  articleSkip: number = 0;
  totalRecords: number = 0;
  articleType: String = "Blogs"
  articleLimit = 6;
  articleCount = 6;
  isBrowser: boolean;
  innerWidth: number;
  mobilePodType: String = ''
  urlValue;
  tabsType;
  paragraphType = 'Legal notices'
  peopleCard: boolean = false;
  pageName = 'Topic Page'
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth;
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private siteService: SiteService,
    private sharedService: SharedService,
    private _SeoService: SeoService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RESPONSE) response: any,
    private location: Location,

  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.innerWidth = window.innerWidth
    }

    if (this.innerWidth < 767) {
      this.articleCount = 3;
      this.articleLimit = 3
    }
  }

  ngOnInit(): void {
    this.routerSubscription = this.route.url.subscribe(() => {
      //   this.countryName = (this.route.snapshot.paramMap.get('country_name') != null) ? this.route.snapshot.paramMap.get('country_name') : "global";
      this.countryUrl = this.route.snapshot.paramMap.get("country_name") != null ? this.route.snapshot.paramMap.get("country_name") + "/" : "";
      this.topicParam = (this.route.snapshot.paramMap.get('topic_param') != null) ? this.route.snapshot.paramMap.get('topic_param') : "";
    });

    this.urlValue = this.route.snapshot.paramMap.get('id');
    if (this.urlValue == 'get-to-know-them') {
      this.topicParam = 'who-we-are/' + this.topicParam;
      this.document.body.classList.add('directors')
      this.mobilePodType = "showMobilePod"
    }

    this.querySubscription = this.route.queryParamMap.subscribe(queryParams => {
      //let langCode = queryParams.get('edit');
      if (queryParams.get('preview')) {
        this.preview = true;
      }
    });

    this.getTopicData();
    this.getArticleCount()



  }
  getURLParam(index) {
    this.mobilePodType = "showMobilePod"
    this.location.replaceState(this.topicParam + '/get-to-know-them');
    this.directorValue = this.route.snapshot.paramMap.get('id');

  }

  getArticleCount() {
    this.siteService.getDynamicArticle(this.preview, this.articleType, this.articleLimit, this.articleCount, this.articleSkip).pipe(take(1)).subscribe(
      data => {
        try {
          return this.totalRecords = data.total;
        }
        catch (error) {

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
    this.sharedService.getDynamiArticleDetails(this.preview, this.articleType, this.articleLimit, this.articleCount, this.articleSkip, this.topicDetails, this.totalRecords, this.entryDetails, this.assetsDetails)
    let showmore;
    showmore = document.getElementById("articleLanding");
    showmore.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  getTopicData() {
    this.siteService.getTopic(this.preview, this.topicParam).pipe(take(1)).subscribe(
      data => {
        try {
          let pageData = data.items;

          const statusCode = data.status_code;
                    if (statusCode == 200) {
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
              this.sharedService.customDimensionValue = {"pageName": 'Topic page', "event": 'pageview'}
              this.sharedService.customDimensionStatus.next(true);
              //Custom Dimention

              let pageTitle = ("pageTitle" in pageData[0].fields) ? pageData[0].fields.pageTitle : '';
              //   let robots = ("robots" in pageData[0].fields) ? pageData[0].fields.robots : '';
              let shortDescription = ("shortDescription" in pageData[0].fields) ? pageData[0].fields.shortDescription : '';
              this.pageLongDescription = ("longDescription" in pageData[0].fields) ? pageData[0].fields.longDescription : '';


              let banner = ("banner" in pageData[0].fields) ? pageData[0].fields.banner : {};
              let breadcrumb = ("breadcrumb" in pageData[0].fields) ? pageData[0].fields.breadcrumb : {};

              let imageCardContainer = ("imageCardContainer" in pageData[0].fields) ? pageData[0].fields.imageCardContainer : [];
              let imageCardSectionTitle = ("imageCardSectionTitle" in pageData[0].fields) ? pageData[0].fields.imageCardSectionTitle : {};
              let relatedVideoSectionTitle = ("relatedVideoSectionTitle" in pageData[0].fields) ? pageData[0].fields.relatedVideoSectionTitle : {};
              let newsAndArticlesSectionTitle = ("newsAndArticlesSectionTitle" in pageData[0].fields) ? pageData[0].fields.newsAndArticlesSectionTitle : {};
              let uspSectionTitle = ("uspSectionTitle" in pageData[0].fields) ? pageData[0].fields.uspSectionTitle : {};
              let additionalSectionTitle = ("additionalSectionTitle" in pageData[0].fields) ? pageData[0].fields.additionalSectionTitle : {};
              let ourStorySoFar = ("ourStorySoFar" in pageData[0].fields) ? pageData[0].fields.ourStorySoFar : {};
              let navigationPod = ("navigationPod" in pageData[0].fields) ? pageData[0].fields.navigationPod : [];
              let usp = ("usp" in pageData[0].fields) ? pageData[0].fields.usp : [];
              let overview = ("overview" in pageData[0].fields) ? pageData[0].fields.overview : [];
              let relatedImages = ("relatedImages" in pageData[0].fields) ? pageData[0].fields.relatedImages : [];
              let relatedImagesSectionTitle = ("relatedImagesSectionTitle" in pageData[0].fields) ? pageData[0].fields.relatedImagesSectionTitle : {};
              let testimonialSectionTitle = ("testimonialSectionTitle" in pageData[0].fields) ? pageData[0].fields.testimonialSectionTitle : {};
              let relatedPagesSectionTitle = ("relatedPagesSectionTitle" in pageData[0].fields) ? pageData[0].fields.relatedPagesSectionTitle : {};
              let featurette = ("featurette" in pageData[0].fields) ? pageData[0].fields.featurette : [];
              let relatedVideos = ("relatedVideos" in pageData[0].fields) ? pageData[0].fields.relatedVideos : [];
              let relatedPages = ("relatedPages" in pageData[0].fields) ? pageData[0].fields.relatedPages : [];
              let testimonials = ("testimonials" in pageData[0].fields) ? pageData[0].fields.testimonials : [];
              let paragraph = ("additionalParagraphs" in pageData[0].fields) ? pageData[0].fields.additionalParagraphs : [];
              let urlSlug = ("urlSlug" in pageData[0].fields) ? pageData[0].fields.urlSlug : '';
              let ourOfficesMap = ("ourOfficesMap" in pageData[0].fields) ? pageData[0].fields.ourOfficesMap : {};
              this.imageCardType = ("imageCardType" in pageData[0].fields) ? pageData[0].fields.imageCardType : '';
              let pageSectionTitle = ("pageSectionTitle" in pageData[0].fields) ? pageData[0].fields.pageSectionTitle : {};
              let featuretteSectionTitle = ("featuretteSectionTitle" in pageData[0].fields) ? pageData[0].fields.featuretteSectionTitle : {};
              if (urlSlug != '') {
                let className = urlSlug.split('/');
                className = className[2]
                this.document.body.classList.add(className);
              }
              if (this.imageCardType == 'Our Board of Directors') {
                //  this.showComp = true;
                this.hideNav = false
              }

              if (this.imageCardType == 'Our leaders' || this.imageCardType == 'What it means to work in IDP') {
                this.showComp = true;
                this.hideImgCard = false
              }
              if (this.imageCardType == 'Our people' || this.imageCardType == "Our Commitment") {
                this.hideImgCard = false
              }
              if (this.imageCardType == 'Empowering communities' || this.imageCardType == 'Diversity,inclusion and belonging') {
                this.hideImgCard = false;
                this.peopleCard = true
              }

              //  this.imageCardType = ("imageCardType" in pageData[0].fields) ? pageData[0].fields.imageCardType : '';

              let bannerDetails, imageCardContainerDetails = [], imageCardContainerSectionTitleDetails, ourStorySoFarDetails, relatedImagesDetails = [], relatedImagesSectionTitleDetails, overviewDetails = [], featuretteDetails = [], navigationPodDetails = [], relatedVideosDetails = [], relatedImagesTitleDetails, relatedVideoTitleDetails, newsAndArticlesSectionTitleDetails, testimonialsDetails = [], testimonialSectionTitleDetails, relatedPagesDetails = [], relatedPagesTitleDetails, staticMapDetails, breadcrumbDetails, additionalParagraphDetails = [], uspSectionTitleDetails, uspDetails = [], featuretteSectionTitleDetails;



              if (!this.siteService.isObjectEmpty(imageCardSectionTitle)) {
                try {
                  let sectionTitleId = imageCardSectionTitle.sys.id;
                  let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
                  imageCardContainerSectionTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)
                  // return imageCardContainerSectionTitleDetails
                }
                catch (err) {

                }
              }
              if (!this.siteService.isObjectEmpty(featuretteSectionTitle)) {
                try {
                  let sectionTitleId = featuretteSectionTitle.sys.id;
                  let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
                  featuretteSectionTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)
                  // return imageCardContainerSectionTitleDetails
                }
                catch (err) {

                }
              }
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

              if (!this.siteService.isObjectEmpty(additionalSectionTitle)) {
                try {
                  let sectionTitleId = additionalSectionTitle.sys.id;
                  let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
                  this.additionalSectionTitle = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)
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
              if (!this.siteService.isObjectEmpty(relatedPagesSectionTitle)) {
                try {
                  let sectionTitleId = relatedPagesSectionTitle.sys.id;
                  let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
                  relatedPagesTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)

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

              if (!this.siteService.isObjectEmpty(uspSectionTitle)) {
                try {
                  let sectionTitleId = uspSectionTitle.sys.id;
                  let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
                  uspSectionTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)

                  // return imageCardContainerSectionTitleDetails
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

              if (!this.siteService.isObjectEmpty(ourOfficesMap)) {
                try {
                  let mapSysId = ourOfficesMap.sys.id;
                  let mapEntryDetails = this.entryDetails[mapSysId];
                  let mapTitle = mapEntryDetails.fields.title;
                  let mapShortDescription = mapEntryDetails.fields.shortDescription;
                  let mapDetails = ("multipleStaticText" in mapEntryDetails.fields) ? mapEntryDetails.fields.multipleStaticText : [];
                  let mapTabDetails;
                  mapTabDetails = mapDetails.map(map => {
                    let mapTabSysId = map.sys.id;
                    let mapTabEntryDetails = this.entryDetails[mapTabSysId];
                    let mapTabTitle = mapTabEntryDetails.fields.title;
                    let mapTabShortDescription = mapTabEntryDetails.fields.shortDescription;
                    let mapTabImageDetails;
                    let imageSysId = mapTabEntryDetails.fields.image.sys.id;
                    let imageAssestDetails = this.assetsDetails[imageSysId]
                    if (mapTabEntryDetails.fields.image != undefined) {
                      mapTabImageDetails = this.sharedService.getMediaDetails(imageSysId, '', imageAssestDetails, this.entryDetails, this.assetsDetails);

                    }

                    return new StaticMapTab(
                      mapTabTitle,
                      mapTabImageDetails
                    )
                  })
                  staticMapDetails = new StaticMap(
                    mapTitle,
                    mapShortDescription,
                    mapTabDetails
                  )

                } catch (error) {

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


              if (paragraph.length > 0) {
                try {
                  //               let i = 1;
                  additionalParagraphDetails = paragraph.map(paragraph => {
                    let paragraphSysId = paragraph.sys.id;
                    let paragraphEntryDetails = this.entryDetails[paragraphSysId];
                    let singleParagraph = this.sharedService.getParagraphDetails(paragraphSysId, paragraphEntryDetails, this.entryDetails, this.assetsDetails);
                    return singleParagraph;
                  })
                } catch (error) {
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


              if (usp.length > 0) {
                try {
                  uspDetails = usp.map(usp => {
                    let uspSysId = usp.sys.id;
                    let uspEntryDetails = this.entryDetails[uspSysId];
                    const shortDescription = ("shortDescription" in uspEntryDetails.fields) ? uspEntryDetails.fields.shortDescription : '';
                    const uspSubtitle = ("uspSubtitle" in uspEntryDetails.fields) ? uspEntryDetails.fields.uspSubtitle : '';
                    const uspTitle = ("uspTitle" in uspEntryDetails.fields) ? uspEntryDetails.fields.uspTitle : '';

                    return new Usp(
                      uspTitle,
                      uspSubtitle,
                      shortDescription
                    )
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



              if (relatedPages.length > 0) {
                try {
                  relatedPagesDetails = relatedPages.map(rvideo => {
                    let rpagesSysId = rvideo.sys.id;
                    let rpagesEntryDetails = this.entryDetails[rpagesSysId];
                    return this.sharedService.getRelatedPages(rpagesEntryDetails, this.entryDetails, this.assetsDetails)


                  });
                } catch (error) {
                  console.log("Error Handled");
                }
              }

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
              let latestNewsDetails;

              this.topicDetails = new TopicDetails(
                bannerDetails,
                additionalParagraphDetails,
                featuretteDetails,
                latestNewsDetails,
                ourStorySoFarDetails,
                navigationPodDetails,
                overviewDetails,
                relatedImagesDetails,
                imageCardContainerDetails,
                imageCardContainerSectionTitleDetails,
                relatedImagesTitleDetails,
                relatedPagesTitleDetails,
                newsAndArticlesSectionTitleDetails,
                testimonialSectionTitleDetails,
                relatedPagesDetails,
                testimonialsDetails,
                staticMapDetails,
                breadcrumbDetails,
                uspSectionTitleDetails,
                uspDetails,
                featuretteSectionTitleDetails
              )
              this.sharedService.getDynamiArticleDetails(this.preview, this.articleType, this.articleLimit, this.articleCount, this.articleSkip, this.topicDetails, this.totalRecords, this.entryDetails, this.assetsDetails)


            }
            else {
              this.router.navigate(['/pagenotfound']);
            }
          }
          else {
            this.router.navigateByUrl('/pagenotfound');
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
