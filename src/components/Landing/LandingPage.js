import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import GeneSearchFormContainer from '../GeneSearch/GeneSearchFormContainer';

class LandingPage extends Component {
	
	render() {
		return(
			<Container>
				<Row>
					<Col xs="12">
                        <GeneSearchFormContainer />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default LandingPage;