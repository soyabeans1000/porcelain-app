import React from 'react'
import { Navbar } from 'react-bootstrap'
import {Button} from 'reactstrap'
import { IoIosExit } from "react-icons/io"
import './header.css'
import logo from '../../assets/Porcelain.png'


const HeaderBar = (props) => (
    <>
    <Navbar className="bg-light mb-5" expand="lg" fixed="top">
        <Navbar.Brand href="#home" className='navbarb'>
            {<img src={logo} alt="Porcelain" className='logo'/>}
        </Navbar.Brand>
       {props.loggedIn ? <Button onClick={_=>{
           props.updateLoginStatus()
           localStorage.removeItem('userId')
           localStorage.removeItem('adminstatus')
           }}><IoIosExit className="headericon"/></Button> : null } 
    </Navbar>
    
    </>
        )

export default HeaderBar