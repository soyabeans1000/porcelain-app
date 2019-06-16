import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import User from '../../../utils/user'
import * as EmailValidator from 'email-validator'

//parent component
//keeps track of state, defines functionality to be passed into child component

class Login extends Component {
    constructor(props) {
        super(props)
        //initializing components
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: '',
            isAdmin: false,
            showLoginModal: true,
            loggedIn: this.props.updateLoginStatus,
            validation: ''
        };
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.toggleShowModal = this.toggleShowModal.bind(this)
        this.toggleForm = this.toggleForm.bind(this)
    }
    componentWillReceiveProps(){
     this.setState({modal: true})
    }
    componentDidMount(){
     this.setState({modal: true})
     console.log(this.state)
    }

    // LOGIN FUNCTIONS
    handleLogin = event => {
        event.preventDefault()

        if (this.state.userEmail === '') {
            //change placeholder
            //change style border to red
            alert('Invalid email')
            return false
        }

        if (this.state.userPassword === '') {
            //change placeholder
            //change style border to red
            alert('Invalid Password')
            return false
        }

        let loginObj = {
            email: this.state.userEmail,
            password: this.state.userPassword
        }
        //make axios call to api-- 
        User.findOne(loginObj)
        .then(({data}) => {
            if (data === null) {
                this.setState({validation: 'Invalid credentials'})
            } else {
                localStorage.setItem('userId',data.id)
                localStorage.setItem('adminstatus',data.adminstatus)
                this.props.updateLoginStatus(true)
            }
        })
        .catch(e => console.log(e))

    }

    // give value to input thru state change.
    handleLoginInput = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    // SIGN UP OPTIONS

    handleSignInput = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    handleSignUp = e => {
        e.preventDefault()

        if (this.state.userName == '') {
            //placeholder change and border style
            alert('Invalid Username')
            return false
        }
        
        if (this.state.userPassword == '') {
            //placeholder change and border style
            alert('Invalid Password')
            return false
        }
        let validate = EmailValidator.validate(`${this.state.userEmail}`)
        if (validate === true) {
            let email = this.state.userEmail
            User.findAnother(email)
            .then(({data}) => {
                if (data === 'OK') {
                    let signUpObj = {
                        username: this.state.userName,
                        email: this.state.userEmail,
                        password: this.state.userPassword
                    }
                    User.postOne(signUpObj)
                    .then(({data})=> {
                        localStorage.setItem('userId', data.id)
                        localStorage.setItem('adminstatus',data.adminstatus)
                        this.props.updateLoginStatus(true)
                    })
                    .catch(e => console.log(e))
                    this.setState({
                        validation: ''
                    })
                } else {
                    alert('Email already exist')
                }
            })
            .catch(e => console.log(e))
        } else {
            alert('Please enter a valid email')
        }
    }

    //this function toggles whether the modal is shown or not
    toggleShowModal() {
        this.setState({
            modal: !this.state.modal,
            showLoginModal: true
        });
    }
    //this function updates the state for whether to show the login modal or not
    toggleForm() {
        this.setState({
            showLoginModal: !this.state.showLoginModal,
            validation: ''
        })
        document.getElementById("loginform").reset()
    }
    //initial log in button handler
    handleLoginClick() {
        this.toggleForm()
        this.toggleShowModal()
    }

    //this function toggles which form to show based on state
    showTheModal = () => {
        if (this.state.modal) {
            if (this.state.showLoginModal == true) {
                //Login Form
                return (
                    <div>
                        <Form id="loginform">
                            {/* name */}
                            <FormGroup>
                                <Label htmlFor='userEmail'>Email</Label>
                                <Input type="email" name="userEmail" id="useremail" className="loginInput" placeholder="Email" onChange={this.handleLoginInput} />
                            </FormGroup>
                            {/* password */}
                            <FormGroup>
                                <Label htmlFor="userPassword">Password</Label>
                                <Input type="password" name="userPassword" id="userPassword" className="loginInput" placeholder="Password" onChange={this.handleLoginInput} />
                            </FormGroup>
                            {this.state.validation}
                        </Form>
                        <br />
                        <small>Not a member?</small>
                        <br />
                        {/* SIGN UP BUTTON b4 the login bc modal*/}
                        <Button outline color="success" className="loginbtn" onClick={this.toggleForm}>Sign Up</Button>
                    </div>
                )
            } else {
                //show sign up form
                return (
                    <div>
                        <Form id="loginform">
                            <FormGroup>
                                <Label htmlFor='userName'>Name</Label>
                                <Input type="text" name="userName" id="userName" onChange={this.handleSignInput} placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="userEmail">Email</Label>
                                <Input type="email" name="userEmail" id="userEmail" onChange={this.handleSignInput} placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="userPassword">Password</Label>
                                <Input type="password" name="userPassword" id="userPassword" onChange={this.handleSignInput} placeholder="Password" />
                            </FormGroup>
                        </Form>
                        <br />
                        <small>Have an acount?</small>
                        <br />
                        <Button outline color="success" className="loginbtn" onClick={this.toggleForm}>Log In</Button>
                    </div>
                )
            }
        }

    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleShowModal}>{this.state.showLoginModal ? "Log In" : "Sign Up"}</ModalHeader>
                    <ModalBody>
                        {this.showTheModal()}
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="success" className="loginbtn" onClick={this.state.showLoginModal ? this.handleLogin : this.handleSignUp}>{this.state.showLoginModal ? "Log In" : "Submit"}</Button>{' '}
                        <Button outline color="dark" className="loginbtn" onClick={this.toggleShowModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Login
