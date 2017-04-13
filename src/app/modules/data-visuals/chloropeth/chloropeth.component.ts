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

  private parameters;
  private selectedParam: any;

  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private map: any;
  private width: number;
  private height: number;

  private worldData;
  private countries;
  private legend;
  private legendX;

  private primitiveColors = { white: "#fff", whitesmoke: "whitesmoke" }


  constructor(
    public appState: AppState
  ) {
    this.colorFiller = this.colorFiller.bind(this);
  }


  ngOnInit() {
    this.worldData = topojson.feature(this.data.data, this.data.data.objects['world-palestine-highres.geo']);
    this.parameters = this.data.results.result.params;
    this.selectedParam = this.parameters[1]
    this.createMap();
  }

  ngOnChanges() {
    console.log("changed param")
  }

  createMap() {
    let world = this.worldData;
    let param = this.selectedParam;
    let primColors = this.primitiveColors;
    let colorFiller = this.colorFiller;

    let countriesMap = d3.map();
    this.map = countriesMap;


    let element = this.mapContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);


    for (let item of this.data.results.result.data) {
      countriesMap.set(item["country"], item)
    }

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

    this.legendX = x;

    // var color = d3.scaleThreshold()
    //   .domain(d3.range(2, 10)).range(new Array<number>(8).map((val,i)=>d3sc.interpolateRdYlBu(i/8)))
    var colorFade = d3.scaleSequential(d3sc.interpolateRdYlBu);

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


    this.legend = g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(param.text);

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



    this.countries = svg.append("g");
    this.countries.attr("class", "countries")
      .attr('transform', `translate(180, 900)`)
      .selectAll("path")
      .data(world.features)
      .enter().append("path")
      .attr("d", path)
      .attr("fill", function (d, i) { return colorFiller(d["properties"].name) })
      .append('div').attr('class', 'country-tooltip').text((d) => d["properties"].name)
    // .text(function (d) { return d.rate + "%"; });

    // svg.append("path")
    //   .datum(topojson.mesh(this.data, this.data.objects["countries.geo"], function (a, b) { return a !== b; }))
    //   .attr("class", "states")
    //   

    console.log(svg, "svg test");
  }


  updateMap() {
    let param = this.selectedParam;
    let colorFiller = this.colorFiller;

    let x = this.legendX;

    this.legend.attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(param.text);


    this.countries.attr("class", "countries")
      .attr('transform', `translate(180, 900)`)
      .selectAll("path")
      .attr("fill", function (d, i) { return colorFiller(d["properties"].name) })

  }


  colorFiller(country) {
    let colorFade = d3.scaleSequential(d3sc.interpolateRdYlBu);
    let map = this.map
    let value = map.get(country)
    if (!value) {
      return this.primitiveColors.whitesmoke;
    }
    return colorFade(parseInt(value[this.selectedParam.name]) / 100)
  }

  updateSelectedParam($event) {
    this.selectedParam = this.parameters[$event.srcElement.getAttribute('index')]
    this.updateMap()
  }

}
