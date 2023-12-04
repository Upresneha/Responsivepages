import { Component, ElementRef, ViewChild } from '@angular/core';
import { Plot } from "@observablehq/plot";



@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent {

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  ngOnInit(): void {


  }


}
