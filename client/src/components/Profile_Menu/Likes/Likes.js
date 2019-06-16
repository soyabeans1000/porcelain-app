import React, { Component } from 'react'
import Likes from '../../../utils/likes'
import { Card, CardImg, CardBody, CardTitle, Container, Row, Col } from 'reactstrap'
import '../../../pages/Profile/styles.css'

class ProfileLikes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likedbr: [],
            adminstatus: false,
            username: '',
            redirect: this.props.toggleredirect
        }
        this.handlebathroomId = this.handlebathroomId.bind(this)
    }

    componentWillMount() {
            let userId = localStorage.getItem('userId')
            Likes.getAll(userId)
            .then(({data}) => {
                let likedbr = []
                data.forEach(({bathroom}) => {
                    likedbr.push({
                        location: `${bathroom.street} ${bathroom.city}, ${bathroom.state} ${bathroom.zipcode}`,
                        image: bathroom.image,
                        id: bathroom.id
                    })
                })
                this.setState({likedbr: likedbr})
                
            })
            .catch(e =>console.log(e))

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
                        <Col>
                            {this.state.likedbr.map(item => (
                                <div>
                                    <Card id={item.id} className="bathroomCard" onClick={this.handlebathroomId}>
                                        <CardImg className="cardimg" top width="50%" src={item.image} alt="Card image cap" className="img-fluid" />
                                        <CardBody>
                                            <CardTitle className="Ctitle">{item.location}</CardTitle>
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

export default ProfileLikes
