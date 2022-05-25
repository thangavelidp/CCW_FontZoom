import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ComponentsModule } from 'src/app/components/components.module';
import { ArticleLandingComponent } from './article-landing.component';
import { ArticleLandingRoutingModule } from './article-landing-routing.module';
import { PaginationDirective } from 'src/app/directive/pagination-directive';


@NgModule({
  declarations: [
    ArticleLandingComponent,

    PaginationDirective

  ],
  imports: [
    CommonModule,
    ArticleLandingRoutingModule,
    ComponentsModule,
    
    
  ]
})
export class ArticleLandingModule { }
