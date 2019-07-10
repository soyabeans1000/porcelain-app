import React from 'react'
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io"
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'

const sizer = {

    width:'50%'
}

const Bathroomform = ({ isliked, bathroom, handleLikebutton, likecount, newcomment, handleInputChange, handleSubmit, handledelete, comments}) => {
    const loggedInUser = parseInt(localStorage.getItem('userId'))
    return <div>
    {bathroom.map(({location, image, gender, stalls, level, cleanliness, caption}) => (
        <Card className="card_size cardsize" style={sizer}>
            <CardImg className="cardimg" src={image}/>
            <CardBody>
                <CardTitle className="Ctitle"> {location}<br/> {caption} </CardTitle>
                <CardText>  <span>  Cleanliness: {cleanliness}  &#9679; Stall: {stalls} &#9679; Level: {level} <br>
                </br> {gender}
                    
                <div>
                    {isliked ? <button onClick={handleLikebutton} className="likeicon"><IoIosHeart /></button> : <button onClick={handleLikebutton} className="likeicon"><IoIosHeartEmpty /></button>}
                    {likecount}
                </div>
                </span>
                <div className="commentcontainer">
                    {comments.sort(function(a, b){
                        var keyA = new Date(a.createdAt),
                            keyB = new Date(b.createdAt)
                        if(keyA < keyB) return -1
                        if(keyA > keyB) return 1
                        return 0;
                        }).map(({username, comment, userId, id}) => {
                            return (
                                <div className="comment">
                                    <span className="commentname">{username}: </span>
                                    <span>{comment}</span>
                                { loggedInUser === userId ? <button id={id} value={id} onClick={handledelete} className="deleteicon">x</button> : null }
                                </div>
                            )})}
                </div>
                <div>
                    <form className="comment-form" id="commentform">
                        <div className="comment-form-fields">
                            <textarea placeholder="Comment" className="commenttext" rows="2" id="newcomment" value={newcomment} onChange={handleInputChange}></textarea>
                            <button type="submit" className="commentsubmit" onClick={handleSubmit}>Post</button>
                        </div>
                    </form>
                </div>
                </CardText> 
            </CardBody>
        </Card>



        // <!-- dont touch here -->
                ))}
            </div>
}

export default Bathroomform;