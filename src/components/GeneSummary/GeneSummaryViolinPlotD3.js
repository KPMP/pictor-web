import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import Api from '../../helpers/Api';

class GeneSummaryViolinPlotD3 extends Component {

	componentDidMount() {
		this.componentDidUpdate();
	}
	
	componentDidUpdate() {
		
		let id = "#" + this.props.datasetName;
		let thisComponent = this;
		
		let dom = ReactDOM.findDOMNode(this);
		if (dom instanceof HTMLElement) {
			let displayContainer = dom.querySelector(id);
			let existingSVG = displayContainer.querySelector("svg");
			if (existingSVG !== null) {
				existingSVG.parentNode.removeChild(existingSVG);
			}
		}
		
		let margin = {top: 10, right: 30, bottom: 30, left: 30};
		let width = 1100 - margin.left - margin.right;
		let height = 200 - margin.top - margin.bottom;
		let path = Api.getDatasetGeneViolinPlotFilename(this.props.datasetName, this.props.selectedGene);
		
		if (this.props.selectedGene === "") {
			this.showNoResults(id, width, margin);
		} else {
			d3.csv(path, function(error, data) {
				if (error && error.target.status === 404) {
					thisComponent.showNoResults(id, width, margin);
				} else {
					let svg = d3.select(id)
						.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					
					var y = d3.scaleLinear()
				    	.domain([0,5])
				    	.range([height, 0]);
					
					svg.append("g").call( d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")) );
//		
//					var x = d3.scaleBand()
//				    	.range([ 0, width ])
//				    	.domain([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47])
//				    	.padding(0.1);
//					
//					svg.append("g")
//				    	.attr("transform", "translate(0," + height + ")")
//				    	.call(d3.axisBottom(x));
//				   
//		
//			        var sumstat = d3.nest() 
//			        	.key(function(d) { return d.cluster;})
//			        	.rollup(function(d) {  
//			        		let input = d.map(function(g) { return g.readcount;});
//			        		var histogram = d3.histogram()
//			        			.domain(y.domain())
//			        			.thresholds(d3.thresholdFreedmanDiaconis(input,0,5))
//			        			.value(d => d);
//			        		let bins = histogram(input);
//			        		return(bins);
//			        	})
//			        	.entries(data);
//		
//			        let maxWidth = (width/47);
//			        var xNum = d3.scaleLinear()
//				    	.range([0, x.bandwidth()])
//				    	.domain([-maxWidth,maxWidth]);
//		
//			        var myColor = d3.scaleOrdinal().domain([1,47]).range(d3ScaleChromatic.schemeSet3);
//			        
//			        svg.selectAll("myViolin")
//				    	.data(sumstat)
//				    	.enter()        
//				    	.append("g")
//				    	.attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) 
//				    	.append("path")
//				    	.style("fill", function(d) {
//				    		return myColor(d.key);
//				    	})
//				        .datum(function(d){ return(d.value)})     
//				        .style("stroke", "black")
//				        .attr("d", d3.area()
//				            .x0(d => xNum(-(d.length/(maxWidth/2))) )
//				            .x1(d => xNum(d.length/(maxWidth/2)) )
//				            .y(d => y(d.x0))
//				            .curve(d3.curveCatmullRom)    
//				        );
					}
				});
			}
	}
	
	showNoResults(id, width, margin) {
		let noExpressionMessage = "No expression value for gene '" + this.props.selectedGene + "' in this dataset";
		let svg = d3.select(id)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", 20)
			.append("g");
	
		svg.append("text")
			.attr('x', 0)
			.attr('y', 10)
			.text(noExpressionMessage);
	}
	
	render() {
		return(
			<Card className="gene-summary-plot">
				<CardHeader>
					<div className="dataset-info float-left"><span className="dataset-name">{this.props.datasetName}</span>&nbsp;<span className="tis-name">{this.props.tisName}</span></div>
				</CardHeader>
				<CardBody>
					<div id={this.props.datasetName}></div>
				</CardBody>
			</Card>
		);
	}
	
}

export default GeneSummaryViolinPlotD3;




