import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent {
  @ViewChild('donutChart', { static: true }) private chartContainer!: ElementRef;

  private margin = { top: 200, right: 50, bottom: 20, left: 50 };
  private width!: number;
  private height!: number;

  private svg: any;
  private chart: any;
  private radius!: number;

  private data: any[] = [
    { label: 'Category A', value: 30 },
    { label: 'Category B', value: 50 },
    { label: 'Category C', value: 20 },
    { label: 'Category D', value: 40 },
    { label: 'Category E', value: 20 },
    { label: 'Category F', value: 60 },
    { label: 'Category g', value: 20 },
    { label: 'Category h', value: 60 }
  ];

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  private createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;

    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth + 1000)
      .attr('height', element.offsetHeight + 100);

    this.chart = this.svg.append('g')
      .attr('transform', `translate(${this.width / 2 + this.margin.left},${this.height / 2 + this.margin.top})`);

    this.createDonutChart();
  }

  private createDonutChart() {
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d: any) => d.value);

    const arc = d3.arc()
      .innerRadius(this.radius * 0.67)
      .outerRadius(this.radius - 1);

    const arcs = this.chart.selectAll('arc')
      .data(pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    const bluesColorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, this.data.length]);


    arcs.append('path')

      .attr('d', arc)
      .attr('fill', (d: any, i: number) => bluesColorScale(i))
      .append('title')
      .text((d: { data: { name: any; value: { toLocaleString: () => any; }; }; }) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    // Add labels
    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d: any) => d.data.label)
      .style('text-anchor', 'middle');
  }

}