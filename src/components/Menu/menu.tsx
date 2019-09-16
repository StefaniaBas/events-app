import * as React from 'react';
import 'bulma/css/bulma.css';
import { MenuItem } from '../MenuItem/menuItem';
import { Col, Navbar, Nav } from 'react-bootstrap';
import './menu.css';

export const Menu = () =>
    <Navbar bg="light" expand="lg" >
        <Col lg={2} xs={1} style={{ fontWeight: 700 }}>
            <Navbar.Brand href="/allevents">my logo</Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Col lg={3}>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <MenuItem name="All Events" path="/allevents" />
                    <MenuItem name="My Events" path="/myevents" />
                </Nav>
            </Navbar.Collapse>
        </Col>
    </Navbar>

