import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from 'src/app/components/components.module';
import { TopicComponent } from './topic.component';
import { TopicRoutingModule } from './topic-routing.module';

@NgModule({
    declarations: [
        TopicComponent,
    ],
    imports: [
        CommonModule,
        TopicRoutingModule,
        CarouselModule,
        ComponentsModule,
        CarouselModule
    ]
})
export class TopicModule { }
