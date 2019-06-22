import React, { Component } from 'react'
import SubMenu from '../../components/Profile_Menu/sub-menu.js'
import User from '../../utils/user.js'
import Selectedbr from '../../components/selectedbr/selectedbr.js'
import Image from '../../utils/image.js'
import './styles.css'
import { FaCamera } from "react-icons/fa"

// const jumbosize = {
//     width: '50%'
//   }


class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            username: '',
            userimage: '',
            redirect: false,
            bathroomId: null
        }
        this.toggleredirect = this.toggleredirect.bind(this)
      }

    toggleredirect(num){
        this.setState({
            redirect: !this.state.redirect,
            bathroomId: num
        })
    }

    componentWillMount () {
        User.getOne(localStorage.getItem('userId'))
        .then(({data}) => {
            this.setState({
                username: data.username,
                userimage: data.userimage
            })
        })
        .catch(e => console.log(e))
    }
    handlechangepicture = e => {
        this.inputElement.click()
    }
    handlepictureinput = e => {
        let file = e.target.files
        const fd = new FormData()
        fd.append('image', file[0])
        Image.postOne(fd)
        .then(({data}) => {
            this.setState({userimage: data.imageUrl})
            User.putOne(localStorage.getItem('userId'),{
                userimage: data.imageUrl
            })
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    }
    handlepath = _ => {
        if (this.state.redirect) {
            return (
                <Selectedbr toggleredirect={this.toggleredirect} bathroomId={this.state.bathroomId}/>
            )
        } else {
            return (
                <div>
                    <div className="jumbotron mt-0 text-center bg-transparent border">
                        <h3 className="username">UserName: {this.state.username}</h3>
                        <br/>
                        <img src={this.state.userimage} className="profileimg"/><br>
                        </br>
                        <button onClick={this.handlechangepicture} className="picture"><FaCamera /></button>
                        <input class="file-upload" type="file" accept="image/*" className="profileinput" ref={input => this.inputElement = input} onChange={this.handlepictureinput}/>
                        <SubMenu toggleredirect={this.toggleredirect}/>
                   
                    </div>
                                   
                </div>
            )
        }
    }
    render() {
        return (
            <div className="profile_container">
            
            <div className="jumbotron mx-auto jumbosize bg-transparent">
                {this.handlepath()}
        </div>
            </div>
        )
    }
}

export default Profile

