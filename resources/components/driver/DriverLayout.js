import React from 'react'

import Header from '../common/Header'
import DriverLeftNav from './DriverLeftNav'

class DriverLayout extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <div>
        <Header />
        <main className="row">
            <DriverLeftNav />
            <div className="col-xs-12 driver">
                <section className="col-xs-12 main-section">
                    {this.props.children}
                </section>
            </div>
        </main>
        </div>
    }
}

export default DriverLayout
