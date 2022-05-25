import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { hubPageMatcher } from 'src/app/app-routing.module';
import { HubComponent } from './hub.component';

const routes: Routes = [
  {
   path:'', component: HubComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubRoutingModule { }
