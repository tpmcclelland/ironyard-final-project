import React from 'react'

const LeftNav = (props) => <section className="col-xs-12 col-sm-2 left-side-navbar hidden-print">
  <ul className="list-group side-nav">
    <a href="#recipe-anchor" className="list-group-item red-background"><img src="../assets/recipe.png" alt="recipe" /></a>
    <a href="#shopping" className="list-group-item green-background"><img src="../assets/shopping-list.png" alt="shopping list" /></a>
    <a href="#schedule" className="list-group-item lightBlue-background"><img src="../assets/shopping-cart.png" alt="shopping cart" /></a>
    <a href="#payment" className="list-group-item yellow-background"><img src="../assets/payment-method.png" alt="payment" /></a>
  </ul>
</section>

export default LeftNav
