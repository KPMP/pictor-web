import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <Navbar id="navbar" className="px-1 py-1 fixed-top">
        <Col xs={3}>
          <Link to="/" className="navbar-header">
            <NavbarBrand className="d-flex align-items-center">
              <img src="img/logo.png" alt="RENAME ME" className="logo" />
            </NavbarBrand>
          </Link>
        </Col>
        <Col xs={6} id="title-text">
        	<span className="ml-2 text-dark">RENAME ME</span>
        </Col>
        <Col xs={3} >
        	<Button className="float-right" id="feedback-button" color="primary" onClick={() => window.open("https://goo.gl/forms/WkyC7PZM8AIe3NoI3", "_blank")}>Send Feedback</Button>
        </Col>
      </Navbar>
    );
  }
}

export default NavBar;
