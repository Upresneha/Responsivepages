import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { Chartdata, LineData } from '../interface/chartdata';

@Component({
  selector: 'app-bar2',
  templateUrl: './bar2.component.html',
  styleUrls: ['./bar2.component.css']
})
export class Bar2Component {

  @Input()
  chartName: string = 'bar';
  @Input()
  data: Chartdata = {} as Chartdata;

  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;


  private createSvg(): void {
    this.svg = d3
      .select(`figure#${this.chartName}`)
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: Chartdata): void {
    //  X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.lineData.map((d: LineData) => d.label))
      .padding(0.2);

    //  X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    //  Y-axis band scale
    const y = d3.scaleLinear().domain([0, data.yrange]).range([this.height, 0]);

    //  Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // fill the bars
    this.svg
      .selectAll('bars')
      .data(data.lineData)
      .enter()
      .append('rect')
      .attr('x', (d: LineData) => x(d.label))
      .attr('y', (d: LineData) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.value))
      .attr('fill', '#d04a35');
  }

  ngAfterViewInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

}
