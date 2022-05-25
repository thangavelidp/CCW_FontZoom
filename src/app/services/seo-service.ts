import { Injectable, Inject, ɵConsole, PLATFORM_ID, Optional, RendererFactory2, ViewEncapsulation, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';;
import { Router, ActivatedRoute } from '@angular/router';
import { UTILITIES } from "../utils/ccw-utils"
import { Title, Meta } from '@angular/platform-browser';
// import { ImageConstant } from '../utilities/constants';
// import { RoutingInitService } from "../../shared/routing-init.service";
declare const assignValue: any;
declare const getCookieValue: any;

@Injectable()
export class SeoService {
    // dynamicImagePath = ImageConstant;


    constructor(
        private http: HttpClient,
        @Inject(DOCUMENT) private doc,
        private rendererFactory: RendererFactory2,
        @Inject(PLATFORM_ID) private platformId: Object,
        private title: Title,
        private meta: Meta,
        private UTILITIES: UTILITIES,
        //   private routingInitService: RoutingInitService
    ) { }

    setSeoTitle(pageData) {
        if ('metaTitle' in pageData[0].fields) {
            this.title.setTitle(pageData[0].fields.metaTitle);
        }
    }
    setSeoRobots(pageData) {
        if ('robots' in pageData[0].fields) {
            this.meta.updateTag({ name: 'robots', content: pageData[0].fields.robots });
        }
    }

    removeLink(linkName: string) {
        try {
            const renderer = this.rendererFactory.createRenderer(this.doc, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });
            const canonical = document.querySelector("link[rel='" + linkName + "']")
            const head = this.doc.head;

            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }
            if (!!canonical) {
                renderer.removeChild(head, canonical);
            }
        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }
    addSeoTags(pageData, preview) {
        if ('metaDescription' in pageData[0].fields) {
            this.meta.updateTag({ name: 'description', content: pageData[0].fields.metaDescription });
        }
        if ('metaKeywords' in pageData[0].fields) {
            this.meta.updateTag({ name: 'keywords', content: pageData[0].fields.metaKeywords });
        }
        if ('robots' in pageData[0].fields && !preview && pageData[0].fields.robots != "") {
            this.meta.updateTag({ name: 'ROBOTS', content: pageData[0].fields.robots });
        }
        if ('robots' in pageData[0].fields && preview) {
            this.meta.updateTag({ name: 'ROBOTS', content: "noindex,nofollow" });
        }


        this.meta.updateTag({ property: 'og:title', content: pageData[0].fields.metaTitle });
        this.meta.updateTag({ property: 'og:type', content: "website" });
        this.meta.updateTag({ property: 'og:image', content: '/assets/images/logo/logo-blog.svg' });
        this.meta.updateTag({ property: 'og:description',content: pageData[0].fields.metaDescription });
        this.meta.updateTag({ property: 'og:url',  content: this.UTILITIES.domainUrl +  pageData[0].fields.urlSlug });
        this.meta.updateTag({ property: 'og:image:width', content: "300"});
        this.meta.updateTag({ property: 'og:image:height', content: "200"});


        //     if (this.disableRobots == 'Yes') {
        //       this.meta.updateTag({ name: 'robots', content: "noindex,nofollow" });
        //   }

    }
    setSeoCanonical(pageData, preview) {
        if ('canonical' in pageData[0].fields && !preview) {
            let domain_href = this.UTILITIES.domainUrl;


            //Code for Client side
            if (!isPlatformServer(this.platformId)) {
                this.removeLink("canonical");
                let link: HTMLLinkElement = this.doc.createElement('link');
                link.setAttribute('rel', 'canonical');
                this.doc.head.appendChild(link);
                link.setAttribute('href',  domain_href + pageData[0].fields.canonical);
            }
            //Code for Server side
            if (isPlatformServer(this.platformId)) {
                let link: HTMLLinkElement = this.doc.createElement('link');
                link.setAttribute('rel', 'canonical');
                this.doc.head.appendChild(link);
                link.setAttribute('href', domain_href + pageData[0].fields.canonical);

            }
        }
    }
    isLanguageCode(segments) {
        //  let websiteInfo = this.routingInitService.getWebsiteInfo();
          let websiteInfo ;
        //   let availableCountry = this.routingInitService.getcountry();

        if (segments.length > 0) {
            var countryDetails = websiteInfo.length > 0 ? websiteInfo["global"].LanguageList : [];
            // if (availableCountry.indexOf(segments[0]) != -1) {
            //     countryDetails = websiteInfo.length >= 0 ? websiteInfo[segments[0]].LanguageList : [];
            // }
            var segmentsLength = segments.length;
            let countryCodeArray = countryDetails.map((code) => { return code.urlCode });
            let codeIndex = countryCodeArray.indexOf(segments[segmentsLength - 1]);
            if (codeIndex != -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    setSeoUrl(win_href, preview, urlCode = '') {
           let domain_href = this.UTILITIES.domainUrl;
        
        let win_href_array = win_href.split("/").filter((val) => val != "");
        // if (this.isLanguageCode(win_href_array)) {
        //     win_href_array.splice(win_href_array.length - 1, 1)
        // }
        win_href = "/" + win_href_array.join("/");
        if (urlCode != '') {
            urlCode = "/" + urlCode
        }
        //if (!preview) {
        //Code for Client side
        if (!isPlatformServer(this.platformId)) {
            this.removeLink("canonical");
            let link: HTMLLinkElement = this.doc.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.doc.head.appendChild(link);
            link.setAttribute('href', domain_href +  win_href + urlCode);

            // this.removeLink("amphtml");
            // let link1: HTMLLinkElement = this.doc.createElement('link');
            // link1.setAttribute('rel', 'amphtml');

            // this.doc.head.appendChild(link1);
            // link1.setAttribute('href', win_href.replace("article","amp/article"));
            //const canonical = document.querySelector("link[rel='canonical']")
            //const head = this.doc.head;

        }

        //Code for Server side
        if (isPlatformServer(this.platformId)) {
            let link: HTMLLinkElement = this.doc.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.doc.head.appendChild(link);
            link.setAttribute('href',  domain_href + win_href + urlCode);

            // let link1: HTMLLinkElement = this.doc.createElement('link');
            // link1.setAttribute('rel', 'amphtml');

            // this.doc.head.appendChild(link1);
            // link1.setAttribute('href', win_href.replace("article","amp/article"));
        }
        //}
    }
    setStyleUrl(filename) {

        let domain_href = this.UTILITIES.domainUrl;

        //Code for Client side
        if (!isPlatformServer(this.platformId)) {
            this.removeLink("canonical");
            let link: HTMLLinkElement = this.doc.createElement('link');

            this.doc.head.appendChild(link);
            link.setAttribute('href', filename);
        }

        //Code for Server side
        if (isPlatformServer(this.platformId)) {
            let link: HTMLLinkElement = this.doc.createElement('link');

            this.doc.head.appendChild(link);
            link.setAttribute('href', domain_href + filename);
        }

    }

    removeTag(attrSelector: string) {
        if (attrSelector) {
            try {
                const renderer = this.rendererFactory.createRenderer(this.doc, {
                    id: '-1',
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    data: {}
                });
                const head = this.doc.head;
                if (head === null) {
                    throw new Error('<head> not found within DOCUMENT.');
                }
                const linkTags = this.doc.querySelectorAll('link[' + attrSelector + ']');
                for (const link of linkTags) {
                    renderer.removeChild(head, link);
                }
            } catch (e) {
                console.log('Error while removing tag ' + e.message);
            }
        }
    }

    addHrefLang(tag: LinkDefinition, forceCreation?: boolean) {

        try {
            const renderer = this.rendererFactory.createRenderer(this.doc, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });
            const link = renderer.createElement('link');
            const head = this.doc.head;
            const selector = this._parseSelector(tag);
            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }

            let removeLink = ""
            Object.keys(tag).forEach((prop: string) => {

                // if(prop=="hreflang" || prop=="href") {
                //     removeLink = prop+"='"+tag[prop]+"'][ prop"+"='"+tag[prop]+"'";
                // }
                removeLink = "hreflang='" + tag["hreflang"] + "'][ href" + "='" + tag["href"] + "'";
                return renderer.setAttribute(link, prop, tag[prop]);
            });

            // [TODO]: get them to update the existing one (if it exists) ?
            this.removeTag(removeLink);
            renderer.appendChild(head, link);

        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }

    private _parseSelector(tag: LinkDefinition): string {
        // Possibly re-work this
        const attr: string = tag.rel ? 'rel' : 'hreflang';
        return `${attr}="${tag[attr]}"`;
    }

}

export declare type LinkDefinition = {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    type?: string;
} & {
    [prop: string]: string;
};
