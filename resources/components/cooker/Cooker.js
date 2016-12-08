import React, { Component } from 'react'

import Recipes from './Recipes'
import ShoppingList from './ShoppingList'
import Schedule from './Schedule'
import Payment from './Payment'
import CookerLayout from './CookerLayout'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'
import classAutoBind from 'react-helpers/dist/classAutoBind'

class Cooker extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)

    }

    componentWillUnMount() {

    }

    componentDidMount() {
      this.getFavoriteCount()
      store.dispatch({type:'RESULT_SIZE', resultSize: 20})
    }


    getFavoriteCount() {
      fetch('api/v1/favorites', {
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
        .then(response => {
          store.dispatch({type: 'FAVORITE_COUNT', favoriteCount: response.length})
          store.dispatch({type: 'FAVORITE_RECIPES', favoriteRecipes: response})
          console.log(response)
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })
    }

    render() {
        return <CookerLayout>
          <div className="row full-screen red-background overflow-scroll push-down hidden-print">
            <div id="recipes" className="col-sm-11 col-sm-offset-1">
              <Recipes />
            </div>
          </div>
          <div className="row full-screen green-background overflow-scroll">
            <div id="shopping" className="col-sm-11 col-sm-offset-1">
              <ShoppingList />
            </div>
          </div>
          <div className="row full-screen lightBlue-background overflow-scroll hidden-print">
            <div id="schedule" className="col-sm-11 col-sm-offset-1">
              <Schedule />
            </div>
          </div>
          <div className="row full-screen yellow-background overflow-scroll hidden-print">
              <div id="payment" className="col-sm-11 col-sm-offset-1">
                  <Payment />
              </div>
          </div>
        </CookerLayout>

    }
}

const mapStateToProps = function(store) {
  return {
    currentUser: store.sharedUser.currentUser
  }
}

export default connect(mapStateToProps)(Cooker)
