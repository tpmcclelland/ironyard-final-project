import React from 'react'

import Header from '../common/Header'
import CookerLeftNav from './CookerLeftNav'
import MasterLeftNav from '../leftNav/MasterLeftNav'
import CookerLeftNavNew from './CookerLeftNavNew'
// import MasterLeftNav from '../leftNav/MasterLeftNav'

const CookerLayout = (props) => <div>
    <Header />
    <main className="container">
        <div className="row">
            <div className="col-sm-3">
                <CookerLeftNavNew />
            </div>
            <div className="col-sm-9">
                {props.children}
            </div>
        </div>

        {/* <MasterLeftNav /> */}
        {/* <div className="col-xs-12">
            <section className="col-xs-12 main-section">
              {props.children}
            </section>
        </div> */}
        </main>
        </div>

{/* const CookerLayout = (props) => <div>
    <Header />
    <main className="row">
        <CookerLeftNav />
        <div className="col-xs-12">
            <section className="col-xs-12 main-section">
              {props.children}
            </section>
        </div>

    </main>
    </div> */}

export default CookerLayout
