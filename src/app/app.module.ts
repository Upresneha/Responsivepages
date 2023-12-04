import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Testd3Component } from './testd3/testd3.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';
import { Bar2Component } from './bar2/bar2.component';
import { ObservableComponent } from './observable/observable.component';
import { AnimationComponent } from './animation/animation.component';
import { DonutComponent } from './donut/donut.component';

@NgModule({
  declarations: [
    AppComponent,
    Testd3Component,
    BarComponent,
    PieComponent,
    ScatterComponent,
    Bar2Component,
    ObservableComponent,
    AnimationComponent,
    DonutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
