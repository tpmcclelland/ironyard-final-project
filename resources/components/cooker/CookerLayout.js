import React from 'react'

import Header from '../common/Header'
import CookerLeftNav from './CookerLeftNav'

const CookerLayout = (props) => <div>
    <Header />
    <main className="container">
        <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-3">
                <CookerLeftNav {...props}/>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-9 section-background">
                <div className="row">
                {props.children}
                </div>
            </div>
        </div>
    </main>
</div>

export default CookerLayout
