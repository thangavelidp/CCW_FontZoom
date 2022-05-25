import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared.service';
import { gtmConst } from 'src/app/shared/constants';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-join-our-team',
  templateUrl: './join-our-team.component.html',
  styleUrls: ['./join-our-team.component.css']
})
export class JoinOurTeamComponent implements OnInit {
  defaultImage = '/assets/img_px.gif';
  @Input() featurette;
  @Input() sectionTitle;
  @Input() pageName;
  isWebpImage = '';
  constructor(
    public sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: any,
    private sharedService: SharedService,
    public utilities: UTILITIES
  ) { }
  youtubeUrl;
  youtubeUrlContainer: boolean = false;
  ngOnInit(): void {
    this.featurette.map(feature => {
      if (feature.video != undefined) {
        this.youtubeUrlContainer = true;
        if (feature.video.videoUrl != undefined && feature.video.videoUrl.includes("https:")) {
          this.youtubeUrl = feature.video.videoUrl;
          this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(feature.video.videoUrl + '?autoplay=0');
        }
      }

    })
    this.isWebpImage = this.utilities.setWebPImg();
  }

  /**
   * @see bannerCtaTrack Method to track banner cta information in GA
   * @version 1.0
   */
  gtmPush(label) {
    if (label != '') {
      this.sharedService.eventTrack(gtmConst.eventName.events, gtmConst.category.interaction, gtmConst.action.cta, this.pageName + ' - ' + label);
    }


  }

}
