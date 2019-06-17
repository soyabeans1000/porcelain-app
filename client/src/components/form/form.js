import React from 'react'
import { FaLocationArrow } from "react-icons/fa"
import './form.css'

const Form = ({handleFormSubmit, handleInputChange, handleLocation, street, city, state, zipcode, gender, stalls, level, cleanliness, caption }) =>
    <form className="form" action="/action_page.php" id="addbrform">       
        <div class='row'>
            <label htmlFor="street">Street </label>
            <button onClick={handleLocation} className="locationicon"><FaLocationArrow /></button>
            <input id="street" type="text" value={street} onChange={handleInputChange} />
        </div>

        <div class='row'>
            <label htmlFor="city">City </label>
            <input id="city" type="text" value={city} onChange={handleInputChange} />
        </div>

        <div class='row'>
            <label htmlFor="state">State </label>
            <select id="state" name="states" value={state} onChange={handleInputChange} >
                <option value="" disabled selected>Select an Option</option>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
            </select>
        </div>

        <div class='row'>
            <label htmlFor="zipcode">Zipcode </label>
            <input id="zipcode" type="text" value={zipcode} onChange={handleInputChange} />
        </div>

        <div class='row'>
            <label htmlFor="gender">Bathroom Type </label>
            <select id="gender" name="genders" value={gender} onChange={handleInputChange}>
                <option value="" disabled selected>Select an Option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
                <option value="Family">Family</option>
                <option value="Other">Other</option>
            </select>
        </div>

        <div class='row'>
            <label htmlFor="stalls">Number of Stalls </label>
            <input id="stalls" type="number" value={stalls} onChange={handleInputChange} />
        </div>

        <div class='row'>
            <label htmlFor="level">Floor/Level </label>
            <input id="level" type="number" value={level} onChange={handleInputChange} />
        </div>

        <div class='row'>
            <label htmlFor="cleanliness">Cleanliness </label>
            <select id="cleanliness" name="cleanliness" value={cleanliness} onChange={handleInputChange} >
                <option value="" disabled selected>Select an Option</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div class='row'>
            <label htmlFor="caption">Caption </label>
            <input id="caption" type="text" value={caption} onChange={handleInputChange} />
        </div>
        <div class='row'>
            <label id='imageLabel' htmlFor="image">Upload Image </label>
            <input id="image" className="imageinput" type="file" onChange={handleInputChange} />
        </div>
        <button id='submit' onClick={handleFormSubmit} className="addbr"> Add Restroom</button>
    </form>

export default Form