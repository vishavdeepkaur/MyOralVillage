import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3'
import * as d3sc from 'd3-scale-chromatic'
import { AppState } from '../../../app.service';
import * as topojson from 'topojson'
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect'
@Component({
  selector: 'bar-graph',
  styleUrls: [
    './bar-graph.component.css'
  ],
  templateUrl: `./bar-graph.component.html`,
  encapsulation: ViewEncapsulation.None
})
export class BarGraphComponent implements OnInit, OnChanges {
  @ViewChild('barGraph') private plotContainer: ElementRef;
  @Input() private data: any;

  private parameters;
  private selectedParamY: any;


  private margin: any = { top: 50, right: 250, bottom: 150, left: 100 };
  private countrySet;
  private width: number;
  private height: number;

  private countries: String[];
  private svg;

  private primitiveColors = { white: "#fff", whitesmoke: "whitesmoke" }

  private optionsModel: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private myOptions: IMultiSelectOption[];
  private mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    fixedTitle: true,
    displayAllSelectedText: true,
    selectionLimit: 20
  };



  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };

  onChange() {
    this.updateGraph();
  }

  constructor(public appState: AppState) { }


  ngOnInit() {


    this.parameters = this.data.results.result.params;
    this.selectedParamY = this.parameters[4]
    this.countrySet = d3.map();
    this.data = this.data.results.result.data

    for (let item of this.data) {
      this.countrySet.set(item["country"], item)
      item[this.selectedParamY.name] = parseInt(item[this.selectedParamY.name])
    }

    this.myOptions = this.countrySet.keys().map((key, index) => { return { id: index, name: key } });
    this.createGraph();
  }

  ngOnChanges() {
    console.log("changed param")
  }

  createGraph() {
    let paramY = this.selectedParamY
    let primColors = this.primitiveColors;
    let data = this.optionsModel.sort().map((value, index) => this.data[value])
    let countriesMap = this.countrySet;

    let element = this.plotContainer.nativeElement;


    var outerWidth = 1000,
      outerHeight = 600;

    let width = this.width = outerWidth - this.margin.left - this.margin.right
    let height = this.height = outerHeight - this.margin.top - this.margin.bottom;

    // set the ranges
    let x = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);
    let y = d3.scaleLinear()
      .range([this.height, 0]);


    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d["country"] }));
    y.domain([0, <any>d3.max(data, function (d) { return d[paramY.name] })]);


    let svg = d3.select(element)
      .append("svg")
      .attr("width", "100%")
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d["country"]); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d[paramY.name]); })
      .attr("height", function (d) { return height - y(d[paramY.name]); });

    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start")

      .append("text")
      .classed("label", true)
      .attr("x", this.width - 100)
      .attr("y", 60)
      .style("text-anchor", "end")
      .text("Countries");

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin.left + 30)
      .attr("x", -this.height / 2 + 50)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(paramY.text);;

    console.log(svg, "svg test");
  }
  updateGraph() {
    let element = this.plotContainer.nativeElement
    let svg = element.firstChild;
    element.removeChild(svg);
    this.createGraph();
  }

  updateSelectedParamY($event) {
    this.selectedParamY = this.parameters[$event.srcElement.getAttribute('index')]
    this.updateGraph()
  }

}
