import { NgModule} from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { UTILITIES } from './utils/ccw-utils';



@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
  ],
  providers: [
    UTILITIES
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
