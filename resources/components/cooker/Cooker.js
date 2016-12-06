import React, { Component } from 'react'

import Recipes from './Recipes'
import ShoppingList from './ShoppingList'
import Schedule from './Schedule'
import Payment from './Payment'
import CookerLayout from './CookerLayout'

class Cooker extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {

    }
    componentDidMount() {

    }

    render() {
        return <CookerLayout>
          <div className="row full-screen red-background overflow-scroll push-down hidden-print">
            <div className="col-sm-11 col-sm-offset-1">
              <Recipes resultSize={20} />
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

export default Cooker
