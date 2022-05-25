import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ArticleLandingComponent } from './article-landing.component';




const routes: Routes = [
  {
   path:'', component: ArticleLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleLandingRoutingModule { }
