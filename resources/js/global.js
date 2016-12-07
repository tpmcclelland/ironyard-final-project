import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import store from '../components/redux/_ReduxStore'

import App from '../components/app/App'
import Welcome from '../components/welcome/Welcome'
import Cooker from '../components/cooker/Cooker'
import Orders from '../components/orders/Orders'
import Driver from '../components/driver/Driver'
import Login from '../components/session/Login'
import DriverSignup from '../components/session/DriverSignup'
import CookerSignup from '../components/session/CookerSignup'

const newBrowserHistory = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={newBrowserHistory}>
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
  </Provider>
    , document.getElementById('app'))
