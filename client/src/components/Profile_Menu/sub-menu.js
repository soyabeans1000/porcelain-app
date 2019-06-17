import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom'
import ProfileLikes from './Likes'
import ProfileComments from './Comments'
import { IoIosHeart } from "react-icons/io"
import { FaCommentDots } from "react-icons/fa"


class ProfileSubMenu extends React.Component {

  state = {
    likes: false
  }

  handlelikes = _ => {
    this.setState({likes: true})
  }

  handlelikestate = _ => {
    if (this.state.likes) {
      return (
        <>
          <Route exact path="/Likes" component={_ => <ProfileLikes toggleredirect={this.props.toggleredirect} />} />
          <Route exact path="/Comments" component={_ => <ProfileComments toggleredirect={this.props.toggleredirect} />} />
        </>
      )
    } else {
      return (
        <ProfileLikes toggleredirect={this.props.toggleredirect}/>
      )
    }
  }

  render() {
  return (
    <div>
      <BrowserRouter>  
            <nav>
              <Link to='/Likes' onClick={this.handlelikes} > <IoIosHeart className="icons"/> Likes </Link>
              <Link to='/Comments' onClick={this.handlelikes}> <FaCommentDots className="icons"/>Comments</Link>
            </nav>
          {this.handlelikestate()}
      </BrowserRouter> 
    </div>
  )}
}

export default ProfileSubMenu