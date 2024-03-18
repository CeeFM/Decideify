import React, { useState, useEffect } from 'react';
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

export default function Footer({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement.scrollTop || 0);

      const threshold = 100;

      if (documentHeight - scrollTop - windowHeight < threshold) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000, visibility: showFooter ? 'visible' : 'hidden' }}>
      <Navbar light expand="md" style={{ fontSize: "1rem", justifyContent: 'center' }}>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="text-center w-100 d-flex justify-content-center" navbar>
            <NavbarBrand tag={RRNavLink} style={{ color: '#F6F7F8', alignSelf: 'center' }} to="/">
              <img src={myImage} style={{ width: "6rem"}} />
            </NavbarBrand>
            <NavItem style={{ alignSelf: 'center' }}>
              <NavLink style={{ color: '#F6F7F8' }} tag={RRNavLink} to="#">Contact Us</NavLink>
            </NavItem>
            <NavItem style={{ alignSelf: 'center' }}>
              <NavLink style={{ color: '#F6F7F8' }} tag={RRNavLink} to="#">About Us</NavLink>
            </NavItem>
            <NavItem style={{ alignSelf: 'center' }}>
              <NavLink style={{ color: '#F6F7F8' }} tag={RRNavLink} to="#">Meet the Team</NavLink>
            </NavItem>
            <NavItem style={{ alignSelf: 'center' }}>
              <NavLink style={{ color: '#F6F7F8' }} tag={RRNavLink} to="#">Privacy Policy</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
