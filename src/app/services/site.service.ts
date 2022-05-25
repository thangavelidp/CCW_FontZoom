import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { UTILITIES } from '../utils/ccw-utils';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(
    private http: HttpClient,
    private UTILITIES: UTILITIES
  ) { }
  formatData(data) {
    var fieldsDetails = {};
    data.map(function (details) {
      fieldsDetails[details.sys.id] = details;
    })
    return fieldsDetails;
  }

  isObjectEmpty = function (obj) {
    return Object.keys(obj).length === 0;
  }

  /**
  * @see getHome Method to return the http object with required query
  * @version 1.0
  * @param preview
  * @return http object
  */
  getHome(preview): Observable<any> {
    let http: HttpClient;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': this.UTILITIES.xApiKey
    });
    let options = { headers: headers };

    let query = {
      "content_type": "ccwIaHomePage",
      "url": "/home"
    }

    if (preview) {
      query["preview"] = "true";
    } else {
      query["preview"] = "false";
    }

    return this.http.post<any>(this.UTILITIES.AWS_ENDPOINT_URL, JSON.stringify(query), options);
  }

  getheaderandFooter(preview): Observable<any> {

    let http: HttpClient;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': this.UTILITIES.xApiKey
    });
    let options = { headers: headers };

    let query = {
      'content_type': 'ccwHeaderAndFooter'
    }

    if (preview) {
      query["preview"] = "true";
    } else {
      query["preview"] = "false";
    }

    return this.http.post<any>(this.UTILITIES.AWS_ENDPOINT_URL, JSON.stringify(query), options);
  }



  /**
  * @see getHub Method to return the http object with required query
  * @version 1.0
  * @param preview
  * @return http object
  */
   getHub(preview, hubParam): Observable<any> {
    let http: HttpClient;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': this.UTILITIES.xApiKey
    });
    let options = { headers: headers };

    let query = {
      "content_type": "ccwIaHubPage",
      "url" : "/" + hubParam 
    }

    if (preview) {
      query["preview"] = "true";
    } else {
      query["preview"] = "false" ;
    }

    return this.http.post<any>(this.UTILITIES.AWS_ENDPOINT_URL, JSON.stringify(query), options);
  }

/**
  * @see getArticle Method to return the http object with required query
  * @version 1.0
  * @param preview
  * @return http object
  */
 getArticle(preview, articleParam): Observable<any> {
  let http: HttpClient;
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': this.UTILITIES.xApiKey
  });
  let options = { headers: headers };

  let query = {
    "content_type": "ccwIaArticlePage",
    "url" : "/" + articleParam 
    //"url" : "/disclaimer" 
  }

  if (preview) {
    query["preview"] = "true";
  } else {
    query["preview"] = "false" ;
  }

  return this.http.post<any>(this.UTILITIES.AWS_ENDPOINT_URL, JSON.stringify(query), options);
}

  
  /**
  * @see getTopic Method to return the http object with required query
  * @version 1.0
  * @param preview
  * @return http object
  */
   getTopic(preview, topicParam): Observable<any> {
    let http: HttpClient;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': this.UTILITIES.xApiKey
    });
    let options = { headers: headers };

    let query = {
      "content_type": "ccwIaTopicPage",
      "url" : "/" + topicParam 
    }

    if (preview) {
      query["preview"] = "true";
    } else {
      query["preview"] = "false" ;
    }

    return this.http.post<any>(this.UTILITIES.AWS_ENDPOINT_URL, JSON.stringify(query), options);
  }


  
  /**
  * @see getContact Method to return the http object with required query
  * @version 1.0
  * @param preview
  * @return http object
  */
   getContact(preview, topicParam): Observable<any> {
    let http: HttpClient;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    'x-api-key': this.UTILITIES.xApiKey
    });
    let options = { headers: headers };

    let query = {
      "content_type": "ccwIaContactUsForm",
      "url" : "/contact-us"
    }

    if (preview) {
      query["preview"] = "true";
    } else {
      query["preview"] = "false" ;
    }

    return this.http.post<any>(this.UTILITIES.AWS_ENDPOINT_URL, JSON.stringify(query), options);
  }

  /**
  * @see getArticleLanding Method to return the http object with required query
  * @version 1.0
  * @param preview
  * @return http object
  */
   getArticleLanding(preview, topicParam): Observable<any> {
    let http: HttpClient;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    'x-api-key': this.UTILITIES.xApiKey
    });
    let options = { headers: headers };

    let query = {
      "content_type": "ccwIaArticleLandingPage",
      "url" : "/news"
    }

    if (preview) {
      query["preview"] = "true";
    } else {
      query["preview"] = "false" ;
    }

    return this.http.post<any>(this.UTILITIES.AWS_ENDPOINT_URL, JSON.stringify(query), options);
  }

  /**
  * @see getDynamicArticle Method to return the http object with required query
  * @version 1.0
  * @param preview
  * @return http object
  */
   getDynamicArticle(preview,articleType, articleLimit, articleCount,  articleSkip): Observable<any> {
    let http: HttpClient;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    'x-api-key': this.UTILITIES.xApiKey
    });
    let options = { headers: headers };
    articleSkip = articleCount * articleSkip;
    let query = {
      "content_type": "ccwIaArticlePage",
      "other_params":[`fields.articleType=${articleType}`,"order=-sys.updatedAt",`limit=${articleLimit}`,`skip=${articleSkip}`]
    }

    if (preview) {
      query["preview"] = "true";
    } else {
      query["preview"] = "false" ;
    }

    return this.http.post<any>(this.UTILITIES.AWS_ENDPOINT_URL, JSON.stringify(query), options)
  }
}
