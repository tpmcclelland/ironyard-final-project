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
            <h1>Welcome!</h1>
            <WelcomeMetrics />
            <Recipes resultSize={5} />
            <div className="well">
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-4">
                            <Link to="/login" className="btn btn-success btn-block">
                                Login
                            </Link>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/driver/signup" className="btn btn-primary btn-block">
                                Driver Signup
                            </Link>
                        </div>
                        <div className="col-sm-4">
                            <Link to="/cooker/signup" className="btn btn-primary btn-block">
                                Cooker Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </WelcomeLayout>
    }
}

export default Welcome
