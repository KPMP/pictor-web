import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AutoComplete, Form } from 'antd';
import genes from '../../data/genes';

class LandingPage extends Component {
	
	constructor(props) {
		super(props);
		let geneList = genes.genes;
		geneList.sort();
		this.state = {
			dataSource : [],
			validateStatus: "success",
			help: "",
			geneList: geneList
		}
	}
	
	handleSearch = (value) => {
		if (value === "" || value === undefined) {
			this.setState({dataSource: []})
		} else {
			let limitedList = this.state.geneList.filter(gene => gene.toUpperCase().indexOf(value.toUpperCase()) !== -1);
			if (limitedList.length === 0) {
				this.setState({validateStatus: "error", help: "Gene not found"});
			} else {
				this.setState({validateStatus: "success", help:""})
			}
			this.setState({dataSource: limitedList.slice(0,10)})
		}
	}
	
	render() {
		
		return(
			<Container>
				<Row>
					<Col xs="12">
						<Card className="mt-3">
							<CardBody id="search-for-gene">
								<h5>Search by gene</h5>
								<Form>
									<Form.Item validateStatus={this.state.validateStatus} help={this.state.help}>
										<AutoComplete style={{"width": "200px"}}dataSource={this.state.dataSource} className="pr-3"
											onSearch={this.handleSearch}/>
										<Button color="primary">Search</Button>
									</Form.Item>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LandingPage;