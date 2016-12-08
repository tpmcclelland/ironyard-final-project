import React, { Component } from 'react'

const AvailableOrderItem = (props) => (
    <div className="list-group-item row">
    <div className="col-xs-12 order-heading">
    <h3 className="list-group-item-heading">Delivery To: {props.data.order.shoppingList.cooker.home_address + " " + props.data.order.shoppingList.cooker.home_city + ", " + props.data.order.shoppingList.cooker.home_state + " " + props.data.order.shoppingList.cooker.home_zip}</h3>
    <h1>{props.message}</h1>
    </div>
    <div className="col-xs-12 col-sm-3">
    <h4 className="list-group-item-text">From {props.startTime} to {props.endTime}</h4>
    </div>
    <div className="col-xs-12 col-sm-3">
    {/* <h4 className="list-group-item-text">{props.data.order.store.name}</h4> */}
    </div>
    <div className='col-xs-8 col-xs-offset-2 col-sm-offset-0 col-sm-3 list-group-button'>
    <button type="button" className="btn btn-default btn-block" onClick={props.showDetails}>{props.data.detailsShown?'Hide Details':'Show Details'}</button>
    </div>
    <div className='col-xs-8 col-xs-offset-2 col-sm-offset-0 col-sm-3 list-group-button'>
    <button type="button" className={props.data.accepted?'btn btn-block btn-primary':'btn btn-default btn-block'} onClick={props.accepted}>Accept</button>
    </div>
    <div className={props.data.totalCostShown?'row':'hidden'}>
    <form className="form-inline col-xs-12 col-sm-7 col-sm-offset-5 total-amount">
      <div className="form-group">
          <label htmlFor="total-amount">Total Amount:</label>
        <div className="input-group text-center">
          <div className="input-group-addon">$</div>
          <input type="text" className="form-control" id="total-amount" />
        </div>
        <button type="button" className="btn btn-default hide-total-amount" onClick={props.showTotalCost}>Close</button>
      </div>
    </form>
    </div>
    <div className={props.data.detailsShown?'container-fluid':'hidden'}>
    <div className="row">
        <div className="col-xs-12 well details">
          <div className="col-sm-6">
          <p className="lead">{props.data.order.shoppingList.cooker.user.first_name} {props.data.order.shoppingList.cooker.user.last_name} - {props.data.order.shoppingList.cooker.user.phone}</p>
          <p className="lead">Shopping List</p>
          {props.ingredients}
          </div>
          <div className="col-sm-6">
            <p className="lead">Map</p>
            <div className="map"></div>
          </div>
        </div>
    </div>
    </div>
    </div>
)

export default AvailableOrderItem
