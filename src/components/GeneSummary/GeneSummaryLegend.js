import React, { Component } from 'react';
import legend from '../../data/legend';

class GeneSummaryLegend extends Component {
	
	generateLegend() {
		let legendItems = [];
		let clusterIds = Object.keys(legend.masterClusters);
		console.log(clusterIds)
		for (const clusterId of clusterIds) {
			legendItems.push(<li>{clusterId}: {legend.masterClusters[clusterId].cellType}</li>);
		}
		return legendItems;
	}
	
	render() {
		let legendItems = this.generateLegend();
		return(
			<div>
				<span id="gene-summary-legend-title">Legend</span>
				<ul>
					{legendItems}
				</ul>
			</div>
		)
	}
}

export default GeneSummaryLegend;