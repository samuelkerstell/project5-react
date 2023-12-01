import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedInIcons = <>{currentUser?.username}</>;

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-right-to-bracket"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );
  
  return (
    <Navbar className={styles.NavBar}  expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                <Navbar.Brand style={{ color: '#1b5028' }}>
                    G
                    <i class="fa-solid fa-golf-ball-tee" style={{ color: '#1b5028' }}></i>
                    LF SHOT
                </Navbar.Brand>
                </NavLink>               
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <NavLink 
                        exact
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/"
                    >
                        <i class="fa-solid fa-house"></i>
                        Home
                    </NavLink>
                    {currentUser ? loggedInIcons: loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
}

export default NavBar