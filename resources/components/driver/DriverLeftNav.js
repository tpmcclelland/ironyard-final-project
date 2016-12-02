import React from 'react'

const DriverLeftNav = (props) => <section className="col-xs-12 col-sm-2 left-side-navbar hidden-print">
  <ul className="list-group side-nav">
    <a href="#active-orders-anchor" className="list-group-item red-background"><img src="../assets/list.png" alt="active orders" /></a>
    <a href="#available-orders-anchor" className="list-group-item green-background"><img src="../assets/add-to-shopping-cart.png" alt="available orders" /></a>
    <a href="#metrics-anchor" className="list-group-item lightBlue-background"><img src="../assets/speedometer.png" alt="metrics" /></a>
  </ul>
</section>

export default DriverLeftNav
