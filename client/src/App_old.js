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
          <div className="bg-danger border-primary">
          <div className="container-fluid bg-secondary">
            <div className="row bg-primary">
              <div className="col bg-dark"> 
               <HeaderBar loggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin} className="bg-primary" />
              </div>
               </div> 
               <div className="row bg-primary border border-primary">
              <div className="col bg-success">
              <div class="d-flex align-items-start">
                 <Switch>
              <Route exact path="/" component={ () => <BRAroundMe isLoggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin} /> }/>
              <Route path="/AddBR" component={AddBR} />
              <Route path="/Profile" component={Profile} />
              <Route path="/request" component={Requests} />
              <Redirect to="/" />
            </Switch>
              </div>
              </div>
               </div> 
               <div className="row bg-primary border border-primary">
              <div className="col bg-dark">
              <NavBar /></div>
               </div> 
            </div>  
        </div>
        )
      } else {
        return (


          <div className="bg-danger border-primary">
          <div className="container-fluid bg-secondary">
            <div className="row bg-primary">
              <div className="col bg-dark"> 
               <HeaderBar loggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin}/>
              </div>
               </div> 
               <div className="row bg-primary border border-primary">
              <div className="col bg-success">
              <div class="d-flex align-items-start">
              <Switch>
              <Route exact path="/" component={ () => <BRAroundMe isLoggedIn={this.state.isLoggedIn} updateLoginStatus={this.toggleLogin} /> }/>
              <Route path="/AddBR" component={AddBR} />
              <Route path="/Profile" component={Profile} />
              <Route path="/request" component={Requests} />
              <Redirect to="/" />
            </Switch>
              </div>
              </div>
               </div> 
               <div className="row bg-primary border border-primary">
              <div className="col bg-dark">
              <NavBar /></div>
               </div> 
            </div>  
        </div>
        )}
    }

        else {
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
   
      <div className="App">
        {this.loggedin()}
      </div>
      
    )
  }
}

export default App