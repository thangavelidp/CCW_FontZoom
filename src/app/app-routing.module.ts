import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';




let availableCountry;
let websiteInfo = [];
let language = false;
let currentUrl = "";
export function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export function isLanguageCode(segments) {
  if (segments.length > 0) {
    var countryDetails = websiteInfo.length > 0 ? websiteInfo["global"].LanguageList : [];
    if (availableCountry.indexOf(segments[0]) != -1) {
      countryDetails = websiteInfo.length >= 0 ? websiteInfo[segments[0]].LanguageList : [];
    }
    var segmentsLength = segments.length;
    let countryCodeArray = countryDetails.map((code) => { return code.urlCode });
    let codeIndex = countryCodeArray.indexOf(segments[segmentsLength - 1]);
    if (codeIndex != -1 && (countryDetails[codeIndex].enableLanguage == "Yes" || getParameterByName("preview", currentUrl) == "true")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export function homePageMatcher(segments) {
  // var language = isLanguageCode(segments)
  if ((segments.length === 0)) {
    return {
      consumed: segments,
      posParams: {
        country_name: new UrlSegment(segments[0].path, {}),
      }
    };
  }
  return null;
}

export function hubPageMatcher(segments) {
  // var language = isLanguageCode(segments)
  if ((segments.length === 1)) {
    return {
      consumed: segments,
      posParams: {
        //  country_name: new UrlSegment(segments[0].path, {}),
        hub_param: new UrlSegment(segments[0].path, {})
      }
    };
  }
  return null;
}

export function topicPageMatcher(segments) {
  if (segments.length == 2) {
    let topicParamsArray = segments.map((path) => { return path.path });
    let countryName = new UrlSegment(null, {});
    let topic_param = topicParamsArray.join("/");
    return {
      consumed: segments,
      posParams: {
        country_name: countryName,
        topic_param: new UrlSegment(topic_param, {})
      }
    }
  }

  return null;
}

export function topicMobileNavMatcher(segments) {
  
  if (((segments.length === 3) && segments[2].path == 'get-to-know-them')) {

    let topicParamsArray = segments.map((path) => { return path.path });
 
    let topic_param = topicParamsArray.join("/");
    return {
      consumed: segments,
      posParams: {
        id: new UrlSegment(segments[2].path, {}),
        topic_param: new UrlSegment(segments[1].path, {}),
      }
    };
  }
  return null;
}

export function legalPageMatcher(segments) {
  if (((segments.length === 1) && segments[0].path == 'disclaimer') ||
    ((segments.length === 1) && segments[0].path == 'privacy-policy') ||
    ((segments.length === 1) && segments[0].path == 'careers-privacy-policy') ||
    ((segments.length === 1) && segments[0].path == 'terms-of-use')) {
    return {
      consumed: segments,
      posParams: {
        article_param: new UrlSegment(segments[0].path, {}),
      }
    };
  }
  return null;
}

export function blogPageMatcher(segments) {
  // var language = isLanguageCode(segments);
  if (((segments.length === 2 ) && segments[0].path == 'employee-stories') || ((segments.length === 2 ) && segments[0].path == 'news')) {
    let articleParamsArray = segments.map((path) => { return path.path });
    if (language) {
      articleParamsArray.splice(articleParamsArray.length - 1, 1);
    }
    let forms_param = articleParamsArray.join("/");
    return {
      consumed: segments,
      posParams: {
        article_param: new UrlSegment(forms_param, {}),
      }
    };
  }
  // } else if (segments.length === 2 && segments[1].path == 'employee-stories') {
  //   let articleParamsArray = segments.map((path) => { return path.path });
  //   articleParamsArray.shift();
  //   if (language) {
  //     articleParamsArray.splice(articleParamsArray.length - 1, 1);
  //   }
  //   let forms_param = articleParamsArray.join("/");

  //   return {
  //     consumed: segments,
  //     posParams: {
  //       country_name: new UrlSegment(segments[0].path, {}),
  //       forms_param: new UrlSegment(forms_param, {}),
  //     }
  //   };
  // }
  return null;
}


// export function privacyPolicyMatcher(segments) {
//   if ((segments.length === 1) && segments[0].path == 'privacy-policy') {
//     return {
//       consumed: segments,
//       posParams: {
//         article_param: new UrlSegment(segments[0].path, {}),
//       }
//     };
//   } 
//   return null;
// }




// export function homePageMatcher(segments) {
//   // var language = isLanguageCode(segments)
//   if ((segments.length === 1)) {
//     return {
//       consumed: segments,
//       posParams: {
//         country_name: new UrlSegment(segments[0].path, {}),
//       }
//     };
//   }
//   return null;
// }

// export function hubPageMatcher(segments) {
//   // var language = isLanguageCode(segments)
//   if ((segments.length === 3)) {
//     return {
//       consumed: segments,
//       posParams: {
//         country_name: new UrlSegment(segments[0].path, {}),
//         hub_param: new UrlSegment(segments[1].path, {})
//       }
//     };
//   } 
//   return null;
// }



const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'contact-us', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'news', loadChildren: () => import('./pages/article-landing/article-landing.module').then(m => m.ArticleLandingModule) },
  //{ path: 'who-we-are/our-board-of-directors/get-to-know-them', loadChildren: () => import('./pages/topic/topic.module').then(m => m.TopicModule) },
  { matcher: legalPageMatcher, loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule) },
  { matcher: blogPageMatcher, loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule) },
  //{ matcher: privacyPolicyMatcher, loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule) },

  { matcher: homePageMatcher, loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { matcher: hubPageMatcher, loadChildren: () => import('./pages/hub/hub.module').then(m => m.HubModule) },
  { matcher: topicPageMatcher, loadChildren: () => import('./pages/topic/topic.module').then(m => m.TopicModule) },
  { matcher: topicMobileNavMatcher, loadChildren: () => import('./pages/topic/topic.module').then(m => m.TopicModule) },
  { path: '**', component: ContactComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }