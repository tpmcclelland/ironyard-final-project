import React from 'react'

import Header from '../common/Header'
import CookerLeftNav from './CookerLeftNav'

const CookerLayout = (props) => <div>
    <Header />
    <main className="container">
        <div className="row">
            <div className="col-sm-3">
                <CookerLeftNav />
            </div>
            <div className="col-sm-9 section-background">
                <div className="row">
                {props.children}
                </div>
            </div>
        </div>
    </main>
</div>

export default CookerLayout
