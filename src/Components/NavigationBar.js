import React, {useState} from 'react'
import { Navbar,Nav,NavDropdown ,Dropdown } from 'react-bootstrap';
import {FaAngleDoubleRight,FaAngleDoubleLeft } from "react-icons/fa";

const NavigationBar = ({getCategory=null}) => {
    const [category,setCategory] = useState("All")
    const [openSidenav,setOpenSidenav] = useState(false)
    const selectCategory = (categ) => {
      getCategory(categ)
      if(categ==="")
        setCategory("All")
      else
        setCategory(categ)

    }
    const SideNavHandler = () => {
      if(!openSidenav){
        document.getElementById('SideNav').setAttribute("style", "width: 250px !important");
        setOpenSidenav(true)
      }
      else{
        document.getElementById('SideNav').setAttribute("style", "width: 0px !important");
        setOpenSidenav(false)
      }
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand id="sideNavOpener" className="sideNavButton" onClick={SideNavHandler}>{openSidenav ? <FaAngleDoubleLeft/> :<FaAngleDoubleRight/>}</Navbar.Brand>
              <Navbar.Brand onClick={() => selectCategory("")}>Luscaner's Trading</Navbar.Brand>
              
            <Nav className="mr-auto">
              <NavDropdown title="Categories">
                <Dropdown.Item onClick={() => selectCategory("")}>All Items</Dropdown.Item>
                <Dropdown.Item onClick={() => selectCategory("Electrical")}>Electrical</Dropdown.Item>
                <Dropdown.Item onClick={() => selectCategory("Plumbing")}>Plumbing</Dropdown.Item>
                <Dropdown.Item onClick={() => selectCategory("Roofing")}>Roofing</Dropdown.Item>
              </NavDropdown >
            </Nav>

            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                Displaying: {category} Items &nbsp;
                </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>
    )
}

export default NavigationBar
