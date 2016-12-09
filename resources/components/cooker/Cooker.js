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
      store.dispatch({type:'RESULT_SIZE', resultSize: 20})
    }




    render() {
        return <CookerLayout>
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
