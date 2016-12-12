import React from 'react'

import Header from '../common/Header'
import CookerLeftNav from './CookerLeftNav'

const CookerLayout = (props) => <div>
    <Header />
    <main className="container">
        <div className="row">
            <div className="col-sm-2 col-md-3">
                <CookerLeftNav {...props}/>
            </div>
            <div className="col-sm-8 col-sm-offset-2 col-md-9 col-md-offset-3 section-background">
                <div className="row">
                {props.children}
                </div>
            </div>
        </div>
    </main>
</div>

export default CookerLayout
