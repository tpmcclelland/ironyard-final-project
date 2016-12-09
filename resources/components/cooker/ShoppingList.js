import React, { Component } from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import update from 'react-addons-update';
import ShoppingListItem from './ShoppingListItem'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import store from '../redux/_ReduxStore'

class ShoppingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeIngredients: []
        }
      classAutoBind(this)
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.fetchIngredients()

    }

    // componentWillReceiveProps(nextProps) {
    //   this.fetchIngredients()
    // }

    fetchIngredients() {
      var user = JSON.parse(sessionStorage.getItem('user'))

      fetch('/api/v1/shoppinglists?id=' + user.user.id, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(this.handleInitialFetch)
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })

    }

    handleInitialFetch(response) {
      console.log('tom fetch', response)
      this.setState({
        recipeIngredients: response[0].shoppingListIngredients
      })

    }

    componentWillUnmount() {

    }


    markRemoved(i) {
      var items = this.state.recipeIngredients

      fetch('/api/v1/shoppinglistIngredient/' + items[i].id, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(response => {
          items.splice(i, 1)

          this.setState({
            recipeIngredients: items
          })
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })

    }

    changeQuantity(i, quantity) {
      var items = this.state.recipeIngredients


      fetch('/api/v1/shoppinglistIngredient/' + items[0].id, {
          method: 'PATCH',
          credentials: 'same-origin',
          body: JSON.stringify({
            quantity: quantity
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(function(response) {
            if(response.ok) {
              return response.json()
            } else {
              throw 'Network response was not ok.'
            }
          })
          .then(response => {
            items[i].quantity = quantity

            this.setState({
              recipeIngredients: items
            })
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
          })
    }

    clearList() {

      this.setState({
        recipeIngredients: []
      })

    }

    schedule() {
      browserHistory.push('/cooker/schedule')
    }

    render() {


      var ShoppingListItems = this.state.recipeIngredients.map((ingredient, i) =>{
        return <ShoppingListItem item={ingredient} changeQuantity={(quantity) => this.changeQuantity(i, quantity)} key={i} markRemoved={() => this.markRemoved(i)}/>
      })

        return <div className="shopping col-xs-12">
          <h1 className="heading">2. View your Shopping List</h1>
          <p>Make any changes necessary to the quantities or remove items before completing your order.</p>
          {/*<button type="button" className="btn btn-default btn-danger" onClick={this.clearList}>Remove All</button>*/}
          <ul className="list-group">
            {ShoppingListItems}
          </ul>

            <button type="button" className="btn btn-block btn-default" onClick={() => window.print()}>Print List</button>
            <button type="button" className="btn btn-block btn-default" onClick={this.schedule}>Schedule</button>
        </div>
    }
}

const mapStateToProps = function(store) {
  return {
    refreshShoppingList: store.sharedRecipe.refreshShoppingList

  }
}

export default connect(mapStateToProps)(ShoppingList)
