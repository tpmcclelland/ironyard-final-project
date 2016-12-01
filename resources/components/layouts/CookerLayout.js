import React from 'react'

import Header from '../Header'
import LeftNav from '../LeftNav'

const CookerLayout = (props) => <div>
    <Header />
    <main className="row">
        <LeftNav />
        <div className="col-xs-12">
            <section className="col-xs-12 main-section">
              {props.children}
            </section>
        </div>
    </main>
    </div>

export default CookerLayout
