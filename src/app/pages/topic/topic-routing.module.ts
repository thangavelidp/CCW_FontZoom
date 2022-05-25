import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { TopicComponent } from './topic.component';



const routes: Routes = [
  {
   path:'', component: TopicComponent
  },
  
  {
    path:':id', component: TopicComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
