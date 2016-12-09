import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'

class CookerLeftNavNew extends React.Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = {
            recipesClicked: false,
            listClicked: false,
            scheduleClicked: false,
            paymentClicked: false
        }
    }
    render() {
        return <div className="navigation flex">
            <button className={this.state.recipesClicked?'navigation-step red-clicked':'navigation-step red-background'} type="button" onClick={() => this.setState({recipesClicked: !this.state.recipesClicked})}></button>
            <h3 className="lead">pick your recipes</h3>
            <button className={this.state.listClicked?'navigation-step green-clicked':'navigation-step green-background'} type="button" onClick={() => this.setState({listClicked: !this.state.listClicked})}></button>
            <h3 className="lead">edit your shopping list</h3>
            <button className={this.state.scheduleClicked?'navigation-step yellow-clicked':'navigation-step yellow-background'} type="button" onClick={() => this.setState({scheduleClicked: !this.state.scheduleClicked})}></button>
            <h3 className="lead">schedule your delivery</h3>
            <button className={this.state.paymentClicked?'navigation-step lightBlue-clicked':'navigation-step lightBlue-background'} type="button" onClick={() => this.setState({paymentClicked: !this.state.paymentClicked})}></button>
            <h3 className="lead">pay for your order</h3>
        </div>
    }
}


export default CookerLeftNavNew
