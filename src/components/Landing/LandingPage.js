import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { AutoComplete, Form } from 'antd';
import genes from '../../data/genes';
import { setSelectedGene } from '../../actions/Gene/geneActions'
import { withRouter } from "react-router-dom";

class LandingPage extends Component {
	
	constructor(props) {
		super(props);
		let geneList = genes.genes;
		geneList.sort();
		this.state = {
			dataSource : [],
			validateStatus: "success",
			help: "",
			geneList: geneList,
			geneSymbol: ""
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

	handleSelect = (value) => {
		this.setState({geneSymbol: value});
	}

	handleSubmit = (e) => {
		this.props.dispatch(setSelectedGene(this.state.geneSymbol));
		this.props.dispatch(() => this.props.history.push("summary"));
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
										<AutoComplete style={{"width": "200px"}} dataSource={this.state.dataSource} className="pr-3"
											onSearch={this.handleSearch} onSelect={this.handleSelect} name="geneSymbol"/>
										<Button color="primary" onClick={this.handleSubmit}>Search</Button>
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

const WrappedLandingPage = Form.create({ name: 'universalHeader', validateMessage: "Required" })(LandingPage);

export default withRouter(connect()(WrappedLandingPage));