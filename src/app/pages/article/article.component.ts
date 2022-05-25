import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ArticleDetails } from 'src/app/models/article-page';
import { AuthorDetails } from 'src/app/models/author-details';

import { SeoService } from 'src/app/services/seo-service';
import { SharedService } from 'src/app/services/shared.service';
import { SiteService } from 'src/app/services/site.service';

import { Response } from 'express'
import { RESPONSE } from '@nguniversal/express-engine/tokens'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  entryDetails: any;
  assetsDetails: {};
  routerSubscription: Subscription;
  querySubscription: Subscription;
  countryUrl: string;
  articleDetails: ArticleDetails = new ArticleDetails()
  article_param;
  preview;
  articlePageTitle: any;
  articleType;
  relatedArticleType;
  articleLimit = 3;
  articleCount = 3;
  articleSkip: number = 0;
  totalRecords: number = 0;
  pageNotFound: boolean = false;
  private response: Response;
  pageName = 'Article Page'
  schema = {};
  schemaShow:boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RESPONSE) response: any,
    @Inject(DOCUMENT) private document: Document,
    private siteService: SiteService,
    private sharedService: SharedService,
    private _SeoService: SeoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.route.url.subscribe(() => {
      //   this.countryName = (this.route.snapshot.paramMap.get('country_name') != null) ? this.route.snapshot.paramMap.get('country_name') : "global";
      this.countryUrl = this.route.snapshot.paramMap.get("country_name") != null ? this.route.snapshot.paramMap.get("country_name") + "/" : "";
      this.article_param = (this.route.snapshot.paramMap.get('article_param') != null) ? this.route.snapshot.paramMap.get('article_param') : "";

    });


    this.querySubscription = this.route.queryParamMap.subscribe(queryParams => {
      //let langCode = queryParams.get('edit');
      if (queryParams.get('preview')) {
        this.preview = true;
      }
    });
    this.getArticleData()



  }

  async getArticleData() {
    await this.siteService.getArticle(this.preview, this.article_param).pipe(take(1)).subscribe(
      async data => {
        try {
          let pageData = data.items;
          if (pageData != null && pageData.length > 0) {
            if (data.includes['Entry'].length > 0) {
              this.entryDetails = this.siteService.formatData(data.includes.Entry)
            }
            if ("Asset" in data.includes) {
              if (data.includes['Asset'].length > 0) {
                this.assetsDetails = this.siteService.formatData(data.includes.Asset)
              }
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
            // console.log("Test2")

            //Custom Dimention
            this.sharedService.customDimensionValue = { "pageName": 'Article page', "event": 'pageview' }
            this.sharedService.customDimensionStatus.next(true);
            //Custom Dimention


            let pageTitle = ("pageTitle" in pageData[0].fields) ? pageData[0].fields.pageTitle : '';
            this.articlePageTitle = pageTitle
            //   let robots = ("robots" in pageData[0].fields) ? pageData[0].fields.robots : '';
            let shortDescription = ("shortDescription" in pageData[0].fields) ? pageData[0].fields.shortDescription : '';
            this.articleType = ("articleType" in pageData[0].fields) ? pageData[0].fields.articleType : '';
            const urlSlug = ("urlSlug" in pageData[0].fields) ? pageData[0].fields.urlSlug : '';


            //adding class for legal pages
            (this.articleType == "Legal notices") ? this.document.body.classList.add('legal-article') : '';
            //adding class for legal pages
            this.relatedArticleType = this.articleType
            //   console.log("Test3")
            let banner = ("banner" in pageData[0].fields) ? pageData[0].fields.banner : {};
            let authorProfile;
            authorProfile = ("authorProfile" in pageData[0].fields) ? pageData[0].fields.authorProfile : {};
            let paragraph = ("paragraph" in pageData[0].fields) ? pageData[0].fields.paragraph : [];
            let otherArticlesSectionTitle = ("otherArticlesSectionTitle" in pageData[0].fields) ? pageData[0].fields.otherArticlesSectionTitle : {};

            let articleCreated = pageData[0].sys.updatedAt;
            let articleReadTime = ("articleReadTime" in pageData[0].fields) ? pageData[0].fields.articleReadTime : '';

            let bannerDetails, paragraphDetails = [], authorProfileDetails, otherArticlesSectionTitleDetails;

            if (this.articleType == "Blogs" || this.articleType == "News") {
              this.document.body.classList.add('blog')
              if (this.articleType == "Blogs") {
                this.document.body.classList.add('employee')
              }
              if (!this.siteService.isObjectEmpty(authorProfile)) {
                try {
                  let authorProfileId = authorProfile.sys.id;
                  let authorProfileEntryDetails = this.entryDetails[authorProfileId];
                  const authorFirstName = ("firstName" in authorProfileEntryDetails.fields) ? authorProfileEntryDetails.fields.firstName : 'IDP';
                  const authorLastName = ("firstName" in authorProfileEntryDetails.fields) ? authorProfileEntryDetails.fields.lastName : 'Education';
                  let imageDetails;
                  if ('image' in authorProfileEntryDetails.fields) {
                    const imageId = authorProfileEntryDetails.fields.image.sys.id;
                    const imageAsset = this.assetsDetails[imageId]
                    imageDetails = this.sharedService.getMediaDetails(imageId, '', imageAsset, this.entryDetails, this.assetsDetails);
                  }
                  authorProfileDetails = new AuthorDetails(
                    authorFirstName,
                    authorLastName,
                    imageDetails,
                    articleCreated,
                    articleReadTime
                  )

                }
                catch (err) {

                }
              } else {
                authorProfileDetails = new AuthorDetails(
                  'IDP',
                  'Education',
                  null,
                  articleCreated,
                  articleReadTime
                )
              }
            }
            if (!this.siteService.isObjectEmpty(otherArticlesSectionTitle)) {
              try {
                let sectionTitleId = otherArticlesSectionTitle.sys.id;
                let sectionTitleEntryDetails = this.entryDetails[sectionTitleId];
                otherArticlesSectionTitleDetails = this.sharedService.getSectionTitle(sectionTitleEntryDetails, this.entryDetails)
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

            if (paragraph.length > 0) {
              try {
                let i = 1;
                paragraphDetails = paragraph.map(paragraph => {
                  let paragraphSysId = paragraph.sys.id;


                  let paragraphEntryDetails = this.entryDetails[paragraphSysId];


                  let singleParagraph = this.sharedService.getParagraphDetails(paragraphSysId, paragraphEntryDetails, this.entryDetails, this.assetsDetails);
                  return singleParagraph;

                })




              } catch (error) {
              }

            }
            let DynamicArticleDetails;
            this.articleDetails = new ArticleDetails(
              bannerDetails,
              paragraphDetails,
              authorProfileDetails,
              DynamicArticleDetails,
              otherArticlesSectionTitleDetails

            )
            this.sharedService.getDynamiArticleDetails(this.preview, this.relatedArticleType, this.articleLimit, this.articleCount, this.articleSkip, this.articleDetails, this.totalRecords, this.entryDetails, this.assetsDetails)
            //Article Schema
            if (this.articleType == "Blogs" || this.articleType == "News") {
              this.schemaShow = true;
              this.schema = {
                "@context": "Schema.org - Schema.org ",
                "@type": "Article",
                "headline": pageTitle,
                "url": urlSlug,

                "thumbnailUrl": this.articleDetails.articleBanner['image'].imageUrl,

                "image": this.articleDetails.articleBanner['image'].imageUrl,

                "dateCreated": articleCreated,

                "author": { "@type": "Person", "name": this.articleDetails.articleAuthorProfile['firstName'] + this.articleDetails.articleAuthorProfile['lastName'] },

                "publisher": {
                  "@type": "Organization", "name": "IDP Education?",

                  "logo": {
                    "@type": "ImageObject - Schema.org Type ",

                    "url": "http://images.ctfassets.net/8bbwomjfix8m/642uXdFT31j1WCP1GfLn74/18bf4641e4cc7232aa8ed2fb592cf1d0/idp-logo.svg"
                  }
                },
              };
            }
            //Article Schema
          }
        }
        catch (error) {
          console.log(error)
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