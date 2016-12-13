import React, { Component } from 'react'

import OrderItemMap from './DriverOrderItemMap'

const ActiveOrderItem = (props) => (
    <div className="list-group-item row">
    <div className="col-xs-12 order-heading">
    <h4 className="list-group-item-heading lead">Delivery To: {props.data.order.shoppingList.cooker.home_address + " " + props.data.order.shoppingList.cooker.home_city + ", " + props.data.order.shoppingList.cooker.home_state + " " + props.data.order.shoppingList.cooker.home_zip}</h4>
    </div>
    <div className="col-xs-12 col-sm-3">
    <h5 className="list-group-item-text">From {props.startTime} to {props.endTime}</h5>
    </div>
    <div className='col-xs-8 col-xs-offset-2 col-sm-offset-0 col-sm-3 list-group-button'>
    <button type="button" className="btn btn-default btn-block" onClick={props.showDetails}>{props.data.detailsShown?'Show Details':'Hide Details'}</button>
    </div>
    <div className='col-xs-8 col-xs-offset-2 col-sm-offset-0 col-sm-3 list-group-button'>
    <button type="button" className={props.data.pickedUp?'btn btn-picked-up btn-block':'btn btn-default btn-block'} onClick={props.pickedUp}>Picked Up</button>
    </div>
    <div className='col-xs-8 col-xs-offset-2 col-sm-offset-0 col-sm-3 list-group-button'>
    <button type="button" className={props.data.delivered?'btn btn-primary btn-block':'btn btn-default btn-block'} onClick={props.delivered}>Delivered</button>
    </div>
    <div className={props.data.totalCostShown?'row':'hidden'}>
    <form className="form-inline col-xs-12 col-sm-7 col-sm-offset-5 total-amount">
      <div className="form-group">
          <label htmlFor="total-amount">Total Amount:</label>
        <div className="input-group text-center">
          <div className="input-group-addon">$</div>
          <input type="text" className="form-control" id="total-amount" defaultValue={props.data.paymentAmount} onChange={props.updatePaymentAmountValue}/>
        </div>
        <button type="button" className="btn btn-default hide-total-amount" onClick={props.submitTotalCost}>Submit</button>
      </div>
    </form>
    </div>
    <div className={props.data.detailsShown?'hidden':'container-fluid'}>
    <div className="row">
        <div className="col-xs-12 well details">
          <div className="col-sm-6">
          <p className="lead">Order ID: {props.orderID}</p>
          <p className="lead">For: {props.data.order.shoppingList.cooker.user.first_name} {props.data.order.shoppingList.cooker.user.last_name} - {props.data.order.shoppingList.cooker.user.phone}</p>
          <p className="lead">Shopping List</p>
          {props.ingredients}
          </div>
          <div className="col-sm-6">
            <p className="lead">Map</p>
            <div id={'map-'+props.orderID} className="map"><OrderItemMap latitude={props.latitude} longitude={props.longitude} orderID={props.orderID} shownFlag={props.data.detailsShown} /></div>

          </div>
        </div>
    </div>
    </div>
    </div>
)

export default ActiveOrderItem
