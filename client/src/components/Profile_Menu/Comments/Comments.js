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
                <Container>
                    <Row>
                        <Col className="container">
                            {this.state.posts.map(item => (
                                <div>
                                    <Card id={item.bathroomId} className="bathroomCard" onClick={this.handlebathroomId}>
                                        <CardImg className="cardimg" top width="50%" src={item.image} alt="Card image cap" className="img-fluid" />
                                        <CardBody>
                                            <CardTitle className="Ctitle">{item.location}</CardTitle>
                                            <CardSubtitle><FaCommentDots /> {item.comment}</CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProfileComments



