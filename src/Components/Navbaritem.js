import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbaritem() {


    return (
        <Navbar expand="lg" id='navbar-bg'>
            <Container>
                <Navbar.Brand href="/" id='logo'>T<span id='logo-span'>OO</span>lifyco</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="/" className="mx-3">Home</Nav.Link>
                        <Nav.Link href="/privacy" className="mx-3">Privacy Policy</Nav.Link>
                        <Nav.Link href="/about" className="mx-3">About us</Nav.Link>
                        <Nav.Link href="/blog" className="mx-3">Blog</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbaritem;
