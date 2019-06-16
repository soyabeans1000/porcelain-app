import React, { Component } from 'react'
import Request from '../../utils/request'
import Bathrooms from '../../utils/bathroom'
import { MdClose, MdCheck } from "react-icons/md"
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'

class Requests extends Component {
    state = {
        requests: []
    }
    componentWillMount (){
        Request.getAll()
        .then(({data}) => {
            let newrequests = []
            data.forEach(item => {
                newrequests.push({
                    street: item.street,
                    city: item.city,
                    state: item.state,
                    zipcode: item.zipcode,
                    image: item.image,
                    gender: item.gender,
                    stalls: item.stalls,
                    level: item.level,
                    cleanliness: item.cleanliness,
                    caption: item.caption,
                    id: item.id,
                    userId: item.userId
                })
                
            });
            this.setState({requests: newrequests})
        })
        .catch(e => console.log(e))
    }
    handleapproval = e => {
        let i = e.currentTarget.value
        let request = this.state.requests
        let newbathroom= {
            street: request[i].street,
            city: request[i].city,
            state: request[i].state,
            zipcode: parseInt(request[i].zipcode),
            gender: request[i].gender,
            stalls: parseInt(request[i].stalls),
            level: parseInt(request[i].level),
            cleanliness: request[i].cleanliness,
            caption: request[i].caption,
            image: request[i].image,
            userId: request[i].userId
        }
        Bathrooms.postOne(newbathroom)
        .catch(e => console.log(e))
        Request.deleteOne(request[i].id)
        .catch(e => console.log(e))
        request.splice(i, 1)
        this.setState({requests: request})
    }
    handledeny = e => {
        let i = e.currentTarget.value
        let request = this.state.requests
        console.log(request[i].id)
        console.log(e.currentTarget.id)
        Request.deleteOne(request[i].id)
        .catch(e => console.log(e))
        request.splice(i, 1)
        this.setState({requests: request})
    }

    render () {
        return (
            <div className="requestcontainer"> 
                <h3>Restroom Submission</h3>
                {this.state.requests.map((request, index) => (
                    <Card className="card_size">
                        <CardImg className="cardimg" src={request.image}/>
                        <CardBody>
                            <CardTitle className="Ctitle"> {request.street} {request.city}, {request.state} {request.zipcode} <br/> {request.caption} </CardTitle>
                            <CardText>  <span>  Cleanliness: {request.cleanliness}  &#9679; Stall: {request.stalls} &#9679; Level: {request.level} <br>
                                </br> {request.gender}
                                </span>
                                <div>
                                    <button id={request.id} value={index} onClick={this.handleapproval} className="submission"><MdCheck /></button>
                                    <button id={request.id} value={index} onClick={this.handledeny} className="submission"><MdClose /></button>
                                </div>
                            </CardText>
                        </CardBody>
                    </Card>
                ))}
            </div>
        )
    }
}

export default Requests