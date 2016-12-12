import React, {Component}  from 'react';
import classAutoBind from 'react-helpers/dist/classAutoBind'

class OrderItemMap extends Component {

  constructor(props) {
    super(props)
    classAutoBind(this)
  }

  componentDidMount() {
    // if (this.props.shownFlag == true) {
      this.initMap()
    // }
  }

  componentWillUnmount() {
  }

  // google.maps.event.trigger(map, 'resize');

  initMap() {
    var latLong = {lat: Number(this.props.latitude), lng: Number(this.props.longitude)};
    console.log(this.props.shownFlag)
      var map = new google.maps.Map(document.getElementById('map-' + this.props.orderID), {
        zoom: 12,
        center: latLong,
      });
      var marker = new google.maps.Marker({
        position: latLong,
        map: map
      })
      var resize = new google.maps.event.trigger(map, 'resize')
      console.log(resize)
  }


  render() {
    return <div></div>
    // <div><h1>Help</h1></div>

  }
}

export default OrderItemMap
