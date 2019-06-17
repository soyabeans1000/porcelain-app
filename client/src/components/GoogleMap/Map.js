import React, { Component } from "react"
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react"
import Axios from "axios"
import BathroomGet from '../../utils/bathroom'




export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: { lat: 32, lng: 32 },
      loading: true,
      geo: { city: '', state: '' },
      locations: [],
      dbArr: [],
      geoArr: [],
      reverseGeo: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.init()
  }

  init() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      this.setState({
        userLocation: { lat: latitude, lng: longitude },
        loading: false
      }, () => this.reverseGeocode())
    })
  }

  reverseGeocode() {
      Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.userLocation.lat}, ${this.state.userLocation.lng}&key=${process.env.REACT_APP_MAP_KEY}`)
        .then(res => res.data)
        .then(({ results }) => {
          let i = results[0].address_components
          this.setState({ reverseGeo: { city: i[2].short_name, state: i[4].short_name } }, () => {
            this.getBathrooms()
          })
        })
  }

  getBathrooms() {
      BathroomGet.getAll(this.state.reverseGeo.city, this.state.reverseGeo.state)
        .then(({ data }) => {
          data.map(({ street, city, state, id }) => {
            id = id
            Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${city}+${state}&key=${process.env.REACT_APP_MAP_KEY}`)
              .then(({ data }) => {
                let newArr = { location: data.results[0].geometry.location, id: id }
                this.setState({ geoArr: this.state.geoArr.concat(newArr) }, () => this.renderMarkers())
              })
          })
        })
  }

  renderMarkers() {
    return this.state.geoArr.map(({ location, id }, i) => {
      return <Marker
        key={i}
        onClick={this.onMarkerClick}
        position={location}
        id={id}
      />
    })
  }


  onMarkerClick = (props, marker, e) => {
    this.props.handleOnClick(marker.id)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: false
    })};


  renderMap() {
    return (
      <div>
        <Map
          google={this.props.google}
          initialCenter={this.state.userLocation}
          zoom={16}
          gestureHandling= 'greedy'
          style={{ width: "100%", height: "67%" }}
        >
          <Marker icon='http://maps.google.com/mapfiles/ms/icons/blue-dot.png' name="Current Location">position={this.state.userLocation}</Marker>
          {this.renderMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <p>{this.state.selectedPlace.name}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>

    )
  }

  render() {
    return (
      <div>
      
        {this.state.loading ? null : this.renderMap()}
      
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY
})(MapContainer);