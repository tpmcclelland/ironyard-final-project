import React from 'react'
import { Link } from 'react-router'

import WelcomeLayout from './WelcomeLayout'
import Recipes from '../cooker/Recipes'
import WelcomeMetrics from './WelcomeMetrics'


class Welcome extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <WelcomeLayout>
          <div className="row full-screen">
            <div className="row welcome-padding red-background overflow-scroll push-down hidden-print">
              <div id="guest-recipes" className="col-sm-11 col-sm-offset-1">
                <Recipes resultSize={4} />
              </div>
            </div>
            <div className="row welcome-padding welcome-centered green-background overflow-scroll push-down hidden-print">
              <div id="guest-login" className="col-sm-11 col-sm-offset-1">
                <div className="">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-4">
                        <Link to="/login" className="btn btn-success btn-block">
                          <img src="../assets/login.png" alt="Login" />
                        </Link>
                      </div>
                      <div className="col-sm-4">
                        <Link to="/driver/signup" className="btn btn-primary btn-block">
                          <img src="../assets/fast-delivery.png" alt="Driver Signup" />
                        </Link>
                      </div>
                      <div className="col-sm-4">
                        <Link to="/cooker/signup" className="btn btn-primary btn-block">
                          <img src="../assets/cooking.png" alt="Cooker Signup" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="row full-screen lightBlue-background overflow-scroll push-down hidden-print">
              <div id="guest-metrics" className="col-sm-11 col-sm-offset-1">
                <WelcomeMetrics />
              </div>
            </div>
        </WelcomeLayout>
    }
}

export default Welcome
