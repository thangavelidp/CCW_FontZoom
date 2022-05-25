import { Component, OnInit, Input } from '@angular/core';
import { UTILITIES } from 'src/app/utils/ccw-utils';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
})
export class ParagraphComponent implements OnInit {
  @Input() paragraphContent;
  @Input() pageTitle;
  @Input() articleType;
  tableContent;
  @Input() articleAuthorProfile;
  showAccordion: boolean = false;
  isHidden = false;
  isWebpImage = '';
  schema = {};


  private isOpen: boolean = false;
  private tips: Array<any> = []

  closeAllTips(): void {
    this.paragraphContent.forEach((content, index) => {
      let title = content.title;
      if (title == '') {
        content.isOpen = true;
      }
      else {
        content.isOpen = false;
      }
    });
  }

  showContent(tip) {
    if (!tip.isOpen) {
      this.closeAllTips();
    }
    tip.isOpen = !tip.isOpen;
  }

  constructor(public utilities: UTILITIES) {

  }

  ngOnInit() {
    if (this.articleType == "Legal notices") {
      this.showAccordion = true;
      if (this.paragraphContent[0] != undefined) {
        if (this.paragraphContent[0].title == '') {
          this.paragraphContent[0].isOpen = true
        }
      }
    }
    this.paragraphContent.map(tableArray => {  
      this.tableContent = tableArray.tableArray.map(table => {
        if (table[3].includes("completed")) {
          table[3] = table[3].replace("completed", "<img src=/assets/icons/completed.svg alt=Completed title=Completed>")
        }
        if (table[3].includes("in progress")) {
          table[3] = table[3].replace("in progress", "<img src=/assets/icons/inprogress.svg alt=in progress title=In-progress>")
        }
        return table
      })
    })
    this.isWebpImage = this.utilities.setWebPImg();  

  }


}






