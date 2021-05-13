import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import './NavBar.css';
const Side = props => {
   

    return (
        <>
    
		  <Nav className="d-none text-center mb-3 d-md-block  sidebar"
		  activeKey="/home"
		  onSelect={selectedKey => alert(`selected ${selectedKey}`)}
		  >
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
			<Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
		  </Nav>
          
        </>
        );
  };
  const NavBar = withRouter(Side);
  export default NavBar
