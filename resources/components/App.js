import React from 'react'

import Header from './Header'
import LeftNav from './LeftNav'
import ShoppingList from './ShoppingList'
import Recipes from './Recipes.js'
import Schedule from './Schedule.js'
import Payment from './Payment.js'

class App extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return <div>
            <Header />
            <main className="row">
                <LeftNav />
                <div className="col-xs-12">
                    <section className="col-xs-12 main-section">
                        <div className="row full-screen red-background overflow-scroll push-down hidden-print">
                            <div id="recipes" className="col-sm-11 col-sm-offset-1">
                                <Recipes />
                            </div>
                        </div>
                        <div className="row full-screen green-background overflow-scroll">
                            <div id="shopping" className="col-sm-11 col-sm-offset-1">
                                <ShoppingList />
                            </div>
                        </div>
                        <div className="row full-screen lightBlue-background overflow-scroll hidden-print">
                            <div id="schedule" className="col-sm-11 col-sm-offset-1">
                                <Schedule />
                            </div>
                        </div>
                        <div className="row full-screen yellow-background overflow-scroll hidden-print">
                            <div id="payment" className="col-sm-11 col-sm-offset-1">
                                <Payment />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    }
}

export default App
