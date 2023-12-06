import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  host: { '(window: resize)': 'onResize($event)' }

})
export class ChartsComponent {
  constructor() {
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
    this.data = this.createData();
  }

  // inject the svg element
  @ViewChild('chart', { static: true })
  private chartContainer?: ElementRef;
  private margin: { top: number, bottom: number, left: number; right: number } = { top: 20, bottom: 30, left: 30, right: 20 };
  private readonly xScale: d3.ScaleLinear<number, number, never>;
  private readonly yScale: d3.ScaleLinear<number, number, never>;
  private readonly data: Array<{ x: number; y: number }>;

  ngOnInit(): void {

    // d3 selection for the svg element

    const svg = d3.select(this.chartContainer?.nativeElement);

    const contentGroup = svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);


    this.xScale

      .rangeRound([0, this.innerWidth()])
      .domain(d3.extent<number>(this.data.map(d => d.x)) as number[]);

    this.yScale
      // adjust to the available screen area
      .rangeRound([this.innerHeight(), 0])
      // adjust to the available screen area
      .domain([0, d3.max(this.data, (d) => d.y * 1.1) as number]);

    /*
      Append X- and Y-Axis
        x-axis:
          The text of it will in the space that is reserved by our margin.
          Move the axis to the bottom of the cart with a translation.
     */
    contentGroup.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));
    // bottom: text will be shown below the line

    contentGroup.append('g')
      .attr('id', 'y-axis')
      .call(d3.axisLeft(this.yScale));
    // left: text will be shown left of the line

    /*
         adding a circle to our chart
     */
    contentGroup.selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d: { x: d3.NumberValue; }) => this.xScale(d.x))
      .attr('cy', (d: { y: d3.NumberValue; }) => this.yScale(d.y))
      .attr('r', 2)
      .attr('fill', 'dimgray');
  }

  private innerWidth(): number {
    return this.chartContainer?.nativeElement.clientWidth
      - this.margin.left - this.margin.right;
  }

  private innerHeight(): number {
    return this.chartContainer?.nativeElement.clientHeight
      - this.margin.top - this.margin.bottom;
  }

  private createData(): Array<{ x: number, y: number }> {
    const data: Array<{ x: number, y: number }> = [];
    for (let alpha = 0; alpha <= Math.PI * 8; alpha += 0.1) {
      data.push({
        x: alpha * 10,
        y: Math.sin(alpha) * 50 + 60,
      });
    }
    return data;

  }

  // Resixe function for responsive
  onResize(event: any) {
    const svg = d3.select(this.chartContainer?.nativeElement);

    // new dimensions
    this.xScale.rangeRound([0, this.innerWidth()]);
    this.yScale.rangeRound([this.innerHeight(), 0]);

    svg.select<SVGGElement>('#x-axis')
      .transition().ease(d3.easePolyInOut).duration(500)
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));

    svg.select<SVGGElement>('#y-axis')
      .transition().ease(d3.easePolyInOut).duration(500)
      .call(d3.axisLeft(this.yScale));

    // reposition or circles
    svg.selectAll('circle')
      .transition().ease(d3.easePolyInOut).duration(500)
      .attr('cx', d => this.xScale((d as { x: number }).x))
      .attr('cy', d => this.yScale((d as { y: number }).y));
  }
}
