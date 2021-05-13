import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import { FaTasks } from "react-icons/fa" 
import { AiOutlineBarChart } from 'react-icons/ai'
import './NavBar.css'

const SideBar = props => {
   

    return (
	  <>
    
			<Nav className="text-center sidebar-wrapper col-sm-6 col-md-3 col-lg-2 d-none d-md-block bg-light sidebar"
			  activeKey="/home"
			  onSelect={selectedKey => alert(`selected ${selectedKey}`)}
			>
			  <div className="sidebar-sticky"></div>
				<Nav.Item>
				  <Nav.Link href="/home"><FaTasks className="mr-2"/>Administrar Actividades</Nav.Link>
				</Nav.Item>
				<Nav.Item>
				  <Nav.Link eventKey="link-1"><AiOutlineBarChart className="mr-2"/>Reporte de Asistencias</Nav.Link>
				</Nav.Item>
            </Nav>
          
        </>
        );
  };
  const NavBar = withRouter(SideBar);
  export default NavBar
