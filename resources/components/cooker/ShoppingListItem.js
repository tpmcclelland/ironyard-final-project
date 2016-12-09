import React from 'react'

const ShoppingListItem = (props) => <div className="list-group-item">
  <h3>{props.item.ingredient.name}</h3>
  <p>Price: ${props.item.unit_cost}</p>
  <div className="form-group">
    <label htmlFor="quantity"/>
    <input name={'quantity_' + props.key} type="text" onChange={props.inputChange} value={props.item.quantity} /> {props.item.unit}
  </div>
    <button type="button" className="btn btn-danger" onClick={props.markRemoved}>Remove</button>
</div>

export default ShoppingListItem
