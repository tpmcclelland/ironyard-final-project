'use strict'

const Schema = use('Schema')

class OrdersTableSchema extends Schema {

  up () {
    this.create('orders', (table) => {
    table.increments()
      table.float('total_cost')
      table.datetime('delivery_start_time')
      table.datetime('delivery_end_time')
      table.boolean('payment_received')
      table.boolean('driver_paid')

      table.integer('driver_id').references('id').inTable('drivers')
      table.integer('store_id').references('id').inTable('stores')
      table.integer('state_id').references('id').inTable('states')

      table.index('driver_id')
      table.index('store_id')
      table.index('state_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }

}

module.exports = OrdersTableSchema
