import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <Navbar id="navbar" className="px-1 py-1 fixed-top">
        <Col sm={6}>
          <Link to="/" className="navbar-header">
            <NavbarBrand className="d-flex align-items-center">
              <img src="img/logo.png" alt="RENAME ME" className="logo" />
              <span className="ml-2 text-dark">RENAME ME</span>
            </NavbarBrand>
          </Link>
        </Col>
      </Navbar>
    );
  }
}

export default NavBar;
