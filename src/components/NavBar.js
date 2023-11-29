import React from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";
import styles from '../styles/NavBar.module.css'
// import logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar}  expand="md" fixed="top">
            <Container>
                <Navbar.Brand style={{ color: '#1b5028' }}>G<i class="fa-solid fa-golf-ball-tee"></i>LF SHOT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <Nav.Link>
                        <i class="fa-solid fa-house"></i>
                        Home
                    </Nav.Link>
                    <Nav.Link>
                        <i class="fa-solid fa-right-to-bracket"></i>Sign In</Nav.Link>
                    <Nav.Link>
                        <i class="fa-solid fa-user-plus"></i>Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
}

export default NavBar