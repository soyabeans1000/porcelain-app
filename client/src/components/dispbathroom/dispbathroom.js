import { IoIosArrowBack } from "react-icons/io"
import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap'

const Dispbathroom = ({togglebackbtn, bathroom}) => 
    <div>
        <button onClick={togglebackbtn} className="buttonicons2"><IoIosArrowBack /></button>
        <h4>Restroom Added</h4>
        <Container>
                <Row>
                    <Col className="container">
                        {bathroom.map(({street, city, state, zipcode, gender, stalls, level, caption, image, cleanliness}) => (
                            <div>
                                <Card className="bathroomCard">
                                    <CardImg className="cardimg" top width="50%" src={image} alt="Card image cap" className="img-fluid" />
                                    <CardBody>
                                        <CardTitle className="Ctitle">{street} {city}, {state} {zipcode}<br/> {caption}</CardTitle>
                                        <CardText>  <span>  Cleanliness: {cleanliness}  &#9679; Stall: {stalls} &#9679; Level: {level} <br>
                                        </br> {gender}
                                        </span>
                                        </CardText> 
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </Col>
                </Row>
        </Container>
    </div>

export default Dispbathroom