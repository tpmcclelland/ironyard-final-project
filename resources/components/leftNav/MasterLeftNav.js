import React from 'react'
import {Link} from 'react-router'

const MasterLeftNav = (props) => <section className="col-xs-12 col-sm-2 left-side-navbar hidden-print">
  <ul className="list-group side-nav">
    <Link to="/cooker#recipes" className="list-group-item grey-background"><img src="../assets/recipe.png" alt="recipe" /></Link>
    <Link to="/cooker#shopping" className="list-group-item grey-background"><img src="../assets/shopping-list.png" alt="shopping list" /></Link>
    <Link to="/cooker#schedule" className="list-group-item grey-background"><img src="../assets/shopping-cart.png" alt="shopping cart" /></Link>
    <Link to="/cooker#payment" className="list-group-item grey-background"><img src="../assets/payment-method.png" alt="payment" /></Link>

    <Link to="/orders#active-orders" className="list-group-item grey-background"><img src="../assets/cat-health-list.png" alt="Order status" /></Link>

    <Link to="/driver#active-orders" className="list-group-item grey-background"><img src="../assets/list.png" alt="active orders" /></Link>
    <Link to="/driver#available-orders" className="list-group-item grey-background"><img src="../assets/add-to-shopping-cart.png" alt="available orders" /></Link>
    <Link to="/driver#driver-metrics" className="list-group-item grey-background"><img src="../assets/speedometer.png" alt="metrics" /></Link>

  </ul>
</section>

export default MasterLeftNav
