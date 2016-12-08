import React from 'react'

import Header from '../common/Header'
import CookerLeftNav from './CookerLeftNav'
import MasterLeftNav from '../leftNav/MasterLeftNav'

const CookerLayout = (props) => <div>
    <Header />
    <main className="row">
        <MasterLeftNav />
        <div className="col-xs-12">
            <section className="col-xs-12 main-section">
              {props.children}
            </section>
        </div>
    </main>
    </div>

export default CookerLayout
