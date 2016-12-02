import React from 'react'

class CustomerReviews extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="container-fluid">
            <h1>Customer Reviews</h1>
            <div className="row">
                <div className="col-xs-3 well">
                    <div className="panel panel-default">
                    <div className="panel-body">
                        <p>I love this place!</p>
                        <p>- Tom</p>
                    </div>
                    </div>
                </div>
                <div className="col-xs-3 well">
                    <p>I love this place!</p>
                </div>
                <div className="col-xs-3 well">
                    <p>I love this place!</p>
                </div>
            </div>
        </div>
    }
}

export default CustomerReviews
