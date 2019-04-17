import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

class GeneSummaryViolinPlot extends Component
{
	
	constructor(props) {
		super(props);
		this.state = { violinData: [] };
	}
	
	componentWillMount() {
		Papa.parse("data/N/NPHS2/NPHS2_1.csv", {
			download: true,
			header: true,
			complete: (results) => { this.setViolinData(results)}
		});
	}
	
	unpack = (rows, key) => {
		return rows.map(function(row) { return row[key]; });
	}
	
	setViolinData = (results) => {
	    let rawData = results.data;
	    var violinData = [{
	        type: 'violin',
	        x: this.unpack(rawData, 'cluster'),
	        y: this.unpack(rawData, 'readcount'),
	        points: 'none',
	        box: {
	          visible: false
	        },
	        meanline: {
	          visible: false
	        },
	        transforms: [{
	          type: 'groupby',
	          groups: this.unpack(rawData, 'cluster'),
	        }],
	        colorscale: 'Jet'	        
	      }];
	    this.setState({violinData: violinData})
	}
	
	
    render() {
    	var margin = {top: 10, right: 30, bottom: 30, left: 30};
    	var width = 900 - margin.right - margin.left;
    	var height = 600 - margin.top - margin.bottom;
        let violinLayout = {
	      yaxis: {
	        zeroline: false
	      },
	      hovermode: false,
	      showlegend: false,
	      width: width,
	      height: height
	    };
        
        return (
            <Card className="gene-summary-plot">
                <CardHeader>
                    <div className="dataset-info float-left"><span className="dataset-name">{this.props.datasetName}</span>&nbsp;<span className="tis-name">{this.props.tisName}</span></div>
                </CardHeader>
                <CardBody>
                    <Plot data={this.state.violinData} layout={violinLayout} />
                </CardBody>
            </Card>
        )
    }
}

GeneSummaryViolinPlot.propTypes = {
    datasetName: PropTypes.string.isRequired,
    tisName: PropTypes.string.isRequired,
};

export default GeneSummaryViolinPlot;