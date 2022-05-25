import { Component, Input, OnInit } from '@angular/core';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-static-map',
  templateUrl: './static-map.component.html',
  styleUrls: ['./static-map.component.css']
})
export class StaticMapComponent implements OnInit {
  @Input() sectionTitle;
  @Input() staticMap;
  defaultImage = '/assets/img_px.gif';
  viewMode;
  selected;
  selectedItem;
  public currentIndex = 0;
  status: boolean = true;
  isWebpImage = '';
  selectedTitle = 'Overview';
  constructor(
    public utilities: UTILITIES
  ) { }

  ngOnInit(): void {
    this.viewMode = "tab1";
    this.isWebpImage = this.utilities.setWebPImg();
    
  }
  onselected() {
    this.selected = !this.selected;
  }

  listClick(event, newValue) {
    this.selectedItem = newValue;
  }
  selectTab(index) {
    this.currentIndex = index;
  }

  clickEvent() {
    this.status = !this.status;
    //console.log("this.selectedItem", this.selectedItem)
    this.selectedTitle = this.selectedItem.title
  //  console.log("this.selectedItem", this.selectedTitle)
  }


}
