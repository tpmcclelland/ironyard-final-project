import React from 'react'

const ShoppingListItem = (props) => <div className="list-group-item">
    <div className="row">
    <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="quantity"/>
      <div className="col-xs-6">
              <input name="quantity" type="text" className="form-control" value={props.item.quantity || ''} onChange={(e) => props.changeQuantity(e.target.value)} />
      </div>
      <div className="col-xs-6">
        <h5>{props.item.unit}</h5>
      </div>
    </div>
    </div>
    <div className="col-xs-7">
          <h4>{props.item.recipeIngredient.ingredient.name}</h4>
    </div>
    <div className="col-sm-2">
    <button type="button" className="btn btn-block btn-danger remove-btn" onClick={props.markRemoved}>Remove</button>
    </div>
    </div>

  </div>

export default ShoppingListItem
