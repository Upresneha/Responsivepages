import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Testd3Component } from './testd3/testd3.component';
import { ObservableComponent } from './observable/observable.component';
import { AnimationComponent } from './animation/animation.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
