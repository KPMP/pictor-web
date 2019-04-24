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
		if (legendGroup.length > 14) {
			
			let half = (legendGroup.length / 2) + (legendGroup.length % 2);
			return (
				<Col xs="4">
					<Row>
						<Col xs="6">{groupName}
							<ul>
								{items.slice(0,half)}
							</ul>
						</Col>
						<Col xs="6">{groupName} (cont)
							<ul>
								{items.slice(half, legendGroup.length)}
							</ul>
						</Col>
					</Row>
				</Col>
			);
		} else {
			return (
				<Col xs="2">{groupName}
					<ul>
						{items}
					</ul>
				</Col>
			);
		}
	}
	
	render() {
		const legendGroups = this.generateLegendGroups();
		const groups = Object.keys(legendGroups);
		return(
			<div>
				<span id="gene-summary-legend-title">Legend</span>
				<Row>
					{ groups.map((group) => {
						return this.generateLegendForGroup(group, legendGroups[group]);
					})}
				</Row>
			</div>
		)
	}
}

export default GeneSummaryLegend;