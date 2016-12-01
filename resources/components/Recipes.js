import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classAutoBind from 'react-helpers/dist/classAutoBind'
import { sharedState, attachSharedState, detachSharedState } from 'react-helpers/dist/sharedState'
import Modal from 'react-modal'

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    zIndex            : '2',
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxHeight             : '500px'
  }
};

class Recipes extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)
        this.state = sharedState()
    }
    componentWillMount() {
      attachSharedState(this)
      sharedState({
        modalIsOpen: false,
        recipes: [],
        recipeDetails: {},
        ingredients: []
      })
    }
    componentDidMount() {
        fetch("https://api.yummly.com/v1/api/recipes?_app_id=26b04d4b&_app_key=66ccdcd976be7cf99c9555fafc92d7f6")
            .then(response => response.json())
            .then(this.updateRecipeDisplay)
    }
    componentWillUnmount() {
        console.log(this.state.searchTerm)
        detachSharedState(this)
    }
    updateRecipeDisplay(response) {
      sharedState({
        recipes: response.matches
      })
    }
    openModal(recipe) {
      sharedState({
        modalIsOpen: true,
      })
      fetch("https://api.yummly.com/v1/api/recipe/" + recipe + "?_app_id=26b04d4b&_app_key=66ccdcd976be7cf99c9555fafc92d7f6")
          .then(response => response.json())
          .then(this.updateRecipeDetails)
    }
    updateRecipeDetails(response) {
      sharedState({
        recipeDetails: response,
        ingredients: response.ingredientLines,
        recipeImage: response.images[0].imageUrlsBySize["360"],
        recipeDirections: response.source.sourceRecipeUrl,
        recipeOwner: response.source.sourceDisplayName,
      })
    }
    searchEnter(e) {
      if (e.keycode === 13) {
        this.search()
      } else {
        sharedState({
          searchTerm: e.target.value
        })
      }
    }
    search() {
      var searchValue = this.state.searchTerm
      console.log(this.state.searchTerm)
      // fetch("https://api.yummly.com/v1/api/recipes?_app_id=26b04d4b&_app_key=66ccdcd976be7cf99c9555fafc92d7f6&q=" + encodeURIComponent(searchValue))
      //     .then(response => response.json())
      //     .then(this.updateRecipeDisplay)
    }
    closeModal() {
      sharedState({
        modalIsOpen: false,
      })
      console.log(this.state.searchTerm)
    }

    render() {
      var recipes = this.state.recipes.map((recipe, i) => {
        return <div className="col-xs-6 col-sm-4 bring-to-front" key={i}>
          <div className="recipe-panel" onClick={() => this.openModal(recipe.id)}>
              <h3 className="recipe-title lead">{recipe.recipeName}</h3>
              <img src={recipe.imageUrlsBySize["90"]}/>
          </div>
        </div>
      })
      var ingredients = this.state.ingredients.map((ingredient, i) => {
        return <li key={i}>{ingredient}</li>
      })
        return <div className="container-fluid">
        <div className="row">
            <div className="col-sm-9 col-xs-6">
                <h1>Recipes</h1>
            </div>
            <div className="col-sm-3 col-xs-6 search-bar">
                <form className="navbar-form navbar-left">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" onChange={this.searchEnter} />
                    </div>
                    <button className="btn btn-default search-button" onClick={this.search}>Search</button>
                </form>
            </div>
        </div>
        <div className="row">
          {recipes}
        </div>

        {/* Being Modal */}
        <div className="container">
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Recipe Modal"
          >
          <div className="row">
            <div className="col-xs-10">
              <h2>{this.state.recipeDetails.name}</h2>
            </div>
            <div className="col-xs-2 text-right">
              <button className="btn btn-default" onClick={this.closeModal}>X</button>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <p>Servings: {this.state.recipeDetails.numberOfServings}</p>
                  <p>Prep Time: {this.state.recipeDetails.prepTime}</p>
                  <p>Cook Time: {this.state.recipeDetails.cookTime}</p>
                  <p>Total Time: {this.state.recipeDetails.totalTime}</p>
                </div>
                <div className="col-sm-6">
                  <button className="btn btn-default btn-danger btn-block">Favorite</button>
                  <button className="btn btn-default btn-success btn-block">Add to List</button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h3>Ingredients</h3>
                  <ul>
                    {ingredients}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <img className="modal-image" src={this.state.recipeImage}/>
              <p className="small text-right">From: {this.state.recipeOwner}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h3>Directions</h3>
              {/* <iframe width="100%" height="350px" src={this.state.recipeDirections}>
              <p>Your browser does not support iframes view directions <a href={this.state.recipeDirections}></a>.</p>
              </iframe> */}
            </div>
          </div>

          </Modal>
        </div>

        {/* End Modal */}

        </div>

    }
}

export default Recipes
