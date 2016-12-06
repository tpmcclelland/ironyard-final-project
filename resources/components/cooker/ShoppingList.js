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
      console.log('fetch', response[0].id)
      console.log('fetch', response[0].recipeIngredients)
      this.setState({
        shoppingListId: response[0].id,
        results: response[0].recipeIngredients
      })

    }

    componentWillUnmount() {
        detachSharedState(this)

    }
    // updateShoppingList(update) {
    //     this.setState({
    //         results: update
    //     })
    //     console.log(update)
    // }
    setIngredientList(ingredient) {
        this.setState({
            ingredients: update(this.state.ingredients, {$push: [[ingredient]]})
        })
    }
    removeItem(i) {
        let updatedIngredients = this.state.ingredients

      fetch('/api/v1/shoppinglists/' + this.state.shoppingListId, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          ingredientId: i
        }
      })
        .then(function(response) {
          if(response.ok) {
            return response.json()
          } else {
            throw 'Network response was not ok.'
          }
        })
        .then(this.handleRemoveItem(i))
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

        // const removeItemEvent = this.state.results.map((item, i) => {
        //     return
        // })

      console.log('render', this.state.results)
      console.log('render', this.state.shoppingListId)


        var displayList = this.state.results.map((item, i) => {
            // var splitIngredients = item.ingredients.map((ingredient, i) => {
                // this.setIngredientList(ingredient)
                // console.log(pos)
                console.log(item)
                return <div className="row" key={i} onClick={() => this.removeItem(i)}>
                    <div className="col-xs-8 col-xs-offset-2 listItem" >
                        {/* Quantity: <input type="text" value="1" /> */}
                        <h2>{item.ingredient.name}</h2>
                        <p>{item.quantity}</p>
                        <p>{item.unit}</p>
                        <p>{item.ingredient.unit_cost}</p>
                    </div>
                </div>
            // })
            // return splitIngredients
        })
        // var displayList = this.state.results.map((item, i) => {
        //     var splitIngredients = item.ingredients.map((ingredient, i) => {
        //         // this.setIngredientList(ingredient)
        //         // console.log(pos)
        //         return <div className="row" key={i} onClick={() => this.removeItem(i)}>
        //             <div className="col-xs-8 col-xs-offset-2 listItem" >
        //                 {/* Quantity: <input type="text" value="1" /> */}
        //                 <h2>{ingredient}</h2>
        //             </div>
        //         </div>
        //     })
        //     return splitIngredients
        // })
        return <div className="anchor-top-margin">
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
