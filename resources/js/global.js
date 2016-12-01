import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from '../components/app/App'
import Welcome from '../components/welcome/Welcome'
import Cooker from '../components/cooker/Cooker'
import Orders from '../components/orders/Orders'
import Driver from '../components/driver/Driver'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App} >
            <IndexRoute component={Welcome} />
            <Route path="cooker" component={Cooker} />
            <Route path="driver" component ={Driver} />
            <Route path="orders" component={Orders} />
        </Route>
    </Router>
    , document.getElementById('app'))
