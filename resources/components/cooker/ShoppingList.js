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
            results: [],
            title: '',
            ingredients: [],
            shoppingListId: '',
            recipeIngredients: [],
            quantity: 0
        }
      classAutoBind(this)
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.fetchIngredients()

    }

    componentWillReceiveProps(nextProps) {
      this.fetchIngredients()
    }

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
      // console.log('tom fetch', response)
      this.setState({
        shoppingListId: response[0].id,
        recipeIngredients: response[0].recipeIngredients
      })

    }

    componentWillUnmount() {

    }

    setIngredientList(ingredient) {
        this.setState({
            ingredients: update(this.state.ingredients, {$push: [[ingredient]]})
        })
    }
    removeItem(item) {

      fetch('/api/v1/shoppinglistIngredient?shopping_list_id=' + item.shopping_list_id + '&ingredient_recipe_id=' + item.id, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => fetch('/api/v1/shoppinglistIngredient/' + response[0].id, {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        )

        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })
    }


    markRemoved(i) {
      var items = this.state.recipeIngredients

      this.removeItem(items[i])

      items.splice(i, 1)

      this.setState({
        recipeIngredients: items
      })

    }

    changeQuantity(i, quantity) {
      var items = this.state.recipeIngredients

      items[i].quantity = quantity

      this.setState({
        recipeIngredients: items
      })

    }

    schedule() {
      browserHistory.push('/cooker/schedule')
    }

    render() {
      console.log(this.state.recipeIngredients)

      var ShoppingListItems = this.state.recipeIngredients.map((ingredient, i) =>{
        return <ShoppingListItem item={ingredient} changeQuantity={(quantity) => this.changeQuantity(i, quantity)} key={i} markRemoved={() => this.markRemoved(i)}/>
      })

        return <div id="shopping" className="anchor-top-margin well col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h2>2. View your Shopping List</h2>
          <p>Make any changes necessary to the quantities or remove items before completing your order.</p>
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
