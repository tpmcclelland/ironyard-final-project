import React from 'react'

import Header from '../common/Header'
import DriverNav from './DriverNav'

const DriverLayout = (props) => <div>
    <Header />
    <main className="container">
        <div className="row">
            <section className="col-xs-12 section-background">
                <div className="row">
                    {props.children}
                </div>
            </section>
        </div>
    </main>
    <div className="row">
        <DriverNav/>
    </div>

    </div>

export default DriverLayout
