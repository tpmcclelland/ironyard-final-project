import React from 'react'
import { Link } from 'react-router'

import WelcomeLayout from './WelcomeLayout'

class Welcome extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <WelcomeLayout>
        <div className="get-started">
            <div className="row cookers">
                <div className="col-sm-8 col-md-6 col-lg-5">
                    <div className="cooker flex">
                        <h1>pick a recipe</h1>
                        <h1>schedule a delivery</h1>
                        <h1>prepare a meal</h1>
                        <Link to="/cooker/signup">
                        <button type="button" className="btn btn-default">
                        <h3>get your ingredients today</h3>
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row reviews">
                <div className="col-xs-12 text-center">
                    <h1>Customer Reviews</h1>
                    <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 customer-reviews">
                            <blockquote className="text-left">
                                <p>This service is perfect for when I need to make a meal but don't have time to pick up the ingredients myself.  The drivers are always on time!</p>
                                <footer>cooker123</footer>
                            </blockquote>
                            <blockquote className="blockquote-reverse">
                                <p>I love the flexibility of the delivery windows. I can create a list in the morning and have it delivered right when I get home from work.</p>
                                <footer>lovetocook15</footer>
                            </blockquote>
                            <blockquote className="text-left">
                                <p>Awesome recipes and ingredients delivered right to your door by friendly drivers.. what's not to love?</p>
                                <footer>sweettooth4</footer>
                            </blockquote>
                        </div>
                        <div className="col-sm-4 col-md-5 flex">
                            <div className="driver-signup flex">
                                <h4>want these reviews to be about you?</h4>
                                <a href="#driver">
                                <button type="button" className="btn btn-default">
                                    <h4>sign up to be a driver</h4>
                                </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div id="driver" className="row">
                <div className="col-xs-12 col-sm-8 col-md-6 col-lg-5 col-sm-push-4 col-md-push-6 col-lg-push-7">
                    <div className="driver-section flex">
                        <h1>select an order</h1>
                        <h1>deliver ingredients</h1>
                        <h1>make money</h1>
                        <Link to="/driver/signup">
                        <button type="button" className="btn btn-default">
                        <h3>deliver ingredients today</h3>
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </WelcomeLayout>
    }
}

export default Welcome
