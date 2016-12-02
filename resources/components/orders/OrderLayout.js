import React from 'react'

import Header from '../common/Header'
import OrderLeftNav from './OrderLeftNav'

class OrderLayout extends React.Component {
    constructor(props) {
        super(props)

    }
    render () {
        return <div>
            <Header />
            <main className="row">
                <OrderLeftNav />
                <div id="order" className="col-xs-12">
                    <section className="col-xs-12 main-section">
                        {this.props.children}
                    </section>
                </div>
            </main>
        </div>
    }
}

export default OrderLayout
