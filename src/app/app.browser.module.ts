import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppModule } from './app.module';
import { SeoService } from './services/seo-service';
import { UTILITIES }  from './utils/ccw-utils';
import { SiteService } from './services/site.service';
import { SharedService } from './services/shared.service';


documentToHtmlString
@NgModule({
  imports: [
     BrowserModule.withServerTransition({
          appId: 'serverApp'
    }),
    AppRoutingModule,
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppModule,
    BrowserTransferStateModule,
    
  ],
  providers: [
    SiteService,SharedService,UTILITIES
 ],
  bootstrap: [AppComponent],
  
})
export class AppBrowserModule { }
