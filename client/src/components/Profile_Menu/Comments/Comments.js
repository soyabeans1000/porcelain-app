import React, { Component } from 'react'
import User from '../../../utils/user.js'
import Comments from '../../../utils/comment'
import Bathroom from '../../../utils/bathroom'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Container, Row, Col } from 'reactstrap'
import '../../../pages/Profile/styles.css'
import { FaCommentDots } from "react-icons/fa"

class ProfileComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            adminstatus: false,
            username: '',
            redirect: this.props.toggleredirect
        }
        this.handlebathroomId = this.handlebathroomId.bind(this)
    }
    // state = {
    //     posts: [],
    //     adminstatus: false,
    //     username: ''
    // }
    componentWillMount() {
        let userId = localStorage.getItem('userId')
        User.getOne(userId)
            .then(({ data: { username, adminstatus } }) => {
                this.setState({
                    adminstatus: adminstatus,
                    username: username
                })
            })
            .catch(e => console.log(e))
        let bathrooms = []
        let newarr
        Comments.getAll(userId)
            .then(({ data }) => {
                let bathroomid = []
                data.forEach(({ bathroom }) => {
                    bathroomid.push(bathroom.id)
                    newarr = bathroomid.filter((id, index) => {
                        return bathroomid.indexOf(id) >= index
                    })
                });
                console.log(newarr)
                newarr.forEach(num => {
                    let username
                    let commentstr
                    Bathroom.getOne(num)
                        .then(({ data }) => {
                            data.comments.forEach(comment => {
                                if (comment.userId === parseInt(userId)) {
                                    username = comment.user.username
                                    commentstr = comment.comments
                                }
                            })
                            bathrooms.push({
                                location: `${data.street} ${data.city}, ${data.state} ${data.zipcode}`,
                                image: data.image,
                                username: username,
                                comment: commentstr,
                                bathroomId: data.id
                            })
                            this.setState({ posts: bathrooms })
                        })
                })
            })
            .catch(e => console.log(e))
    }
    handlebathroomId = e => {
        const id = e.currentTarget.id
        this.props.toggleredirect(id)
    }

    render() {
        return (
            <div>



{/* <div>
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  ); */}
               
                            {this.state.posts.map(item => (
                                <div>
                                    <Card id={item.bathroomId} className="bathroomCard" onClick={this.handlebathroomId}>
                                        <CardImg top width="100%" src={item.image}  />                                      
                                        <CardBody>
                                            <CardTitle>{item.location}</CardTitle>
                                            <CardSubtitle><FaCommentDots /> {item.comment}</CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                      
            </div>
        )
    }
}

export default ProfileComments



