import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async() => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch(err) {
      console.log(err);
    }
  };

  const createPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fa-solid fa-plus"></i>Create Post
    </NavLink>
  )

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fa-regular fa-images"></i>Feed
      </NavLink>
      <NavLink
        to="/liked"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-regular fa-thumbs-up"></i>Liked
      </NavLink>
      <NavLink
        to="/"
        className={styles.NavLink}
        onClick={handleSignOut}
      >
        <i className="fa-solid fa-right-to-bracket"></i>Sign Out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  )

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
    <Navbar expanded={expanded} className={styles.NavBar}  expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                <Navbar.Brand style={{ color: '#1b5028' }}>
                    G
                    <i className="fa-solid fa-golf-ball-tee" style={{ color: '#1b5028' }}></i>
                    LF SHOT
                </Navbar.Brand>
                </NavLink>
                {currentUser && createPostIcon}         
                <Navbar.Toggle 
                  ref={ref}
                  onClick={() => setExpanded(!expanded)} 
                  aria-controls="basic-navbar-nav" 
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <NavLink 
                        exact
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/"
                    >
                        <i className="fa-solid fa-house"></i>
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