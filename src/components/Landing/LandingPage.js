import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import GeneSearchForm from '../GeneSearch/GeneSearchForm'

class LandingPage extends Component {
	
	render() {
		return(
			<Container>
				<Row>
					<Col xs="12">
                        <GeneSearchForm />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LandingPage;