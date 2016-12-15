import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import {Link} from 'react-router'

import { connect } from 'react-redux'
import store from '../redux/_ReduxStore'

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
            shoppingListDisabled: true,
            paymentDisabled: true,
            ordersDisabled: true,
        }
    }
    componentDidMount() {
        var pathname = this.props.children.props.location.pathname
        if (pathname.includes('favorites')) {
            this.click('/favorites')
        } else {
            this.click(pathname)
        }
    }
    componentWillReceiveProps(nextProps) {
        var nextPathname = nextProps.children.props.location.pathname
        if (nextProps.shoppingListAvailable) {
            this.restrictNavigation('shoppingListAvailable')
        } else {
            this.restrictNavigation('shoppingListUnavailable')
        }
        if (nextProps.paymentAvailable) {
            this.restrictNavigation('paymentAvailable')
        } else {
            this.restrictNavigation('paymentUnavailable')
        }
        if (nextProps.ordersAvailable) {
            this.restrictNavigation('ordersAvailable')
        } else {
            this.restrictNavigation('ordersUnavailable')
        }
        if (nextPathname.includes('favorites')) {
            this.click('/favorites')
        } else {
            this.click(nextPathname)
        }
    }
    restrictNavigation(restriction) {
        switch (restriction) {
            case 'shoppingListAvailable':
                this.setState({
                    shoppingListDisabled: false
                })
                break;
            case 'shoppingListUnavailable':
                this.setState({
                    shoppingListDisabled: true
                })
                break;
            case 'paymentAvailable':
                this.setState({
                    paymentDisabled: false
                })
                break;
            case 'paymentUnavailable':
                this.setState({
                    paymentDisabled: true
                })
                break;
            case 'ordersAvailable':
                this.setState({
                    ordersDisabled: false
                })
                break;
            case 'ordersUnavailable':
                this.setState({
                    ordersDisabled: true
                })
                break;
        }
    }
    click (button) {
        switch (button) {
            case '/favorites': {
                this.setState({
                    recipesClicked: false,
                    listClicked: false,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                // window.scrollTo(0,0)
                break;
            }
            case '/cooker':
                this.setState({
                    recipesClicked: true,
                    listClicked: false,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                window.scrollTo(0,0)
                break;
            case '/cooker/shoppinglist':
                this.setState({
                    recipesClicked: false,
                    listClicked: true,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                window.scrollTo(0,0)
                break;
            case '/cooker/schedule':
                this.setState({
                    recipesClicked: false,
                    listClicked: false,
                    scheduleClicked: true,
                    paymentClicked: false,
                    viewOrdersClicked: false,
                })
                window.scrollTo(0,0)
                break;
            case '/cooker/payment':
                this.setState({
                    recipesClicked: false,
                    listClicked: false,
                    scheduleClicked: false,
                    paymentClicked: true,
                    viewOrdersClicked: false,
                })
                window.scrollTo(0,0)
                break;
            case '/cooker/orders':
                this.setState({
                    recipesClicked: false,
                    listClicked: false,
                    scheduleClicked: false,
                    paymentClicked: false,
                    viewOrdersClicked: true,
                })
                window.scrollTo(0,0)
                break;
        }
    }
    render() {
        return <div className="navigation flex">
            <div className="text-center phone-nav-item">
                <Link to='/cooker' onClick={() => this.click('/cooker')} className={this.state.paymentDisabled?'':'inactive'}>
                    <button className={this.state.paymentDisabled === false?'navigation-step btn inactive':this.state.recipesClicked?'navigation-step red-clicked btn':'navigation-step red-background btn'} type="button" disabled={this.state.paymentDisabled?false:true}></button>
                </Link>
                <h3 className={this.state.paymentDisabled?'lead':'lead inactive'}>pick <span className="hidden-xs">your recipes</span></h3>
            </div>
            <div className="text-center phone-nav-item">
                <Link to='/cooker/shoppinglist' onClick={() => this.click('/cooker/shoppinglist')} className={this.state.shoppingListDisabled?'inactive':''}>
                    <button className={this.state.shoppingListDisabled?'inactive btn navigation-step':this.state.listClicked?'navigation-step green-clicked btn':'navigation-step green-background btn'} type="button"  disabled={this.state.shoppingListDisabled?true:false}></button>
                </Link>
                <h3 className={this.state.shoppingListDisabled?'lead inactive':'lead'}>edit <span className="hidden-xs">your shopping list</span></h3>
                </div>
            <div className="text-center phone-nav-item">
                <Link to='/cooker/schedule' onClick={() => this.click('/cooker/schedule')}  className={this.state.shoppingListDisabled?'inactive':''}>
                    <button className={this.state.shoppingListDisabled?'inactive btn navigation-step':this.state.scheduleClicked?'navigation-step lightBlue-clicked btn':'navigation-step lightBlue-background btn'} type="button" disabled={this.state.shoppingListDisabled?true:false}></button>
                </Link>
                <h3 className={this.state.shoppingListDisabled?'lead inactive':'lead'}>schedule <span className="hidden-xs">your delivery</span></h3>
            </div>
            <div className="text-center phone-nav-item">
                <Link to='/cooker/payment' onClick={() => this.click('/cooker/payment')}  className={this.state.paymentDisabled?'inactive':''}>
                    <button className={this.state.paymentDisabled?'inactive btn navigation-step':this.state.paymentClicked?'navigation-step yellow-clicked btn':'navigation-step yellow-background btn'} type="button" disabled={this.state.paymentDisabled?true:false}></button>
                </Link>
                <h3 className={this.state.paymentDisabled?'lead inactive':'lead'}>pay <span className="hidden-xs">for your order</span></h3>
            </div>
            <div className="text-center phone-nav-item">
                <Link to='/cooker/orders' onClick={() => this.click('/cooker/orders')} className={this.state.ordersDisabled?'inactive':''}>
                    <button className={this.state.ordersDisabled?'inactive btn navigation-step':this.state.viewOrdersClicked?'navigation-step darkBlue-clicked btn':'navigation-step darkBlue-background btn'} type="button" disabled={this.state.ordersDisabled?true:false}></button>
                </Link>
                <h3 className={this.state.ordersDisabled?'lead inactive':'lead'}>view <span className="hidden-xs">your orders</span></h3>
            </div>
        </div>
    }
}

const mapStateToProps = function(store) {
  return {
    shoppingListAvailable: store.sharedRecipe.shoppingListAvailable,
    paymentAvailable: store.sharedRecipe.paymentAvailable,
    ordersAvailable: store.sharedRecipe.ordersAvailable
  }
}

export default connect(mapStateToProps)(CookerLeftNav)
