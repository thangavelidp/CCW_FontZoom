import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
@Input() authorDetails;
  constructor() { }

  ngOnInit(): void {
    // if(this.authorDetails.image == null){
    //   this.authorDetails.image.imageUrl = 'http://images.ctfassets.net/8bbwomjfix8m/1118E5baybw1OKQ9jeqHDt/ef07a28e02cfc969eb130df7d688181d/idp-logo.svg'
    // }
  }

}
