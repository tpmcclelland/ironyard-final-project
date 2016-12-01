import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from '../components/app/App'
import Welcome from '../components/welcome/Welcome'
import Cooker from '../components/cooker/Cooker'
import Orders from '../components/orders/Orders'
import Driver from '../components/driver/Driver'
import Login from '../components/session/Login'
import DriverSignup from '../components/session/DriverSignup'
import CookerSignup from '../components/session/CookerSignup'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App} >
            <IndexRoute component={Welcome} />
            <Route path="login" component={Login} />
            <Route path="cooker/signup" component={CookerSignup} />
            <Route path="driver/signup" component={DriverSignup} />
            <Route path="cooker" component={Cooker} />
            <Route path="driver" component ={Driver} />
            <Route path="orders" component={Orders} />
        </Route>
    </Router>
    , document.getElementById('app'))
