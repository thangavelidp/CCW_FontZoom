import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { gtmConst } from 'src/app/shared/constants';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-herobanner',
  templateUrl: './herobanner.component.html',
  styleUrls: ['./herobanner.component.css']
})
export class HerobannerComponent implements OnInit {
  @Input() banner;
  @Input() pageName;
  isWebpImage = '';
  constructor(
    private sharedService: SharedService,
    public utilities: UTILITIES
  ) { }
  defaultImage = '/assets/img_px.gif';
  ngOnInit(): void {
    this.isWebpImage = this.utilities.setWebPImg();
  }

  bannerGtm(label) {
    if (label != '') {
   this.sharedService.eventTrack(gtmConst.eventName.events, gtmConst.category.interaction, gtmConst.action.cta, this.pageName + ' - ' + label);
   // console.log("testGtm", testGtm)
    }
  }






}
