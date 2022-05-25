import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { ComponentsModule } from 'src/app/components/components.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactComponent    
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    CarouselModule,
    ComponentsModule,
    CarouselModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }
