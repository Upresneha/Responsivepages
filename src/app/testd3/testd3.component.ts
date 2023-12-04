import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../services/data.service';
import { Chartdata } from '../interface/chartdata';
import { Router } from '@angular/router';


@Component({
  selector: 'app-testd3',
  templateUrl: './testd3.component.html',
  styleUrls: ['./testd3.component.css']
})
export class Testd3Component {
  multipleChart = false

  constructor(private router: Router) { }

  navigateToOtherComponent() {
    // Navigate to another component (assuming there's a route configured for it)
    this.router.navigate(['/animation']);
  }

  multipleCharts() {
    this.multipleChart = true

  }

  chartData_2D_1: Chartdata = {
    yrange: 200000,
    lineData: [
      { label: 'Python', value: 166443 },
      { label: 'JAVA', value: 150793 },
      { label: 'Angular', value: 62342 },
      { label: 'C++', value: 27647 },
      { label: 'Ember', value: 21471 },
    ],
  };

}
