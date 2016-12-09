import React, { Component } from 'react'

import Recipes from './Recipes'
import RecipesNew from './RecipesNew'
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
      store.dispatch({type:'RESULT_SIZE', resultSize: 20})
    }




    render() {
        return <CookerLayout>
          {/* <div className="gray-background col-xs-12"> */}
          <RecipesNew />
          {/* </div> */}
          {/* <div className="row full-screen red-background overflow-scroll push-down hidden-print">
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
          </div> */}
          <div className="row full-screen red-background overflow-scroll push-down hidden-print">
            <div className="col-sm-11 col-sm-offset-1">
              {this.props.children}
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
