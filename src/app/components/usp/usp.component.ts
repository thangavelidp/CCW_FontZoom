import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-usp',
  templateUrl: './usp.component.html',
  styleUrls: ['./usp.component.css']
})
export class UspComponent implements OnInit {
@Input() uspDetails;
@Input() sectionTitle;
  constructor() { }

  ngOnInit(): void {
  }

}
