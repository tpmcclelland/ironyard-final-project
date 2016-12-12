import React, {Component}  from 'react';
import classAutoBind from 'react-helpers/dist/classAutoBind'
// import { sharedState, attachSharedState, detachSharedState } from 'react-helpers/dist/sharedState'
// import { connect } from 'react-redux'
// import store from '../redux/_ReduxStore'

class ActiveOrderItemMap extends Component {

  constructor(props) {
    super(props)
    classAutoBind(this)
    // this.state = sharedState()
  }

  componentDidMount() {
    console.log("mount", this.props)
    // attachSharedState(this, (state) => this.setState({sharedState: state}))
    this.initMap()
  }

  componentWillUnmount() {
    // detachSharedState(this)
  }

  initMap() {
    console.log("mapdraw", this.props.latitude)
    var latLong = {lat: Number(this.props.latitude), lng: Number(this.props.longitude)};
    console.log("latLong", latLong)
    console.log("map and orderID", 'map'+this.props.orderID)
    var map = new google.maps.Map(document.getElementById('map-'+this.props.orderID), {
      // zoom: 12,
      // center: new google.maps.LatLng(latLong)
      center: latLong,
      zoom: 12,
    });
    var marker = new google.maps.Marker({
      position: latLong,
      map: map
    })
  }

  render() {
    return <div></div>
    // <div><h1>Help</h1></div>

  }
}

export default ActiveOrderItemMap
