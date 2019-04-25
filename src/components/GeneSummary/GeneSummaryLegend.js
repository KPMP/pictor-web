import React, { Component } from 'react';
import legend from '../../data/legend';
import { Row, Col } from 'reactstrap';

class GeneSummaryLegend extends Component {
	
	generateLegendGroups() {
		let legendGroups = {};
		let clusterIds = Object.keys(legend.clusters);
		for (const clusterId of clusterIds) {
			let structure = legend.clusters[clusterId].structure;
			if (legendGroups.hasOwnProperty(structure)){
				if (legendGroups[structure].filter(e => e.id === legend.clusters[clusterId].rollupId).length === 0) {
					legendGroups[structure].push({ id: legend.clusters[clusterId].rollupId, cellType: legend.clusters[clusterId].rollupType });
				}
			} else {
				legendGroups[structure] = [];
				legendGroups[structure].push({ id: legend.clusters[clusterId].rollupId, cellType: legend.clusters[clusterId].rollupType });
			}
		}
		
		return legendGroups;
	}
	
	generateLegendForGroup(groupName, legendGroup) {
		let items = [];
		for(const key in legendGroup) {
			let item = legendGroup[key];
			items.push(<li>{item.id}: {item.cellType}</li>);
		}
		
		return (
			<div>{groupName}
				<ul>
					{items}
				</ul>
			</div>
		);
	}
	
	render() {
		const legendGroups = this.generateLegendGroups();
		const groups = Object.keys(legendGroups);
		return(
			<div>
				<p id="gene-summary-legend-title">Legend</p>
				<Row>
					<Col>
					{ groups.map((group) => {
						return this.generateLegendForGroup(group, legendGroups[group]);
					})}
					</Col>
				</Row>
			</div>
		)
	}
}

export default GeneSummaryLegend;