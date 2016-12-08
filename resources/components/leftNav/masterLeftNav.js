import React from 'react'

const masterLeftNav = (props) => <section className="col-xs-12 col-sm-2 left-side-navbar hidden-print">
  <ul className="list-group side-nav">
    <a href="../#" className="list-group-item grey-background"><img src="../assets/login.png" alt="Home" /></a>
    <a href="../cooker#recipe-anchor" className="list-group-item grey-background"><img src="../assets/recipe.png" alt="recipe" /></a>
    <a href="../cooker#shopping" className="list-group-item grey-background"><img src="../assets/shopping-list.png" alt="shopping list" /></a>
    <a href="../cooker#schedule" className="list-group-item grey-background"><img src="../assets/shopping-cart.png" alt="shopping cart" /></a>
    <a href="../cooker#payment" className="list-group-item grey-background"><img src="../assets/payment-method.png" alt="payment" /></a>
    <a href="../orders#active-orders" className="list-group-item grey-background"><img src="../assets/cat-health-list.png" alt="Order status" /></a>
    <a href="../driver#active-orders-anchor" className="list-group-item grey-background"><img src="../assets/list.png" alt="active orders" /></a>
    <a href="../driver#available-orders-anchor" className="list-group-item grey-background"><img src="../assets/add-to-shopping-cart.png" alt="available orders" /></a>
    <a href="../driver#metrics-anchor" className="list-group-item grey-background"><img src="../assets/speedometer.png" alt="metrics" /></a>
  </ul>
</section>

export default masterLeftNav
