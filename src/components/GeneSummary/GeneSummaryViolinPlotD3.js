import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import * as d3 from 'd3';

class GeneSummaryViolinPlotD3 extends Component {
	
	componentDidMount() {
		
		var margin = {top: 10, right: 30, bottom: 30, left: 30},
		    width = 900 - margin.left - margin.right,
		    height = 200 - margin.top - margin.bottom;

		let id = "#" + this.props.datasetName;
		var svg = d3.select(id)
		  .append("svg")
		  .attr("width", width + margin.left + margin.right)
		  .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		let filename = this.props.datasetName + "_violinPlot.csv";
		
		d3.csv("data/N/NPHS2/" + filename, function(data) {
			
			var y = d3.scaleLinear()
		    	.domain([0,5])          // Note that here the Y scale is set manually
		    	.range([height, 0]);
			
			svg.append("g").call( d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")) );

		  // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
			var x = d3.scaleBand()
		    	.range([ 0, width ])
		    	.domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29])
		    	.padding(0);     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.
			
			svg.append("g")
		    	.attr("transform", "translate(0," + height + ")")
		    	.call(d3.axisBottom(x));
		   
		  // Features of the histogram
			var histogram = d3.histogram()
		    	.domain(y.domain())
		        .thresholds([0.1,1,2,3,4,5])    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
		        .value(d => d);

		  // Compute the binning for each group of the dataset
	        var sumstat = d3.nest() 
	        	.key(function(d) { return d.cluster;})
	        	.rollup(function(d) {  
	        		let input = d.map(function(g) { return g.readcount;});
	        		let bins = histogram(input);
	        		return(bins);
	        	})
	        	.entries(data);

	        let maxWidth = width/30;
	        var xNum = d3.scaleLinear()
		    	.range([0, x.bandwidth()])
		    	.domain([-maxWidth,maxWidth]);

		  // Add the shape to this svg!
	        svg.selectAll("myViolin")
		    	.data(sumstat)
		    	.enter()        // So now we are working group per group
		    	.append("g")
		    	.attr("transform", function(d){ return("translate(" + x(d.key) +" ,0)") } ) // Translation on the right to be at the group position
		    	.append("path")
		        .datum(function(d){ return(d.value)})     // So now we are working bin per bin
		        .style("stroke", "none")
		        .style("fill", "#69b3a2")
		        .attr("d", d3.area()
		            .x0(d => xNum(-(d.length/10)) )
		            .x1(d => xNum(d.length/10) )
		            .y(d => y(d.x0))
		            .curve(d3.curveCatmullRom)    
		        );
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




