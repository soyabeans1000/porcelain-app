import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AddBR from './pages/AddBR/AddBR'
import BRAroundMe from './pages/BRaround'
import Loginpage from './pages/login'
import Profile from './pages/Profile'
import Requests from './pages/requests'
import './App.css'


import NavBar from './components/NavBar/navbar'
import HeaderBar from './components/Header/header'
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      isLoggedIn: null
    }

    this.toggleLogin = this.toggleLogin.bind(this)

  }
  componentWillMount () {
    if (localStorage.getItem('userId') === null) {
      this.setState({
        isLoggedIn: false
      })
    } else {
      this.setState({
        isLoggedIn: true
      })
    }
  }

  toggleLogin(){
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }
  componentDidMount() {
    console.log(this.state)
  }
  loggedin = () => {
    if (localStorage.getItem('userId')) {
      if (localStorage.getItem('adminstatus') === 'true') {
        return (
          <div>
          <HeaderBar loggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin}/>
           <Switch>
              <Route exact path="/" component={ () => <BRAroundMe isLoggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin} /> }/>
              <Route path="/AddBR" component={AddBR} />
              <Route path="/Profile" component={Profile} />
              <Route path="/request" component={Requests} />
              <Redirect to="/" />
            </Switch>
          <NavBar />
        </div>
        )
      } else {
        return (
          <div>
          <HeaderBar loggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin}/>
           <Switch>
              <Route exact path="/" component={ () => <BRAroundMe isLoggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin} /> }/>
              <Route path="/AddBR" component={AddBR} />
              <Route path="/Profile" component={Profile} />
              <Redirect to="/" />
            </Switch>
          <NavBar />
        </div>
        )
      }
    } else {
      return (
        <div>
         <Switch>
            <Route exact path="/login" component={ () => <Loginpage isLoggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin} /> }/>
            <Redirect to="/login" />
          </Switch>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
      <div className="d-flex align-items-start">
      <div className="App">
        {this.loggedin()}
      </div>
      </div>
      </div>
      
    )
  }
}

export default App