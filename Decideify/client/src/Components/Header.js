import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../Managers/UserProfileManager';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import myImage from './DECIDEIFY.png';

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
            <NavbarBrand tag={RRNavLink} style={{ color: '#F6F7F8'}} to="/"><img src={myImage} style={{width: "10rem"}} /></NavbarBrand>
                <NavItem>
                  <NavLink style={{ color: '#F6F7F8'}} tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: '#F6F7F8'}} tag={RRNavLink} to=""></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: '#F6F7F8'}} tag={RRNavLink} to=""></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: '#F6F7F8'}} tag={RRNavLink} to=""></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} style={{ color: '#F6F7F8'}} to=""></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} style={{ color: '#F6F7F8'}} to=""></NavLink>
                </NavItem>
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer", color: '#F6F7F8'}} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} style={{ color: '#F6F7F8'}} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} style={{ color: '#F6F7F8'}} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}