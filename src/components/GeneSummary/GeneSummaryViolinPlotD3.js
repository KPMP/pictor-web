import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';

class GeneSummaryViolinPlotD3 extends Component {

	componentDidMount() {
		this.componentDidUpdate();
	}
	
	componentDidUpdate() {
		
		let id = "#" + this.props.datasetName;
		let noExpressionMessage = "No expression value for gene '" + this.props.selectedGene + "' in this dataset";
		
		let dom = ReactDOM.findDOMNode(this);
		if (dom instanceof HTMLElement) {
			let displayContainer = dom.querySelector(id);
			let existingSVG = displayContainer.querySelector("svg");
			if (existingSVG !== null) {
				existingSVG.parentNode.removeChild(existingSVG);
			}
		}
		
		var margin = {top: 10, right: 30, bottom: 30, left: 30},
		    width = 1100 - margin.left - margin.right,
		    height = 200 - margin.top - margin.bottom;

		let filename = this.props.datasetName + "_violinPlot.csv";
		let initialLetter = this.props.selectedGene.charAt(0);
		let geneDirectory = this.props.selectedGene;
		
		let path = "data/" + initialLetter + "/" + geneDirectory + "/" + filename;
		
		d3.csv(path, function(data) {
			
			let xDomain = [];
			data.forEach(function(row) {
				if (!xDomain.includes(row.cluster)) {
					xDomain.push(row.cluster);
				}
			});

			if(xDomain.length === 0) {
				let svg = d3.select(id)
					.append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", 20)
					.append("g");
				
				svg.append("text")
					.attr('x', 0)
					.attr('y', 10)
					.text(noExpressionMessage);
				
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
	
				var x = d3.scaleBand()
			    	.range([ 0, width ])
			    	.domain(xDomain.sort(function(a,b) { return a - b;}))
			    	.padding(0.1);
				
				svg.append("g")
			    	.attr("transform", "translate(0," + height + ")")
			    	.call(d3.axisBottom(x));
			   
	
		        var sumstat = d3.nest() 
		        	.key(function(d) { return d.cluster;})
		        	.rollup(function(d) {  
		        		let input = d.map(function(g) { return g.readcount;});
		        		var histogram = d3.histogram()
		        			.domain(y.domain())
		        			.thresholds(d3.thresholdFreedmanDiaconis(input,0,5))
		        			.value(d => d);
		        		let bins = histogram(input);
		        		return(bins);
		        	})
		        	.entries(data);
	
		        let maxWidth = (width/xDomain.length);
		        var xNum = d3.scaleLinear()
			    	.range([0, x.bandwidth()])
			    	.domain([-maxWidth,maxWidth]);
	
		        svg.selectAll("myViolin")
			    	.data(sumstat)
			    	.enter()        
			    	.append("g")
			    	.attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) 
			    	.append("path")
			        .datum(function(d){ return(d.value)})     
			        .style("stroke", "none")
			        .style("fill", "#69b3a2")
			        .attr("d", d3.area()
			            .x0(d => xNum(-(d.length/(maxWidth/2))) )
			            .x1(d => xNum(d.length/(maxWidth/2)) )
			            .y(d => y(d.x0))
			            .curve(d3.curveCatmullRom)    
			        );
			}
		});
		
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




