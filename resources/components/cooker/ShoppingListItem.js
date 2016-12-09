import React from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'

class ShoppingListItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      quantity: props.item.quantity,
      name: props.item.ingredient.name,
      unit: props.item.unit,
      markRemoved: props.markRemoved
    }

    classAutoBind(this)
  }

  handleTyping(e) {
      let updatedState = {}
      updatedState[e.target.name] = e.target.value
      this.setState(updatedState)
  }

  render() {
    return <div className="list-group-item">
      <h3>{this.state.name}</h3>
      <div className="form-group">
        <label htmlFor="quantity"/>
        <input name="quantity" type="text" onChange={this.handleTyping} value={this.state.quantity} /> {this.state.unit}
      </div>
      <button type="button" className="btn btn-danger" onClick={this.state.markRemoved}>Remove</button>
    </div>

  }
}
export default ShoppingListItem
