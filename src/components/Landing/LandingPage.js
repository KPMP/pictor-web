import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { AutoComplete } from 'antd';
import genes from '../../data/genes';

class LandingPage extends Component {
	
	render() {
		
		return(
			<Container>
				<Row>
					<Col xs="12">
						<Card>
							<CardBody>
								Search by gene
								<AutoComplete dataSource={genes.genes}
									filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LandingPage;