import React, { Component } from 'react';
import legend from '../../data/legend';
import { Row, Col } from 'reactstrap';

class GeneSummaryLegend extends Component {
	
	generateLegendGroups() {
		let legendGroups = {};
		let clusterIds = Object.keys(legend.masterClusters);
		for (const clusterId of clusterIds) {
			let structure = legend.masterClusters[clusterId].structure;
			
			if (legendGroups.hasOwnProperty(structure)){
				legendGroups[structure].push({ id: clusterId, cellType: legend.masterClusters[clusterId].cellType });
			} else {
				legendGroups[structure] = [];
				legendGroups[structure].push({ id: clusterId, cellType: legend.masterClusters[clusterId].cellType });
			}
		}
		return legendGroups;
	}
	
	generateLegendForGroup(groupName, legendGroup) {
		let items = [];
		
		for(const item of legendGroup) {
			items.push({ id: item.id, cellType: item.cellType} );
		}
		
		console.log(items);
		if (legendGroup.length > 14) {
			
			let half = (legendGroup.length / 2) + (legendGroup.length % 2);
			
			return (
				<Col xs="4">
					<Row>
						<Col xs="6">{groupName}
							<ul>
								{items.map((item, index) => {
									if (index <= half) {
										return <li>{item.id}: {item.cellType}</li>
									} else {
										return null;
									}
								})}
							</ul>
						</Col>
						<Col xs="6">{groupName} (cont)
							<ul>
								{items.map((item, index) => {
									if (index > half) {
										return <li>{item.id}: {item.cellType}</li>
									} else {
										return null;
									}
								})}
							</ul>
						</Col>
					</Row>
				</Col>
			);
		} else {
			return (
				<Col xs="2">{groupName}
					<ul>
						{items.map((item, index) => {
							return <li>{item.id}: {item.cellType}</li>
						})}
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