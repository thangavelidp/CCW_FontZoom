import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ContactDetails } from 'src/app/models/contact-page';
import { SeoService } from 'src/app/services/seo-service';
import { SharedService } from 'src/app/services/shared.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  preview;
  contactForm: FormGroup;
  topicParam;
  contactDetails: ContactDetails = new ContactDetails();
  entryDetails;
  assetsDetails;
  categoryDetails = []
  emailPattern = '/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/';
  categoryArray = ['Join Our team', 'Partner with us', 'Invest in us', 'Others']
  dialCodeDetails = [];

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    private sharedService: SharedService,
    private _SeoService: SeoService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.contactForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      dialcode: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      category: ['', Validators.required],
      message: ['', Validators.required],
      acceptTerms1: [false, Validators.requiredTrue],
      acceptTerms2: [false, Validators.requiredTrue],
    })


    this.getContactData()
  }

  getContactData() {
    this.siteService.getContact(this.preview, this.topicParam).pipe(take(1)).subscribe(data => {
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


          let pageTitle = ("pageTitle" in pageData[0].fields) ? pageData[0].fields.pageTitle : '';
          //   let robots = ("robots" in pageData[0].fields) ? pageData[0].fields.robots : '';
          let shortDescription = ("shortDescription" in pageData[0].fields) ? pageData[0].fields.shortDescription : '';


          let banner = ("banner" in pageData[0].fields) ? pageData[0].fields.banner : {};
          let category = ("category" in pageData[0].fields) ? pageData[0].fields.category : [];
          let dialCode = ("dialCode" in pageData[0].fields) ? pageData[0].fields.dialCode : {};


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

          if(category.length > 0){
            this.categoryDetails = category.map(cat => {
              let catSysId = cat.sys.id;
              let catEntryDetails = this.entryDetails[catSysId];
              let catValue = catEntryDetails.fields.value
              return catValue;
            })            
          }
          if(dialCode.length > 0){
            this.dialCodeDetails = dialCode.map(dc => {
              let dcSysId = dc.sys.id;
              let dcEntryDetails = this.entryDetails[dcSysId];
              let dcValue = dcEntryDetails.fields.value
              return dcValue;
            })            
          }


          this.contactDetails = new ContactDetails(
            bannerDetails
          );
        }
      }
      catch (error) {
      }
    });
  }


  changeCategory(event) {
    this.categorySelect.setValue(event.target.value);

    // let newValue = catValue.split(':')
  }

  changeDialCode(event) {
    this.categorySelect.setValue(event.target.value);

    // let newValue = catValue.split(':')
  }


  get primEmail() {
    return this.contactForm.get('email')
  }
  get categorySelect() {
    return this.contactForm.get('category')
  }


  onSubmit(form: FormGroup) {
    let categoryValue;
    if (this.contactForm.get('category').value != '' || this.contactForm.get('category').value != undefined || this.contactForm.get('category').value != null) {
      let newValue = this.contactForm.get('category').value.split(':');
      categoryValue = newValue[1].trim()

    }
    let body = {
      "firstName": this.contactForm.get('firstname').value,
      "lastName": this.contactForm.get('lastname').value,
      "emailAddress": this.contactForm.get('email').value,
      "dialcode": this.contactForm.get('dialcode').value,
      "mobile": this.contactForm.get('mobile').value,
      "category": categoryValue,
      "message": this.contactForm.get('message').value,
      "acceptTerms1": this.contactForm.get('acceptTerms1').value,
      "acceptTerms2": this.contactForm.get('acceptTerms2').value,
      //    "consentFlag": this.contactForm.controls.legalConsent.value
    }

  }

}
