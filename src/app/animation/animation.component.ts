import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent {

  @ViewChild('chart', { static: true })
  private chartContainer?: ElementRef;


  private data = [
    { "Framework": "Vue", "Stars": "166443", "Released": "2014" },
    { "Framework": "React", "Stars": "150793", "Released": "2013" },
    { "Framework": "Angular", "Stars": "62342", "Released": "2016" },
    { "Framework": "Backbone", "Stars": "27647", "Released": "2010" },
    { "Framework": "Ember", "Stars": "21471", "Released": "2011" },
    { "Framework": "Svelte", "Stars": "42493", "Released": "2016" },
    { "Framework": "Aurelia", "Stars": "7862", "Released": "2014" },
    { "Framework": "Polymer", "Stars": "21694", "Released": "2013" },
    { "Framework": "Mithril", "Stars": "8952", "Released": "2013" },
    { "Framework": "Preact", "Stars": "29332", "Released": "2015" }
  ];

  private svg!: any
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private margin2: { top: number, bottom: number, left: number; right: number } = { top: 20, bottom: 30, left: 30, right: 20 };
  private readonly xScale!: d3.ScaleLinear<number, number, never>;
  private readonly yScale!: d3.ScaleLinear<number, number, never>;
  private readonly data2!: Array<{ x: number; y: number }>;

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    this.drawHistogram(this.data)


  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    //  the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.2);

    // the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars with animations
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Framework))
      .attr("y", this.height) // Set initial y position to create a rising animation
      .attr("width", x.bandwidth())
      .attr("height", 0) // Set initial height to create a growing animation
      .attr("fill", "#d04a35")
      .transition() // Add a transition for smooth animations
      .duration(1000) // Set the duration of the animation in milliseconds
      .attr("y", (d: any) => y(d.Stars))
      .attr("height", (d: any) => this.height - y(d.Stars));
  }


  private drawHistogram(data: any[]): void {

    this.svg = d3.select("figure#histogramContainer")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    //  the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.2);

    //  X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    //  Y-axis linear scale
    const y = d3.scaleLinear()
      .domain([0, d3.min(data, (d: any) => d.Stars)])
      .range([this.height, 0]);

    //  Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    //  fill the bars
    this.svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Framework))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.Stars))
      .attr("fill", "#d04a68")
      .transition()
      .duration(1000)
      .attr("y", (d: any) => y(d.Stars))
      .attr("height", (d: any) => this.height - y(d.Stars));
  }



}


