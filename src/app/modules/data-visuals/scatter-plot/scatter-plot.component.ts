import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3'
import * as d3sc from 'd3-scale-chromatic'
import { AppState } from '../../../app.service';
import * as topojson from 'topojson'

@Component({
  selector: 'scatter-plot',
  styleUrls: [
    './scatter-plot.component.css'
  ],
  templateUrl: `./scatter-plot.component.html`,
  encapsulation: ViewEncapsulation.None
})
export class ScatterPlotComponent implements OnInit, OnChanges {
  @ViewChild('scatterPlot') private plotContainer: ElementRef;
  @Input() private data: any;

  private parameters;
  private selectedParamX: any;
  private selectedParamY: any;
  private selectedParamR: any;

  private margin: any = { top: 50, right: 300, bottom: 200, left: 50 };
  private countrySet: any;
  private width: number;
  private height: number;

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
    this.parameters = this.data.results.result.params;
    this.selectedParamX = this.parameters[0]
    this.selectedParamY = this.parameters[1]
    this.selectedParamR = this.parameters[2]
    this.createPlot();
  }

  ngOnChanges() {
    console.log("changed param")
  }

  createPlot() {
    let paramX = this.selectedParamX;
    let paramY = this.selectedParamY
    let primColors = this.primitiveColors;
    let colorFiller = this.colorFiller;
    let data = this.data.results.result.data.slice(10,20)
    let countriesMap = d3.map();
    this.countrySet = countriesMap;

    for (let item of data) {
      countriesMap.set(item["country"], item)
      item[this.selectedParamX] = +item[this.selectedParamX]
      item[this.selectedParamY] = +item[this.selectedParamY]
      item[this.selectedParamR] = +item[this.selectedParamR]
    }

    let element = this.plotContainer.nativeElement;
    console.log(element.offsetWidth, element.offsetHeight);

    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    var outerWidth = 1050,
      outerHeight = 600;

    this.width = outerWidth - this.margin.left - this.margin.right
    this.height = outerHeight - this.margin.top - this.margin.bottom;


    var x = d3.scaleLinear()
      .range([0, this.width]).nice()

    var y = d3.scaleLinear()
      .range([this.height, 0]).nice();

    var xCat = this.selectedParamX.name,
      yCat = this.selectedParamY.name,
      rCat = this.selectedParamR.name,
      colorCat = "country";

    // d3.csv("cereal.csv", function (data) {
    //   data.forEach(function (d) {
    //     d.Calories = +d.Calories;
    //     d.Carbs = +d.Carbs;
    //     d["Cups per Serving"] = +d["Cups per Serving"];
    //     d["Dietary Fiber"] = +d["Dietary Fiber"];
    //     d["Display Shelf"] = +d["Display Shelf"];
    //     d.Fat = +d.Fat;
    //     d.Potassium = +d.Potassium;
    //     d["Protein (g)"] = +d["Protein (g)"];
    //     d["Serving Size Weight"] = +d["Serving Size Weight"];
    //     d.Sodium = +d.Sodium;
    //     d.Sugars = +d.Sugars;
    //     d["Vitamins and Minerals"] = +d["Vitamins and Minerals"];
    //   });


    let xMax = d3.max(data, function (d) { return +d[xCat]; }) * 1.05,
      xMin = d3.min(data, function (d) { return +d[xCat]; });


    let yMax = d3.max(data, function (d) { return +d[yCat]; }) * 1.05,
      yMin = d3.min(data, function (d) { return +d[yCat]; })


    xMin = xMin > 0 ? 0 : xMin
    yMin = yMin > 0 ? 0 : yMin;

    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);

    var xAxis = d3.axisBottom(x)
      .tickSize(-this.height);

    var yAxis = d3.axisLeft(y)
      .tickSize(-this.width);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // var tip = d3.tool
    //   .attr("class", "d3-tip")
    //   .offset([-10, 0])
    //   .html(function (d) {
    //     return xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat];
    //   });

    // let change = function () {
    //   xCat = "Carbs";
    //   xMax = d3.max(data, function (d) { return +d[xCat]; });
    //   xMin = d3.min(data, function (d) { return +d[xCat]; });

    //   zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

    //   var svg = d3.select("#scatter").transition();

    //   svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);

    //   objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
    // }

    let zoom = function () {
      svg.select(".x.axis").call(xAxis);
      svg.select(".y.axis").call(yAxis);

      svg.selectAll(".dot")
        .attr("transform", transform);

      // view.attr("transform", d3.event.transform);
      // gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
      // gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
    }

    let transform = function (d) {
      return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
    }
    var zoomBeh = d3.zoom()
      .scaleExtent([0, 500])
      .on("zoom", zoom);

    var svg = d3.select(element)
      .append("svg")
      .attr("width", "100%")
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      .call(zoomBeh);

    // svg.call(tip);

    svg.append("rect")
      .attr("width", this.width)
      .attr("height", this.height);

    svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + this.height + ")")
      .call(xAxis)
      .append("text")
      .classed("label", true)
      .attr("x", this.width - 300)
      .attr("y", this.margin.bottom - 10)
      .style("text-anchor", "end")
      .text(xCat);

    svg.append("g")
      .classed("y axis", true)
      .call(yAxis)
      .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin.left)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(yCat);

    var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", this.width)
      .attr("height", this.height);

    objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", this.width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + this.height + ")");

    objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", this.height);

    objects.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .classed("dot", true)
      .attr("r", function (d) { return 5 /* 6 * Math.sqrt(d[rCat] / Math.PI); */ })
      .attr("transform", transform)
      .style("fill", function (d) { return color(d[colorCat]); })
    // .on("mouseover", tip.show)
    // .on("mouseout", tip.hide);

    var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .classed("legend", true)
      .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("circle")
      .attr("r", 3.5)
      .attr("cx", this.width + 20)
      .attr("fill", color);

    legend.append("text")
      .attr("x", this.width + 26)
      .attr("dy", ".35em")
      .text(function (d) { return d; });

    console.log(svg, "svg test");
  }


  updateMap() {
    // let param = this.selectedParam;
    // let colorFiller = this.colorFiller;

    // let x = this.legendX;

    // this.legend.attr("class", "caption")
    //   .attr("x", x.range()[0])
    //   .attr("y", -6)
    //   .attr("fill", "#000")
    //   .attr("text-anchor", "start")
    //   .attr("font-weight", "bold")
    //   .text(param.text);


    // this.countries.attr("class", "countries")
    //   .attr('transform', `translate(180, 900)`)
    //   .selectAll("path")
    //   .attr("fill", function (d, i) { return colorFiller(d["properties"].name) })

  }


  colorFiller(country) {
    let colorFade = d3.scaleSequential(d3sc.interpolateRdYlBu);
    let map = this.countrySet
    let value = map.get(country)
    if (!value) {
      return this.primitiveColors.whitesmoke;
    }
    return colorFade(parseInt(value[this.selectedParamX.name]) / 100)
  }

  updateSelectedParam($event) {
    this.selectedParamX = this.parameters[$event.srcElement.getAttribute('index')]
    this.updateMap()
  }

}
