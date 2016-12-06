import React, { Component } from 'react'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { sharedState, attachSharedState, detachSharedState } from 'react-helpers/dist/sharedState'
import update from 'react-addons-update';

class ShoppingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            title: '',
            ingredients: [],
            shoppingListId: ''
        }
        // this.state = sharedState()
        this.removeItem = this.removeItem.bind(this)
        // this.updateShoppingList = this.updateShoppingList.bind(this)
        this.setIngredientList = this.setIngredientList.bind(this)
        this.handleInitialFetch = this.handleInitialFetch.bind(this)
    }

    componentWillMount() {

    }
    componentDidMount() {
        attachSharedState(this)

      var user = JSON.parse(sessionStorage.getItem('user'))

      fetch('/api/v1/shoppinglists?id=' + user.id, {
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
      console.log('fetch', response)
      console.log('fetch', response[0].recipeIngredients)
      this.setState({
        shoppingListId: response[0].id,
        results: response[0].recipeIngredients
      })

    }

    componentWillUnmount() {
        detachSharedState(this)

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
        .then(response => this.handleRemoveItem())
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })
    }

    handleRemoveItem() {

      this.setState({
        results: update(this.state.results, {$splice: [[i, 1]]})
      })

    }

    render() {


      console.log('render', this.state.results)
      console.log('render', this.state.shoppingListId)


        var displayList = this.state.results.map((item, i) => {
                return <div className="row" key={i} onClick={() => this.removeItem(item)}>
                    <div className="col-xs-12 listItem" >
                      <div className="row form-group">
                        <h4 className="col-xs-1">qty:
                          {
                            (item.quantity !== null)
                            ? item.quantity
                            : "1"
                          }
                          </h4>
                        {
                          (item.unit !== null)
                            ? <div>
                                <h4 className="col-xs-2">{item.unit}</h4>
                                <h4 className="col-xs-8">{item.ingredient.name}</h4>
                                <h4 className="col-xs-1">{item.unit_cost}</h4>
                              </div>
                            :
                            <div>
                              <h4 className="col-xs-10">{item.ingredient.name}</h4>
                              <h4 className="col-xs-1">{item.unit_cost}</h4>
                            </div>
                        }
                      </div>
                    </div>
                </div>
        })

        return <div className="anchor-top-margin well col-xs-6 col-xs-offset-3">
          <h2>Ingredient List</h2>
            {displayList}
            <div className="row col-xs-offset-3">
            <button className="col-xs-4" onClick={() => window.print()}>Print List</button>
            <form className="col-xs-4" action="#schedule">
                <button className="col-xs-12"type="submit">Schedule Delivery</button>
            </form>
            {/* <button className="col-xs-4" href="#schedule">Schedule Delivery</button> */}
            </div>
        </div>
    }
}

export default ShoppingList
