import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { take } from 'rxjs/internal/operators/take';
import { Subject } from 'rxjs/internal/Subject';
import { BreadCrumb } from '../models/breadcrumb';
import { DynamicArticle } from '../models/dynamic-article';
import { FeaturedImage } from '../models/featured-image';
import { FeaturetteDetails } from '../models/featurette';
import { ImageCard, PeopleCard } from '../models/image-card';
import { ImageInfo } from '../models/image-info';
import { OurStory } from '../models/our-story';
import { ParagraphInfo } from '../models/paragraph-info';
import { RelatedPages } from '../models/related-pages';
import { RelatedVideo } from '../models/related-video';
import { SectionTitle } from '../models/section-title';
import { Story } from '../models/story';
import { Testimonial } from '../models/testimonial';
import { VideoDetails } from '../models/video';
import { SiteService } from './site.service';
declare global {
  interface Window { dataLayer: any[]; }
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  dynamicArticleTotalRecords;
  public customDimensionValue = {};
  public customDimensionStatus = new BehaviorSubject(false);
  constructor(
    private siteService: SiteService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  getMediaDetails(imageId, imageAltText, imageAssestDetails, entryDetails, assetsDetails) {

    try {
      let imageUrl = imageAssestDetails.fields.file.url;
      let imageWidth = imageAssestDetails.fields.file.details.image.width;
      let imageHeight = imageAssestDetails.fields.file.details.image.height;

      return new ImageInfo(
        imageId,
        imageAltText,
        imageUrl,
        imageWidth,
        imageHeight,
      );
    } catch (error) {
      console.log(' — Error is handled gracefully: ', error);
    }

  }

  /**
   * @see getFeaturedImageDetails Method to set the featured image information and return the FeaturedImage Model
   * @version 1.0
   * @param bannerdImageId
   * @param bannerImageEntryDetails
   * @param entryDetails
   * @param assetsDetails
   * @return FeaturedImage Model
   */
  getFeaturedImageDetails(bannerdImageId, bannerImageEntryDetails, entryDetails, assetsDetails) {

    try {

      let bannerTitle = bannerImageEntryDetails.fields.title;

      let bannerDescription = ("description" in bannerImageEntryDetails.fields) ? bannerImageEntryDetails.fields.description : '';
      let imageAltText = ("altText" in bannerImageEntryDetails.fields) ? bannerImageEntryDetails.fields.altText : "";
      let ctaLabel = ("ctaLabel" in bannerImageEntryDetails.fields) ? bannerImageEntryDetails.fields.ctaLabel : "";
      let ctaUrl = ("ctaUrl" in bannerImageEntryDetails.fields) ? bannerImageEntryDetails.fields.ctaUrl : "";
      let feauturedctaTarget = ("ctaTarget" in bannerImageEntryDetails.fields) ? bannerImageEntryDetails.fields.ctaTarget : "Open in same tab";
      if (feauturedctaTarget == "Open in new tab") {
        var ctaTarget = "_blank"
      }
      else {
        var ctaTarget = "_self"
      }

      let imageMediaId = bannerImageEntryDetails.fields.image.sys.id;
      let bannerImageAssestDetails = assetsDetails[imageMediaId];

      let imageDetails = this.getMediaDetails(imageMediaId, imageAltText, bannerImageAssestDetails, entryDetails, assetsDetails);

      return new FeaturedImage(
        bannerdImageId,
        bannerTitle,
        bannerDescription,
        imageDetails,
        ctaLabel,
        ctaUrl,
        ctaTarget,
      )

    } catch (error) {
      console.log(' — Error is handled gracefully: ', error);
    }
  }
  getVideoDetails(videoEntryDetails, entryDetails, assetsDetails) {
    try {
      let mediaId = videoEntryDetails.fields.video.sys.id;
      let mediaEntryDetails = entryDetails[mediaId];
      let videoUrl, videoName, videoTitle;
      if (mediaEntryDetails.fields.media) {
        let ovVideoMediaId = mediaEntryDetails.fields.media.sys.id;
        let ovVideoMediaAsset = assetsDetails[ovVideoMediaId];

        videoUrl = ("url" in ovVideoMediaAsset.fields.file) ? ovVideoMediaAsset.fields.file.url : '';
        videoTitle = ("title" in ovVideoMediaAsset.fields) ? ovVideoMediaAsset.fields.title : '';

      } else {
        videoUrl = ("externalVideoUrl" in mediaEntryDetails.fields) ? mediaEntryDetails.fields.externalVideoUrl : '';
        videoName = ("videoName" in mediaEntryDetails.fields) ? mediaEntryDetails.fields.videoName : '';
        videoTitle = ("videoTitle" in mediaEntryDetails.fields) ? mediaEntryDetails.fields.videoTitle : '';

      }
      let videoThumbnail;
      let videoThumbnailId = mediaEntryDetails.fields.thumbnail.sys.id;
      videoThumbnail = assetsDetails[videoThumbnailId];
      let videoThumbnailUrl = ("url" in videoThumbnail.fields.file) ? videoThumbnail.fields.file.url : '';
      let videoThumbnailWidth = ("width" in videoThumbnail.fields.file.details) ? videoThumbnail.fields.file.details.image.width : 0;
      let videoThumbnailHeight = ("height" in videoThumbnail.fields.file.details) ? videoThumbnail.fields.file.details.image.height : 0;


      return new VideoDetails(
        videoUrl,
        videoName,
        videoTitle,
        videoThumbnailUrl,
        videoThumbnailWidth,
        videoThumbnailHeight
      )
    }
    catch (error) {
      console.log(error)
    }
  }

  getSectionTitle(sectionTitleEntryDetails, entryDetails) {
    let sectionTitle = ("sectionTitle" in sectionTitleEntryDetails.fields) ? sectionTitleEntryDetails.fields.sectionTitle : '';
    let sectionCtalabel = ("ctaLabel" in sectionTitleEntryDetails.fields) ? sectionTitleEntryDetails.fields.ctaLabel : '';
    let sectionCtaUrl = ("ctaUrl" in sectionTitleEntryDetails.fields) ? sectionTitleEntryDetails.fields.ctaUrl : '';
    let ctaTarget = ("ctaTarget" in sectionTitleEntryDetails.fields) ? sectionTitleEntryDetails.fields.ctaTarget : 'Open in same tab';
    let sectionIntro = ("sectionIntro" in sectionTitleEntryDetails.fields) ? sectionTitleEntryDetails.fields.sectionIntro : '';
    if (ctaTarget == "Open in new tab") {
      ctaTarget = "_blank"
    }
    else {
      ctaTarget = "_self"
    }

    return new SectionTitle(
      sectionTitle,
      sectionCtalabel,
      sectionCtaUrl,
      ctaTarget,
      sectionIntro
    )
  }




  getFeaturetteDetails(featuretteEntryDetails, entryDetails, assetsDetails) {
    let ctaLabel = ("ctaLabel" in featuretteEntryDetails.fields) ? featuretteEntryDetails.fields.ctaLabel : '';
    let ctaUrl = ("ctaUrl" in featuretteEntryDetails.fields) ? featuretteEntryDetails.fields.ctaUrl : '';
    let ctaTarget = ('ctaTarget' in featuretteEntryDetails.fields) ? featuretteEntryDetails.fields.ctaTarget : 'Open in same tab';
    let shortDescription = ("shortDescription" in featuretteEntryDetails.fields) ? featuretteEntryDetails.fields.shortDescription : '';
    let longDescription = ('longDescription' in featuretteEntryDetails.fields) ? featuretteEntryDetails.fields.longDescription : '';
    let subTitle = ('subTitle' in featuretteEntryDetails.fields) ? featuretteEntryDetails.fields.subTitle : '';
    let staticTextName = ("staticTextName" in featuretteEntryDetails.fields) ? featuretteEntryDetails.fields.staticTextName : '';
    let title = ("title" in featuretteEntryDetails.fields) ? featuretteEntryDetails.fields.title : '';
    let videoDeatails;
    let imageDetails;
    if ("video" in featuretteEntryDetails.fields) {
      videoDeatails = this.getVideoDetails(featuretteEntryDetails, entryDetails, assetsDetails)
    }
    if ("image" in featuretteEntryDetails.fields) {

      // let mediaId = featuretteEntryDetails.fields.image.sys.id;
      // let mediaAssetDetails = assetsDetails[mediaId]
      imageDetails = this.getFeaturedImageDetails('', featuretteEntryDetails, entryDetails, assetsDetails)
    }

    if (ctaTarget == "Open in new tab") {
      ctaTarget = "_blank"
    }
    else {
      ctaTarget = "_self"
    }
    return new FeaturetteDetails(
      title,
      shortDescription,
      longDescription,
      subTitle,
      ctaLabel,
      ctaUrl,
      ctaTarget,
      videoDeatails,
      imageDetails
    )
  }

  getOurStoryDetails(ourStorySoFarEntryDetails, entryDetails, assetDetails) {
    let ourStorySoFarTitle = ourStorySoFarEntryDetails.fields.title;
    let ourStorySoFarCtaLabel = ourStorySoFarEntryDetails.fields.ctaLabel;
    let ourStorySoFarCtaTarget = ourStorySoFarEntryDetails.fields.ctaTarget;
    let ourStorySoFarCtaUrl = ourStorySoFarEntryDetails.fields.ctaUrl;

    if (ourStorySoFarCtaTarget == "Open in new tab") {
      ourStorySoFarCtaTarget = "_blank"
    }
    else {
      ourStorySoFarCtaTarget = "_self"
    }

    let storyDetails = ourStorySoFarEntryDetails.fields.stories.map(story => {
      let storyId = story.sys.id;
      let storyEntryDetails = entryDetails[storyId];
      let storyShortDescription = ("shortDescription" in storyEntryDetails.fields) ? storyEntryDetails.fields.shortDescription : "";
      let storyYear = ("year" in storyEntryDetails.fields) ? storyEntryDetails.fields.year : 0;
      let storyTitle = ("title" in storyEntryDetails.fields) ? storyEntryDetails.fields.title : "";
      let imageDetails;
      if ("image" in storyEntryDetails.fields) {
        imageDetails = this.getFeaturedImageDetails('', storyEntryDetails, entryDetails, assetDetails)
      }
      return new Story(
        storyTitle,
        storyShortDescription,
        storyYear,
        imageDetails
      )


    })

    return new OurStory(
      ourStorySoFarTitle,
      ourStorySoFarCtaLabel,
      ourStorySoFarCtaTarget,
      ourStorySoFarCtaUrl,
      storyDetails
    )
  }

  getImageCard(imgCardEntryDetails, entryDetails, assetsDetails) {

    let imgCardTitle = ("title" in imgCardEntryDetails.fields) ? imgCardEntryDetails.fields.title : '';

    let cardsDetails;
    cardsDetails = imgCardEntryDetails.fields.multipleStaticText.map(card => {
      let cardSysId = card.sys.id;
      let cardEntryDetails = entryDetails[cardSysId];

      let cardTitle = ("title" in cardEntryDetails.fields) ? cardEntryDetails.fields.title : '';
      let cardShortDescription = ("shortDescription" in cardEntryDetails.fields) ? cardEntryDetails.fields.shortDescription : '';
      let cardCtaLabel = ("ctaLabel" in cardEntryDetails.fields) ? cardEntryDetails.fields.ctaLabel : '';
      let cardCtaUrl = ("ctaUrl" in cardEntryDetails.fields) ? cardEntryDetails.fields.ctaUrl : '';
      let cardCtaTarget = ("ctaTarget" in cardEntryDetails.fields) ? cardEntryDetails.fields.ctaTarget : 'Open in same tab';
      let cardLongDescription = ("longDescription" in cardEntryDetails.fields) ? cardEntryDetails.fields.longDescription : '';
      let cardSubTitle = ("subTitle" in cardEntryDetails.fields) ? cardEntryDetails.fields.subTitle : '';
      let cardDate = ("date" in cardEntryDetails.fields) ? cardEntryDetails.fields.date : '';
      if (cardCtaTarget == 'Open in new tab') {
        cardCtaTarget = '_blank'
      } else {
        cardCtaTarget = '_self'
      }
      let imageDetails;
      let videoDetails;
      if ("image" in cardEntryDetails.fields) {
        let cardImageId = cardEntryDetails.fields.image.sys.id;
        let cardAssetDetails = assetsDetails[cardImageId]
        imageDetails = this.getMediaDetails(cardImageId, '', cardAssetDetails, entryDetails, assetsDetails);
      }
      if ("video" in cardEntryDetails.fields) {
        const cardVideoId = cardEntryDetails.fields.video.sys.id;
        const cardVideoAssetDetails = entryDetails[cardVideoId];
        videoDetails = this.getVideoDetails(cardEntryDetails, entryDetails, assetsDetails);
      }
      return new PeopleCard(
        cardTitle,
        imageDetails,
        videoDetails,
        cardCtaUrl,
        cardCtaLabel,
        cardCtaTarget,
        cardShortDescription,
        cardDate,
        cardLongDescription,
        cardSubTitle
      )
    })
    let imgCtaLabel = ("ctaLabel" in imgCardEntryDetails.fields) ? imgCardEntryDetails.fields.ctaLabel : '';
    let imgCtaUrl = ("ctaUrl" in imgCardEntryDetails.fields) ? imgCardEntryDetails.fields.ctaUrl : '';
    let imgCtaTarget = ("ctaTarget" in imgCardEntryDetails.fields) ? imgCardEntryDetails.fields.ctaTarget : 'Open in same tab';
    if (imgCtaTarget == 'Open in new tab') {
      imgCtaTarget = '_blank'
    } else {
      imgCtaTarget = '_self'
    }
    return new ImageCard(
      imgCardTitle,
      cardsDetails,
      imgCtaLabel,
      imgCtaUrl,
      imgCtaTarget
    )
  }

  getTestimonial(testimonialsEntryDetails, entryDetails, assetsDetails) {
    let testimonialLongDescription = ("longDescription" in testimonialsEntryDetails.fields) ? testimonialsEntryDetails.fields.longDescription : '';
    let testimonialSubTitle = ("subTitle" in testimonialsEntryDetails.fields) ? testimonialsEntryDetails.fields.subTitle : '';
    let testimonialShortDesc = ("shortDescription" in testimonialsEntryDetails.fields) ? testimonialsEntryDetails.fields.shortDescription : '';
    let testimonialTitle = ("title" in testimonialsEntryDetails.fields) ? testimonialsEntryDetails.fields.title : '';



    let testimonialMediaId = testimonialsEntryDetails.fields.image.sys.id;
    let testimonialAssetDetails = assetsDetails[testimonialMediaId]

    let testimonialsImageDetails;

    if (testimonialsEntryDetails.fields.image != undefined) {
      testimonialsImageDetails = this.getMediaDetails(testimonialMediaId, '', testimonialAssetDetails, entryDetails, assetsDetails)
    }
    return new Testimonial(
      testimonialTitle,
      testimonialSubTitle,
      testimonialShortDesc,
      testimonialLongDescription,
      testimonialsImageDetails
    )
  }

  getRelatedVideos(rvideoEntryDetails, entryDetails, assetsDetails) {
    try {
      let rvideoTitle = rvideoEntryDetails.fields.title;
      let rvideoShortDesc = rvideoEntryDetails.fields.shortDescription;
      let rvideoDetails
      if (rvideoEntryDetails.fields.video) {
        rvideoDetails = this.getVideoDetails(rvideoEntryDetails, entryDetails, assetsDetails);
      }
      return new RelatedVideo(
        rvideoTitle,
        rvideoShortDesc,
        rvideoDetails
      )
    }
    catch (error) {
      console.log(error);

    }
  }

  getRelatedPages(rpagesEntryDetails, entryDetails, assetsDetails) {
    let rpagesTitle = rpagesEntryDetails.fields.pageTitle;
    let rpagesShortDesc = rpagesEntryDetails.fields.shortDescription;
    let rpagesUrl = rpagesEntryDetails.fields.urlSlug;
    let imageDetails;
    let videoDetails;
    if ('banner' in rpagesEntryDetails.fields) {
      let bannerId = rpagesEntryDetails.fields.banner.sys.id;
      let bannerEntryDetails = entryDetails[bannerId];
      if ("video" in bannerEntryDetails.fields) {
        videoDetails = this.getVideoDetails(bannerEntryDetails, entryDetails, assetsDetails)
      }
      if ("image" in bannerEntryDetails.fields) {
        imageDetails = this.getFeaturedImageDetails(bannerId, bannerEntryDetails, entryDetails, assetsDetails)
      }

    }
    return new RelatedPages(
      rpagesTitle,
      rpagesShortDesc,
      imageDetails,
      videoDetails,
      rpagesUrl
    )
  }

  getRichTextContent = function (content: any) {
    return documentToHtmlString(content);
  }
  getRichTextContentOption = function (content, entryDetails, assetsDetails) {

    let options = {
      renderNode: {
        [INLINES.HYPERLINK]: (node) => {
          try {
            if (node.nodeType == "hyperlink") {
              let urlString = node.data.uri;
              // let pat = /^https?:\/\//i;
              // if (!pat.test(urlString) || urlString.indexOf(this.UTILITIES.domainUrl) != -1) {
              //   return "<a href=" + node.data.uri + " >" + node.content[0].value + "</a>";
              // } else {
              //   return "<a href=" + node.data.uri + " target='_blank'>" + node.content[0].value + "</a>";
              // }
              return "<a href=" + node.data.uri + " target='_blank'>" + node.content[0].value + "</a>";
            } else {
              return "";
            }
          } catch (error) {

          }
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          try {
            let target = node.data.target;
            let assetsId = target.sys.id;
            let fields = assetsDetails[assetsId].fields;
            if (fields.file.contentType.indexOf("image") != -1)
              return '<img src="' + fields.file.url + '" height="' + fields.file.details.image.height + '" width="' + fields.file.details.image.width + '" alt="' + fields.description + '"/>';
            else
              return '';
          } catch (error) {

          }
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
          try {
            let target = node.data.target;
            let entryId = target.sys.id;
            let componentEntryDetails = entryDetails[entryId];

            let switchVal = componentEntryDetails.sys.contentType.sys.id;

            switch (switchVal) {
              case 'table':
                let tableEntryDetails = componentEntryDetails.fields;
                let tableContent = tableEntryDetails.tables.tableData;
                let tableData = [];
                let tableHtml = '';

                if (tableContent.length > 0) {
                  tableData = tableContent;

                  tableHtml = "<div class='article-table'><table>";
                  tableData.map(function (contentVal, contentKey) {
                    var checkArray = contentVal.filter(function (element) { if (element != '') return element; });
                    if (checkArray.length > 0) {
                      tableHtml += "<tr>";
                      contentVal.map(function (dataVal, dayaKey) {

                        if (contentKey == 0) {
                          tableHtml += "<th>" + dataVal + "</th>";
                        } else {
                          tableHtml += "<td>" + dataVal + "</td>";
                        }
                      });
                      tableHtml += "</tr>";
                    }
                  });
                  tableHtml += "</table></div>";
                }
                return tableHtml;

              default:
                return '';
            }
          } catch (error) {

          }
        },
        [INLINES.EMBEDDED_ENTRY]: (node) => {
          try {
            let target = node.data.target;
            let entryId = target.sys.id;
            let componentEntryDetails = entryDetails[entryId];

            let switchVal = componentEntryDetails.sys.contentType.sys.id;
            switch (switchVal) {
              case 'table':
                let tableEntryDetails = componentEntryDetails.fields;
                let tableContent = tableEntryDetails.tables.tableData;
                let tableData = [];
                let tableHtml = '';
                if (tableContent.length > 0) {
                  tableData = tableContent;
                  tableHtml = "<div class='article-table'><table>";
                  tableData.map(function (contentVal, contentKey) {
                    var checkArray = contentVal.filter(function (element) { if (element != '') return element; });
                    if (checkArray.length > 0) {
                      tableHtml += "<tr>";
                      contentVal.map(function (dataVal, dayaKey) {

                        if (contentKey == 0) {
                          tableHtml += "<th>" + dataVal + "</th>";
                        } else {
                          tableHtml += "<td>" + dataVal + "</td>";
                        }
                      });
                      tableHtml += "</tr>";
                    }
                  });
                  tableHtml += "</table></div>";
                }
                return tableHtml;

              default:
                return '';

            }
          } catch (error) {

          }
        }
      }
    };
    return documentToHtmlString(content, options);
  }
  /*
  @see Function that relpace the context path in front of the href url
  @author Selvakumar balraj
*/
  // replaceContextPath(htmlContent, contextpath) {
  //   var soup = new JSSoup(htmlContent, false);
  //   for (const a_tag of soup.findAll('a')) {
  //     var tarea_regex = /^(http|https|www|ftp|mailto)/;
  //     if (tarea_regex.test(String(a_tag.attrs.href).toLowerCase()) == false) {
  //       a_tag.attrs.href = ("/" + contextpath + a_tag.attrs.href).replace('//', '/');
  //     }
  //   }
  //   return soup.prettify()
  // }

  getParagraphDetails(paragraphSysId, paragraphEntryDetails, entryDetails, assetsDetails) {
    try {      
      let paragraphTitle = ("paragraphTitle" in paragraphEntryDetails.fields) ? paragraphEntryDetails.fields.paragraphTitle : "";
      let paragraphTable = ("paragraphTable" in paragraphEntryDetails.fields) ? paragraphEntryDetails.fields.paragraphTable : {};
      let tableArray;
      if (!this.siteService.isObjectEmpty(paragraphTable)) {
        const pTableSysId = paragraphTable.sys.id;
        const pTableEntry = entryDetails[pTableSysId];
        tableArray = pTableEntry.fields.table.tableData;  
      }
      //  let paragraphTitleId = this.articleParagraphUrlpattern(paragraphTitle);
      let paragraphTitleId;
      let paragraphContent = paragraphEntryDetails.fields.paragraphBody;
      let paragraphContentValue = this.getRichTextContentOption(paragraphContent, entryDetails, assetsDetails);
      //  paragraphContentValue = this.replaceContextPath(paragraphContentValue, countryName)


      let paragraphImageDetails = null;
      if ("image" in paragraphEntryDetails.fields) {
        let paragraphImageId = paragraphEntryDetails.fields.image.sys.id;
        let paragraphImageEntryDetails = entryDetails[paragraphImageId];
        let imageDetails = this.getFeaturedImageDetails(paragraphImageId, paragraphImageEntryDetails, entryDetails, assetsDetails)
        paragraphImageDetails = imageDetails.image;
      }

      let video = ("video" in paragraphEntryDetails.fields) ? paragraphEntryDetails.fields.video : {};
      let videoDetails = {}

      if (!this.siteService.isObjectEmpty(video)) {
        let videoSysId = video.sys.id;
        let videoEntryDetails = entryDetails[videoSysId];
        videoDetails = this.getVideoDetails(videoEntryDetails, entryDetails, assetsDetails)
      }

      let paragraphDetails = new ParagraphInfo(
        paragraphSysId,
        paragraphTitle,
        paragraphTitleId,
        paragraphImageDetails,
        paragraphContentValue,
        tableArray,
        videoDetails
      )
      return paragraphDetails;
    } catch (error) {
      console.log(' — Error is handled gracefully: ', error);
    }
  }



  getDynamiArticleDetails(preview, articleType, articleLimit, articleCount, articleSkip, articleLandingDetails, totalRecords, entryDetails, assetsDetails) {
    let subject = new Subject<any>();
    this.siteService.getDynamicArticle(preview, articleType, articleLimit, articleCount, articleSkip).pipe(take(1)).subscribe(
      data => {
        try {
          let articleData = data.items;
          let articleDetails;
          let dynamicArticleTotalRecords = data.total;
          if (articleData != null && articleData.length > 0) {

            if (data.includes['Entry'].length > 0) {
              entryDetails = this.siteService.formatData(data.includes.Entry)
            }
            if (data.includes['Asset'].length > 0) {
              assetsDetails = this.siteService.formatData(data.includes.Asset)
            }

            articleDetails = articleData.map(article => {

              const articleFields = article.fields;
              const articleType = articleFields.articleType;
              //if (articleType == "Blogs") {
              //  const title = articleFields.pageTitle;
              const title = ("pageTitle" in articleFields) ? articleFields.pageTitle : '';
              const description = ("longDescription" in articleFields) ? articleFields.longDescription : '';
              const shortDescription = ("shortDescription" in articleFields) ? articleFields.shortDescription : '';
              const urlSlug = ("urlSlug" in articleFields) ? articleFields.urlSlug : '';

              const updatedDate = article.sys.updatedAt
              const banner = ("banner" in articleFields) ? articleFields.banner : {};
              let bannerDetails;

              if (!this.siteService.isObjectEmpty(banner)) {
                try {
                  const bannerId = banner.sys.id;
                  const bannerEntryDetails = entryDetails[bannerId];
                  if ("video" in bannerEntryDetails.fields) {
                    bannerDetails = this.getVideoDetails(bannerEntryDetails, entryDetails, assetsDetails);
                  }
                  if ("image" in bannerEntryDetails.fields) {
                    if (bannerEntryDetails.sys.contentType.sys.id === "ccwStaticText") {
                      bannerDetails = this.getFeaturedImageDetails(bannerId, bannerEntryDetails, entryDetails, assetsDetails)
                    }
                  }

                }
                catch (err) {

                }
                return new DynamicArticle(
                  title,
                  shortDescription,
                  description,
                  updatedDate,
                  bannerDetails,
                  urlSlug
                )
              }
            })
            let dyAricle = articleLandingDetails.DynamicArticle;
            dyAricle = articleDetails;
            articleLandingDetails.DynamicArticle = dyAricle
          }

        } catch (error) {

        }
      })
    return subject.asObservable();
  }



  getBreadCrumb(bcEntryDetails, entryDetails, assetsDetails) {
    const bcLabel = bcEntryDetails.fields.labelAndLink;
    let bcDetails;
    bcDetails = bcLabel.map(bc => {


      let bcId = bc.sys.id;
      let bcEDetails = entryDetails[bcId];
      const bcTitle = bcEDetails.fields.title;
      const bcUrl = bcEDetails.fields.url
      return new BreadCrumb(
        bcTitle,
        bcUrl
      )
    })

    return bcDetails
  }
  eventTrack(eventName, eventCategory, eventAction, eventLabel) {
    if (isPlatformBrowser(this.platformId)) {
      window.dataLayer.push({
        'event': eventName,
        'event category': eventCategory,
        'event action': eventAction,
        'event label': eventLabel
      });
    }
  }

  
}

