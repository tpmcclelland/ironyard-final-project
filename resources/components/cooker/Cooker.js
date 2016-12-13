import React, { Component } from 'react'

import CookerLayout from './CookerLayout'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import classAutoBind from 'react-helpers/dist/classAutoBind'

class Cooker extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)

    }
    componentDidMount() {
      store.dispatch({type:'RESULT_SIZE', resultSize: 20})
    }
    shoppingListFetch() {
      var user = JSON.parse(sessionStorage.getItem('user'))

      fetch('/api/v1/shoppinglists?id=' + user.user.id, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(this.handleShoppingListFetch)
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })
    }
    handleShoppingListFetch(response) {
      if (response.length === 0) {
        store.dispatch({type: 'LIST_AVAILABLE', shoppingListAvailable: false})
      } else {
        store.dispatch({type: 'LIST_AVAILABLE', shoppingListAvailable: true})
      }
    }
    ordersFetch() {
      var user = JSON.parse(sessionStorage.getItem('user'))
      fetch('/api/v1/cookers/' + user.cooker.id, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(this.handleOrdersFetch)
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })
    }
    handleOrdersFetch(response) {
      if (response.numOrders > 0) {
        if (response.completeOrders) {
          store.dispatch({type: 'ORDERS_AVAILABLE', ordersAvailable: true})
        }
      }
      if (response.openOrder) {
        store.dispatch({type: 'PAYMENT_AVAILABLE', paymentAvailable: true})
      }
    }

    render() {
        return <CookerLayout shoppingListFetch={this.shoppingListFetch()} ordersFetch={this.ordersFetch()}>
          {this.props.children}
        </CookerLayout>
    }
}

const mapStateToProps = function(store) {
  return {
    currentUser: store.sharedUser.currentUser,
    shoppingListAvailable: store.sharedRecipe.shoppingListAvailable,
    paymentAvailable: store.sharedRecipe.paymentAvailable,
    ordersAvailable: store.sharedRecipe.ordersAvailable
  }
}

export default connect(mapStateToProps)(Cooker)
