import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3'
import * as d3sc from 'd3-scale-chromatic'
import { AppState } from '../../../app.service';
import * as topojson from 'topojson'

@Component({
  selector: 'chloropeth',
  styleUrls: [
    './chloropeth.component.css'
  ],
  templateUrl: `./chloropeth.component.html`,
  encapsulation: ViewEncapsulation.None
})
export class ChloropethComponent implements OnInit, OnChanges {
  @ViewChild('chloropeth') private mapContainer: ElementRef;
  @Input() private data: any;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private map: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor(
    public appState: AppState
  ) { }

  ngOnInit() {

    this.createChart();
  }

  ngOnChanges() {

  }

  createChart() {
    let element = this.mapContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    console.log(this.data)

    var world = topojson.feature(this.data.data, this.data.data.objects['world-palestine-highres.geo']);
    console.log(world)

    var surveyDataMap = d3.map();


    //     "Country": "Afghanistan",
    // "population": 32,
    // "subscriptionsPerHundred": 74.9,
    // "Adults": 10,
    // "percentIlliterateWomen": 899,
    // "percentIlliterateYouth": "61%",
    // "fi": "26%",
    // "field8": "10%"

    for (let item of this.data.results.result) {
      surveyDataMap.set(item["Country"], item)
    }
    console.log(surveyDataMap.size(), "size")

    // var projection = d3.geoMercator()
    // //.center([100,100])
    // .scale(10)
    // .translate([this.width / 2, this.height / 2]);

    let scale = (scaleFactor) => {
      return d3.geoTransform({
        point: function (x, y) {
          this.stream.point(x * scaleFactor, y * -scaleFactor);
        }
      });
    }

    var path = d3.geoPath().projection(scale(.08));

    var x = d3.scaleLinear()
      .domain([1, 10])
      .rangeRound([600, 860]);

    // var color = d3.scaleThreshold()
    //   .domain(d3.range(2, 10)).range(new Array<number>(8).map((val,i)=>d3sc.interpolateRdYlBu(i/8)))
    var colorFade = d3.scaleSequential(d3sc.interpolateRdYlBu);
    var primitiveColors = { white: "#fff", whitesmoke:"whitesmoke" }

    // var color = d3.scaleThreshold()
    //   .domain([0, 1])
    //   .range(<any>d3.schemeCategory10[1]);

    var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,40)");


    g.selectAll("rect")
      .data(Array(8).fill(null).map((d, i) => { return { color: colorFade(i / 8), index: i } }))
      .enter().append("rect")
      .attr("height", 8)
      .attr("x", function (d) { return x(d.index); })
      .attr("width", function (d) { return x(d.index + 1) - x(d.index); })
      .attr("fill", function (d) { return d.color; });

    g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Unemployment rate");

    // g.call(d3.axisBottom(x)
    //   .tickSize(13)
    //   .tickFormat(function (x, i) { return i ? x : x + "%"; })
    //   .tickValues(color.domain()))
    //   .select(".domain")
    //   .remove();

    // d3.queue()
    //   .defer(d3.json, "https://d3js.org/us-10m.v1.json")
    //   // .defer(d3.tsv, "unemployment.tsv", function (d) { unemployment.set(d.id, +d.rate); })
    //   .await(ready);

    // function ready(error, us) {
    //   if (error) throw error;

    function colorFiller(country) {
      let value = surveyDataMap.get(country)
      if (!value) {
        return primitiveColors.whitesmoke;
      }
      return colorFade(parseInt(value["percentIlliterateYouth"]) / 100)
    }

    svg.append("g")
      .attr("class", "counties")
      .attr('transform', `translate(235, 900)`)
      .selectAll("path")
      .data(world.features)
      .enter().append("path")
      .attr("fill", function (d, i) { return colorFiller(d["properties"].name) })
      .attr("d", path)
      .append("title")
    // .text(function (d) { return d.rate + "%"; });

    // svg.append("path")
    //   .datum(topojson.mesh(this.data, this.data.objects["countries.geo"], function (a, b) { return a !== b; }))
    //   .attr("class", "states")
    //   .attr("d", path);




    /*
        // var projection = d3.geoMercator()
        //   .center([0, 55.4])
        //   .rotate([4.4, 0])
        //   //  .parallels([50, 60])
        //   .scale(10)
        // //.translate([this.width / 2, this.height / 2])
    
        var albersProjection = d3.geoAlbers()
          .scale(190000)
          .rotate([71.057, 0])
          .center([0, 42.313])
          .translate([this.width / 2, this.height / 2]);
    
        // Create GeoPath function that uses built-in D3 functionality to turn
        // lat/lon coordinates into screen coordinates
        var geoPath = d3.geoPath()
          .projection(albersProjection);
    
        // svg.append("path")
        //   .datum(world)
        //   .attr("d", path);
        var color = d3.schemeCategory10;
    
        svg.append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(world.features)
          .enter().append("path")
          .attr("fill", function (d, i) { return color[i] })
          .attr("d", geoPath)
          .style("stroke-width", "1.5px")
          .attr("stroke", "#333")
    
        // svg.append("path")
        //   .datum(topojson.mesh(this.data, this.data.objects['world-palestine-highres.geo'], function (a, b) { return a == b; }))
        //   .attr("d", path)
        //   .attr("fill", function (d,i) { return color[i] })
        //   .style("stroke-width", "1.5px");
    
        // var subs = svg.selectAll('.blah')
        //   .enter().append("path")
        //   .attr("class", function (d:any) { return "subunit" + d.id; })
        //   .attr("d", path);
    
    
    
        // // chart plot area
        // svg.append('g')
        //   .attr('class', 'chloropeth')
        //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    
        // svg.append("path")
        //   .datum(topojson.feature(this.data, this.data.objects['asia.geo']))
        //   .attr("d", d3.geoPath().projection(d3.geoMercator()));
    */
    console.log(svg, "svg test");
  }




  // createChart() {
  //   let element = this.mapContainer.nativeElement;
  //   this.width = element.offsetWidth - this.margin.left - this.margin.right;
  //   this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
  //   let svg = d3.select(element).append('svg')
  //     .attr('width', element.offsetWidth)
  //     .attr('height', element.offsetHeight);

  //   // chart plot area
  //   this.map = svg.append('g')
  //     .attr('class', 'bars')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  //   // define X & Y domains
  //   let xDomain = this.data.map(d => d[0]);
  //   let yDomain = [0, d3.max(this.data, d => d[1])];

  //   // create scales
  //   this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
  //   this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

  //   // bar colors
  //   this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

  //   // x & y axis
  //   this.xAxis = svg.append('g')
  //     .attr('class', 'axis axis-x')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
  //     .call(d3.axisBottom(this.xScale));
  //   this.yAxis = svg.append('g')
  //     .attr('class', 'axis axis-y')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
  //     .call(d3.axisLeft(this.yScale));
  // }

  // updateMap() {
  //   // update scales & axis
  //   this.xScale.domain(this.data.map(d => d[0]));
  //   this.yScale.domain([0, d3.max(this.data, d => d[1])]);
  //   this.colors.domain([0, this.data.length]);
  //   this.xAxis.transition().call(d3.axisBottom(this.xScale));
  //   this.yAxis.transition().call(d3.axisLeft(this.yScale));

  //   let update = this.map.selectAll('.bar')
  //     .data(this.data);

  //   // remove exiting bars
  //   update.exit().remove();

  //   // update existing bars
  //   this.map.selectAll('.bar').transition()
  //     .attr('x', d => this.xScale(d[0]))
  //     .attr('y', d => this.yScale(d[1]))
  //     .attr('width', d => this.xScale.bandwidth())
  //     .attr('height', d => this.height - this.yScale(d[1]))
  //     .style('fill', (d, i) => this.colors(i));

  //   // add new bars
  //   update
  //     .enter()
  //     .append('rect')
  //     .attr('class', 'bar')
  //     .attr('x', d => this.xScale(d[0]))
  //     .attr('y', d => this.yScale(0))
  //     .attr('width', this.xScale.bandwidth())
  //     .attr('height', 0)
  //     .style('fill', (d, i) => this.colors(i))
  //     .transition()
  //     .delay((d, i) => i * 10)
  //     .attr('y', d => this.yScale(d[1]))
  //     .attr('height', d => this.height - this.yScale(d[1]));
  // }
}
