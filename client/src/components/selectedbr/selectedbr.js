import React, { Component } from 'react'
import Bathrooms from '../../utils/bathroom.js'
import Comments from '../../utils/comment'
import User from '../../utils/user'
import Likes from '../../utils/likes'
import { IoIosHeart, IoIosHeartEmpty, IoIosArrowBack } from "react-icons/io"
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'


class Selectedbr extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: this.props.toggleredirect,
            bathroomId: this.props.bathroomId,
            location: '',
            image: '',
            gender: '',
            stalls: '',
            level: '',
            cleanliness: '',
            caption: '',
            likecount: null,
            comments: [],
            newcomment: '',
            isliked: null
        }
    }
    componentDidMount () {
        Bathrooms.getOne(this.state.bathroomId)
        .then(({data}) => {
            let commentsarr = this.state.comments
            data.comments.forEach(({comments, user, userId, id, createdAt}) => {
                commentsarr.push({
                    username: user.username,
                    comment: comments,
                    userId: userId,
                    id: id,
                    createdAt
                })
            })
            this.setState({
                location:`${data.street} ${data.city}, ${data.state} ${data.zipcode}`,
                image: data.image,
                gender: data.gender,
                stalls: data.stalls,
                level: data.level,
                cleanliness: data.cleanliness,
                caption: data.caption,
                likecount: data.likecount,
                comments: commentsarr
            })
        })
        .catch(e => console.log(e))
        Likes.getOne(localStorage.getItem('userId'), this.state.bathroomId)
        .then(({data}) => {
            if (data === null) {
                this.setState({isliked: false})
            } else {
                this.setState({isliked: true})
            }
        })
        .catch(e => console.log(e))
    }
    handleLikebutton = _ => {
        Likes.getOne(localStorage.getItem('userId'), this.state.bathroomId)
        .then(({data}) => {
            if (data === null) {
                let like = {
                    bathroomId: this.state.bathroomId,
                    userId: parseInt(localStorage.getItem('userId'))
                }
                Likes.postOne(like)
                .catch(e => console.log(e))
                let likes = this.state.likecount
                this.setState({
                    likecount: likes +=1,
                    isliked: true
                })
                Bathrooms.putOneIncrease(this.state.bathroomId)
            } else {
                Likes.deleteOne(data.id)
                .catch(e => console.log(e))
                let likes = this.state.likecount
                this.setState({
                    likecount: likes -=1,
                    isliked: false
                })
                Bathrooms.putOneDecrease(this.state.bathroomId)
            }
        })
        .catch(e => console.log(e))
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let adComments = {
            comments: this.state.newcomment,
            bathroomId: this.state.bathroomId,
            userId: localStorage.getItem('userId')
        }
        Comments.postOne(adComments)
        .then(({ data: comment }) => {
            User.getOne(localStorage.getItem('userId'))
        
            .then(({ data }) => {
                let commentobj = {
                    username: data.username,
                    comment: this.state.newcomment,
                    userId: parseInt(localStorage.getItem('userId')),
                    id: comment.id
                }
                this.setState({
                    ...this.state,
                    newcomment: '',
                    comments: [
                        ...this.state.comments,
                        commentobj
                    ]
                })
                document.getElementById("commentform").reset()
            })
            .catch(e => console.log(e))
        })
    }
    handledelete = (e) => {
        let value = e.target.value
        Comments.deleteOne(e.target.id)
        .then(_ => this.setState({comments: this.state.comments.filter(comment => Number(comment.id) !== Number(value))}))
        .catch(e => console.log(e))
    }

    render () {
        return (
            <div className="m-5 p-5">
                <button onClick={_ => {this.props.toggleredirect()}} className="buttonicons"><IoIosArrowBack />Back</button>
                <Card className="border-dark">
                    <CardImg src={this.state.image} />
                    <CardBody>
                        <CardTitle> {this.state.location}<br/> {this.state.caption} </CardTitle>
                        <CardText>  <span>  Cleanliness: {this.state.cleanliness}  &#9679; Stall: {this.state.stalls} &#9679; Level: {this.state.level} <br>
                        </br> {this.state.gender}
                        
                        <div>
                            {this.state.isliked ? <button onClick={this.handleLikebutton} className="likeicon"><IoIosHeart /></button> : <button onClick={this.handleLikebutton} className="likeicon"><IoIosHeartEmpty /></button>}
                            {this.state.likecount}
                        </div>
                        </span>
                        <div>
                            {this.state.comments.sort(function(a, b){
                                var keyA = new Date(a.createdAt),
                                    keyB = new Date(b.createdAt)
                                if(keyA < keyB) return -1
                                if(keyA > keyB) return 1
                                return 0
                                }).map(({username, comment, userId, id}) => {
                                    return (
                                        <div className="comment">
                                            <span className="commentname">{username}: </span>
                                            <span>{comment}</span>
                                        { parseInt(localStorage.getItem('userId')) === userId ? <button id={id} value={id} onClick={this.handledelete} className="deleteicon">x</button> : null }
                                        </div>
                                    )})}
                        </div>
                        <div>
                            <form  id="commentform">
                                <div className="comment-form-fields">
                                    <textarea placeholder="Comment" className="commenttext" rows="2" id="newcomment" onChange={this.handleInputChange}></textarea>
                                    <button type="submit" className="commentsubmit" onClick={this.handleSubmit}>Post</button>
                                </div>
                            </form>
                        </div>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Selectedbr