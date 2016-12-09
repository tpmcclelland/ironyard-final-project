import React from 'react'
import {Link} from 'react-router'

const CookerLeftNav = (props) => <section className="col-xs-12 col-sm-2 left-side-navbar hidden-print">
  <ul className="list-group side-nav">
    <Link to="/cooker" className="list-group-item grey-background"><img src="../assets/recipe.png" alt="recipe" /></Link>
    <Link to="/cooker/shoppinglist" className="list-group-item grey-background"><img src="../assets/shopping-list.png" alt="shopping list" /></Link>
    <Link to="/cooker/schedule" className="list-group-item grey-background"><img src="../assets/shopping-cart.png" alt="shopping cart" /></Link>
    <Link to="/cooker/payment" className="list-group-item grey-background"><img src="../assets/payment-method.png" alt="payment" /></Link>
    <Link to="/cooker/orders" className="list-group-item grey-background"><img src="../assets/cat-health-list.png" alt="Order status" /></Link>
 </ul>
</section>

export default CookerLeftNav
