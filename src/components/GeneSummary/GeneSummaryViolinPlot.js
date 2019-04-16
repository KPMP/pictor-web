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
		Papa.parse("data/N/NPHS2/SCRNA-SEQ_violinPlot.csv", {
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
	      autosize: false,
	      width: 1,
	      height: 450,
	      box: {
	        visible: false
	      },
	      meanline: {
	        visible: true
	      },
	      transforms: [{
	        type: 'groupby',
	        groups: this.unpack(rawData, 'cluster')
	      }],
	      colorscale: 'Jet'
	    }];
	    this.setState({violinData: violinData})
	}
	
	
    render() {
        let violinLayout = {
	      yaxis: {
	        zeroline: false
	      }
	    };
        let config = { scrollZoom: true, editable: false, staticPlot: true, displayModeBar: true }
        
        return (
            <Card className="gene-summary-plot">
                <CardHeader>
                    <div className="dataset-info float-left"><span className="dataset-name">{this.props.datasetName}</span>&nbsp;<span className="tis-name">{this.props.tisName}</span></div>
                </CardHeader>
                <CardBody>
                    <Plot data={this.state.violinData} layout={violinLayout} config={config}/>
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