import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import {Link} from 'react-router'

class CookerLeftNav extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
            recipesClicked: true,
            listClicked: false,
            scheduleClicked: false,
            paymentClicked: false,
            viewOrdersClicked: false,
        }
    }
    componentDidMount() {
        this.click(this.props.children.props.location.pathname)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.children.props.location.pathname)
        this.click(nextProps.children.props.location.pathname)
    }
    click (button) {
        switch (button) {
            case '/cooker':
                this.setState({
                    recipesClicked: true,
                    listClicked: false,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                break;
            case '/cooker/shoppinglist':
                this.setState({
                    recipesClicked: false,
                    listClicked: true,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                break;
            case '/cooker/schedule':
                this.setState({
                    recipesClicked: false,
                    listClicked: false,
                    scheduleClicked: true,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                break;
            case '/cooker/payment':
                this.setState({
                    recipesClicked: false,
                    listClicked: false,
                    scheduleClicked: false,
                    paymentClicked: true,
                    viewOrdersClicked: false,
                })
                break;
            case '/cooker/orders':
                this.setState({
                    recipesClicked: false,
                    listClicked: false,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: true,
                })
                break;
        }
    }
    render() {
        return <div className="navigation flex">
            <Link to='/cooker' onClick={() => this.click('/cooker')}>
                <button className={this.state.recipesClicked?'navigation-step red-clicked btn':'navigation-step red-background btn'} type="button" ></button>
            </Link>
            <h3 className={"lead"}>pick your recipes</h3>
            <Link to='/cooker/shoppinglist' onClick={() => this.click('/cooker/shoppinglist')}>
                <button className={this.state.listClicked?'navigation-step green-clicked btn':'navigation-step green-background btn'} type="button" ></button>
            </Link>
            <h3 className="lead">edit your shopping list</h3>
            <Link to='/cooker/schedule' onClick={() => this.click('/cooker/schedule')}>
                <button className={this.state.scheduleClicked?'navigation-step lightBlue-clicked btn':'navigation-step lightBlue-background btn'} type="button"></button>
            </Link>
            <h3 className="lead">schedule your delivery</h3>
            <Link to='/cooker/payment' onClick={() => this.click('/cooker/payment')}>
                <button className={this.state.paymentClicked?'navigation-step yellow-clicked btn':'navigation-step yellow-background btn'} type="button"></button>
            </Link>
            <h3 className="lead">pay for your order</h3>
            <Link to='/cooker/orders' onClick={() => this.click('/cooker/orders')}>
                <button className={this.state.viewOrdersClicked?'navigation-step darkBlue-clicked btn':'navigation-step darkBlue-background btn'} type="button"></button>
            </Link>
            <h3 className="lead">view your orders</h3>
        </div>
    }
}


export default CookerLeftNav
