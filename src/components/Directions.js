import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Directions extends Component {
	
	render() {
		return (
				<Container>
	              <Row>
	                <Col>
	                  <h2>Congrats on creating a new app for KPMP!</h2>
	                </Col>
	              </Row>
	              <Row>
	                <Col>
	                  <h3>Developer TODOs: </h3>
	                  <ul>
	                    <li>
	                      {' '}
	                      Determine whether we need a username in the header. If so,
	                      write a card to add it (and probably borrow code from
	                      orion-web to do so).
	                    </li>
	                  </ul>
	                </Col>
	              </Row>
	            </Container>
				
		)
	}
}

export default Directions;