import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
@Input() breadCrumb;
@Input() topicType;
topicBc = false
  constructor() { }

  ngOnInit(): void {
    if(this.topicType == 'Our Board of Directors' || this.topicType == 'Our leaders' || this.topicType == 'What it means to work in IDP'){
      this.topicBc = true
    }
  }

}
