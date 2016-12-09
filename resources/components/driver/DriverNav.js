import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import {Link} from 'react-router'

class DriverNav extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
            activeClicked: true,
            availableClicked: false,
            scheduleClicked: false,
            paymentClicked: false,
            viewOrdersClicked: false,
        }
    }
    click (button) {
        switch (button) {
            case 'active':
                this.setState({
                    activeClicked: true,
                    availableClicked: false,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                break;
            case 'available':
                this.setState({
                    activeClicked: false,
                    availableClicked: true,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                break;
            case 'schedule':
                this.setState({
                    activeClicked: false,
                    availableClicked: false,
                    scheduleClicked: true,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                break;
            case 'payment':
                this.setState({
                    activeClicked: false,
                    availableClicked: false,
                    scheduleClicked: false,
                    paymentClicked: true,
                    viewOrdersClicked: false,
                })
                break;
            case 'view':
                this.setState({
                    activeClicked: false,
                    availableClicked: false,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: true,
                })
                break;
        }
    }
    render() {
        return <div className="col-xs-12 text-center driver-navigation text-center">
            <div className="navigation-item">
            <Link to='/driver' onClick={() => this.click('active')} className="flex">
                <button className={this.state.activeClicked?'navigation-step red-clicked btn':'navigation-step red-background btn'} type="button" ></button>
            </Link>
            <h3 className="lead">your active orders</h3>
            </div>
            <div className="navigation-item">
            <Link to='/driver/available' onClick={() => this.click('available')} className="flex">
                <button className={this.state.availableClicked?'navigation-step green-clicked btn':'navigation-step green-background btn'} type="button" ></button>
            </Link>
            <h3 className="lead">find an order</h3>
            </div>
            <div className="navigation-item">
                <Link to='/driver/metrics' onClick={() => this.click('schedule')} className="flex">
                    <button className={this.state.scheduleClicked?'navigation-step lightBlue-clicked btn':'navigation-step lightBlue-background btn'} type="button"></button>
                </Link>
                <h3 className="lead">view your metrics</h3>
            </div>
        </div>
    }
}


export default DriverNav
