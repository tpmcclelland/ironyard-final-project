import React from 'react'

const OrderStatusDetail = (props) => (
    <div>
        <h1 className="lead">{props.data.order.state}</h1>
    </div>
)
