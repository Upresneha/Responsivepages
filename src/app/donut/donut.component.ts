import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { IData } from '../interface/chartdata';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent {
  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  ngOnInit() {
    const diameter = 860;
    const radius = diameter / 2;
    const innerRadius = radius - 170;


    const cluster = d3.cluster()
      .size([360, innerRadius]);


    const line = d3.lineRadial<any>()
      .curve(d3.curveBundle.beta(0.85))
      .radius((d) => d.y)
      .angle((d) => d.x / 180 * Math.PI);


    const svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);


    let link: any, node: any;

    d3.json<any>('../../assets/serviceNet.json').then((classes) => {
      const root = packageHierarchy(classes)
        .sum((d) => d.size);

      cluster(root);

      link = svg.append('g')
        .selectAll('.link')
        .data(packageImports(root.leaves()))
        .enter().append('path')
        .each((d: any) => { d.source = d[0], d.target = d[d.length - 1]; })
        .attr('class', 'link')
        .attr('d', line);

      node = svg.append('g')
        .selectAll('.node')
        .data(root.leaves())
        .enter().append('text')
        .attr('class', 'node')
        .attr('dy', '0.31em')
        .attr('transform', (d: any) => `rotate(${d.x - 90})translate(${d.y + 8},0)${d.x < 180 ? '' : 'rotate(180)'}`)
        .attr('text-anchor', (d: any) => (d.x < 180 ? 'start' : 'end'))
        .text((d: any) => d.data.key)
        .on('mouseover', mouseovered.bind(this))
        .on('mouseout', mouseouted.bind(this));
    });

    function mouseovered(d: any) {
      node.each((n: any) => { n.target = n.source = false; });

      link
        .classed('link--target', (l: any) => {
          if (l.target.data === d.target.__data__.data) {
            l.source.source = true;
            return true;
          }
          return false;
        })
        .classed('link--source', (l: any) => {
          if (l.source.data === d.target.__data__.data) {
            l.target.target = true;
            return true;
          }
          return false;
        })
        .filter((l: any) => l.target.data === d || l.source.data === d)
        .raise();

      node
        .classed('node--target', (n: any) => n.target)
        .classed('node--source', (n: any) => n.source);
    }

    function mouseouted() {
      link
        .classed('link--target', false)
        .classed('link--source', false);

      node
        .classed('node--target', false)
        .classed('node--source', false);
    }


    function packageHierarchy(classes: any[]) {
      const map: { [key: string]: any } = {};

      function find(name: string, data?: { name: string; children: any[] }) {
        let node = map[name];
        let i: number;
        if (!node) {
          node = map[name] = data || { name: name, children: [] };
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf('.')));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }

      classes.forEach((d) => {
        find(d.name, d);
      });

      return d3.hierarchy(map['']);
    }

    function packageImports(nodes: any[]) {
      const map: { [key: string]: any } = {};
      const imports: any[] = [];

      // Compute a map from name to node.
      nodes.forEach((d) => {
        map[d.data.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach((d) => {
        if (d.data.imports) {
          d.data.imports.forEach((i: string | number) => {
            imports.push(map[d.data.name].path(map[i]));
          });
        }
      });

      return imports;
    }
  }
}