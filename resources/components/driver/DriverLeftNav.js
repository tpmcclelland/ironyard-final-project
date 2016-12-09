import React from 'react'
import {Link} from 'react-router'

const DriverLeftNav = (props) => <section className="col-xs-12 col-sm-2 left-side-navbar hidden-print">
  <ul className="list-group side-nav">
    <Link to="/driver" className="list-group-item grey-background"><img src="../assets/list.png" alt="active orders" /></Link>
</ul>
</section>

export default DriverLeftNav
