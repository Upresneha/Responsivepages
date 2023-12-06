import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Testd3Component } from './testd3/testd3.component';
import { ObservableComponent } from './observable/observable.component';
import { AnimationComponent } from './animation/animation.component';
import { DonutComponent } from './donut/donut.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  {
    path: "",
    component: Testd3Component,
  },
  {
    path: "observale",
    component: ObservableComponent,
  },
  {
    path: "animation",
    component: AnimationComponent,
  },
  {
    path: "donut",
    component: DonutComponent,
  },
  {
    path: "charts",
    component: ChartsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
