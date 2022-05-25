import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from 'src/app/components/components.module';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxJsonLdModule } from 'ngx-json-ld';



@NgModule({
  declarations: [
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    CarouselModule,
    ComponentsModule,
    CarouselModule,
    MatExpansionModule,
    NgxJsonLdModule

  ]
})
export class ArticleModule { }
