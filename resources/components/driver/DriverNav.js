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
            metricsClicked: false,
        }
    }
    componentDidMount() {
        if (this.props.route !== undefined) {
            this.click(this.props.route.pathname)
        } else {
            this.setState({
                activeClicked: false
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.route !== undefined) {
            this.click(nextProps.route.pathname)
        }
    }
    click (button) {
        switch (button) {
            case '/driver':
                this.setState({
                    activeClicked: true,
                    availableClicked: false,
                    metricsClicked: false,
                })
                window.scrollTo(0,0)
                break;
            case '/driver/available':
                this.setState({
                    activeClicked: false,
                    availableClicked: true,
                    metricsClicked: false,
                })
                window.scrollTo(0,0)
                break;
            case '/driver/metrics':
                this.setState({
                    activeClicked: false,
                    availableClicked: false,
                    metricsClicked: true,
                })
                window.scrollTo(0,0)
                break;
        }
    }
    render() {
        return <div className="col-xs-12 text-center driver-navigation text-center">
            <div className="navigation-item">
            <Link to='/driver' onClick={() => this.click('/driver')} className="flex">
                <button className={this.state.activeClicked?'navigation-step red-clicked btn':'navigation-step red-background btn'} type="button" ></button>
            </Link>
            <h3 className="lead">your active orders</h3>
            </div>
            <div className="navigation-item">
            <Link to='/driver/available' onClick={() => this.click('/driver/available')} className="flex">
                <button className={this.state.availableClicked?'navigation-step green-clicked btn':'navigation-step green-background btn'} type="button" ></button>
            </Link>
            <h3 className="lead">find an order</h3>
            </div>
            <div className="navigation-item">
                <Link to='/driver/metrics' onClick={() => this.click('/driver/metrics')} className="flex">
                    <button className={this.state.metricsClicked?'navigation-step lightBlue-clicked btn':'navigation-step lightBlue-background btn'} type="button"></button>
                </Link>
                <h3 className="lead">view your metrics</h3>
            </div>
        </div>
    }
}


export default DriverNav
