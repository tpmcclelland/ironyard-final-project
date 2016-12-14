import React, {Component}  from 'react';
import classAutoBind from 'react-helpers/dist/classAutoBind'

class OrderItemMap extends Component {

  constructor(props) {
    super(props)
    classAutoBind(this)
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.detailsShown) {
      this.initMap()
    }
  }

  componentWillUnmount() {
  }

  initMap() {
    var latLong = {lat: Number(this.props.latitude), lng: Number(this.props.longitude)};
      var map = new google.maps.Map(document.getElementById('map-' + this.props.orderID), {
        zoom: 12,
        center: latLong,
      });
      var marker = new google.maps.Marker({
        position: latLong,
        map: map
      })
  }

  render() {
    return <div></div>

  }
}

export default OrderItemMap
