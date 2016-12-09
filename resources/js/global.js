import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import store from '../components/redux/_ReduxStore'

import App from '../components/app/App'
import Welcome from '../components/welcome/Welcome'
import Cooker from '../components/cooker/Cooker'
import Recipes from '../components/cooker/Recipes'
import ShoppingList from '../components/cooker/ShoppingList'
import Schedule from '../components/cooker/Schedule'
import Payment from '../components/cooker/Payment'
import OrderStatus from '../components/orders/OrderStatus'
import Driver from '../components/driver/Driver'
import Login from '../components/session/Login'
import DriverSignup from '../components/session/DriverSignup'
import CookerSignup from '../components/session/CookerSignup'
import DriverActiveOrders from '../components/driver/DriverActiveOrders'
import DriverAvailableOrders from '../components/driver/DriverAvailableOrders'
import DriverMetrics from '../components/driver/DriverMetrics'

const newBrowserHistory = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={newBrowserHistory}>
        <Route path='/' component={App} >
            <IndexRoute component={Welcome} />
            <Route path="login" component={Login} />
            <Route path="cooker/signup" component={CookerSignup} />
            <Route path="driver/signup" component={DriverSignup} />
            <Route path="cooker" component={Cooker}>
              <IndexRoute component={Recipes} />
              <Route path="shoppinglist" component={ShoppingList} />
              <Route path="schedule" component={Schedule} />
              <Route path="payment" component={Payment} />
              <Route path="orders" component={OrderStatus} />
            </Route>
            <Route path="driver" component={Driver}>
                <IndexRoute component={DriverActiveOrders} />
                <Route path="available" component={DriverAvailableOrders} />
                <Route path="metrics" component={DriverMetrics} />
            </Route>
        </Route>
    </Router>
  </Provider>
    , document.getElementById('app'))
