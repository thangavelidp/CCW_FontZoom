import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubComponent } from './hub.component';
import { HubRoutingModule } from './hub-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from 'src/app/components/components.module';
import { LazyLoadImageModule} from 'ng-lazyload-image'; 

@NgModule({
  declarations: [
    HubComponent,
    
  ],
  imports: [
    CommonModule,
    HubRoutingModule,
    CarouselModule,
    ComponentsModule,
    CarouselModule,
    LazyLoadImageModule
  ]
})
export class HubModule { }
