 import { environment } from '../../environments/environment'
 export class UTILITIES {
    //  ENVIRONMENT = 'stage';
      AWS_ENDPOINT_URL = environment.awsEndPointUrl;
    //  CONTENTFUL_URL = environment.contentfulUrl;
    //  userIp_URL = environment.userIPUrl;
        domainUrl = environment.domainUrl;
    //  testDateURL = environment.testDateURL;
    //  rolistingURL = environment.roListingURL;
    //  resultApiURL = environment.resultApiURL;
    //  breadcrumb_URL = environment.breadCrumbURL;
    //  googleReview_URL = environment.googleReviewService;
    //  languageVersion = environment.languageVersion;
      xApiKey = environment.xApiKey
    //  leadgenURL = environment.leadgenURL;
    //  prepUrl = environment.prepUrl;
    //  searchUrl = environment.searchUrl;




   checkBrowser() {
    let isSafari = false;
    const uA = navigator.userAgent;
    const vendor = navigator.vendor;
    const isMobile = /iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      isSafari = true;
    }
    else {
      if (/Safari/i.test(uA) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(uA)) {
        isSafari = true;
      }
      else {
        isSafari = false;
      }
    }
    return isSafari
  }

  setWebPImg() {
    let isSafari = this.checkBrowser();
    let isWebpImage = ''
    if (isSafari != true) {
      isWebpImage = "&fm=webp"
    }
    return isWebpImage
  }
 }


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 