import React, { Component } from 'react'
import Login from '../../components/Header/form/login.js'
import {Button} from 'reactstrap'
import logo from '../../assets/Porcelain.png'
import './style.css'

class Loginpage extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: this.props.isLoggedIn, 
            loginSelected: false
        }
    }

    handleLoginClick = _ => {
        this.setState({loginSelected: true})
    }

    render(){
        return (
            <div>
                <img className="loginlogo" src={logo} alt="Porcelain"/>
                {this.state.loggedIn == false && this.state.loginSelected == true ? <Login updateLoginStatus={this.props.updateLoginStatus} />: null }
                {this.state.loggedIn ? null : <Button className="login" outline color="secondary" onClick={this.handleLoginClick}>Log In</Button> } 
            </div>
        )
    }

}
    
export default Loginpage