import React, {Component}  from 'react';
import classAutoBind from 'react-helpers/dist/classAutoBind'

class ActiveOrderItemMap extends Component {

  constructor(props) {
    super(props)
    classAutoBind(this)
  }

  componentDidMount() {
    this.initMap()
  }

  initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    })
  }

  render() {
    return <div id='map'></div>
    // <div><h1>Help</h1></div>

  }
}

export default ActiveOrderItemMap
