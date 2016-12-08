import React from 'react'

const OrderLeftNav = (props) => <section className="col-xs-12 col-sm-2 left-side-navbar hidden-print">
  <ul className="list-group side-nav">
    <a href="#active-orders-anchor" className="list-group-item red-background"><img src="../assets/cat-health-list.png" alt="Order status" /></a>
    <a href="#available-orders-anchor" className="list-group-item green-background"><img src="../assets/choice.png" alt="Order detail" /></a>
    <a href="#metrics-anchor" className="list-group-item lightBlue-background"><img src="../assets/speech-bubble.png" alt="Review" /></a>
  </ul>
</section>

export default OrderLeftNav
