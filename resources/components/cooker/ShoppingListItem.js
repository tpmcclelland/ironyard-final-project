import React from 'react'

const ShoppingListItem = (props) => <div className="list-group-item">
    <h3>{props.item.ingredient.name}</h3>
    <div className="form-group">
      <label htmlFor="quantity"/>
      <input name="quantity" type="text" value={props.item.quantity || ''} onChange={(e) => props.changeQuantity(e.target.value)} /> {props.item.unit}
    </div>
    <button type="button" className="btn btn-danger" onClick={props.markRemoved}>Remove</button>
  </div>

export default ShoppingListItem
