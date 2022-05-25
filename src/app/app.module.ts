import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { FooterComponent } from './components/footer/footer.component';

import { MatTabsModule } from '@angular/material/tabs';

import { RouterModule } from '@angular/router';
import { SeoService } from './services/seo-service';
import { SiteService } from './services/site.service';
import { SharedService } from './services/shared.service';
import { VideoLightboxComponent } from './components/video-lightbox/video-lightbox.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import {MatGridListModule} from '@angular/material/grid-list';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxJsonLdModule } from 'ngx-json-ld';

@NgModule({
  declarations: [
    AppComponent,  
    HeaderComponent,
    FooterComponent     
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'ccwApp'
    }),
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    CarouselModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    LazyLoadImageModule,
    NgxJsonLdModule
  ],
  providers: [SeoService, SiteService, SharedService],
  entryComponents: [VideoLightboxComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
