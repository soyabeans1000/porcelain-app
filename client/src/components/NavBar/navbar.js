
import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaToilet, FaPlus, FaCheckSquare } from "react-icons/fa"
import { GoPerson } from "react-icons/go"
import './NavBar.css'



class NavBar extends Component {
    handlestatus = _ => {
        if (localStorage.getItem('adminstatus') === 'true') {
            return (
                <div className="App-intro">
                <Navbar fixed="bottom">
                    <Nav className="justify-content-center" className="navbar">
                        <Nav.Item>
                            <Nav.Link className="navlink">
                                <Link to="/"><FaToilet className="navicon"/></Link> 
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="navlink"> 
                                <Link to="/AddBR"><FaPlus className="navicon"/></Link> 
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="navlink"> 
                                <Link to="/Profile"><GoPerson className="navicon"/></Link> 
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="navlink">  
                                <Link to="/request"><FaCheckSquare className="navicon"/></Link> 
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                </div>
            )
        } else {
            return (
                <div className="App-intro">
                <Navbar fixed="bottom">
                    <Nav className="justify-content-center" className="navbar">
                        <Nav.Item>
                            <Nav.Link className="navlink2">
                                <Link to="/"><FaToilet className="navicon"/></Link> 
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="navlink2"> 
                                <Link to="/AddBR"><FaPlus className="navicon"/></Link> 
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="navlink2"> 
                                <Link to="/Profile"><GoPerson className="navicon"/></Link> 
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="App-intro">
                {this.handlestatus()}
            </div>
        )
    }
}

export default NavBar