import React, { Component } from 'react'
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
    left                  : '48%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxHeight             : '500px',
    maxWidth              : '95%',
  }
};

class Recipes extends Component {
    constructor(props) {
        super(props)
        classAutoBind(this)

        var resultSize = this.props.resultSize || 20

        this.state = {
          modalIsOpen: false,
          recipes: [],
          recipeDetails: {},
          ingredients: [],
          searchTerm: '',
          resultSize: resultSize,
          api_id: '',
          name: '',
          serving_size: 0,
          instructions: '',
          prep_time: '',
          total_time: '',
          cook_time: '',
          image: '',
          api_data: '',
          displayAlertPanel: false,
          displayFavorited: false,
          favorited: false,
          added: false
        }
    }
    componentDidMount() {
        this.fetchRecipes()
    }
    fetchRecipes() {
        if (!window.cachedRecipes || this.state.searchTerm !== window.cachedSearchTerm) {
            fetch("http://api.yummly.com/v1/api/recipes?_app_id=26b04d4b&_app_key=66ccdcd976be7cf99c9555fafc92d7f6&maxResult=" + this.state.resultSize + "&q=" + encodeURIComponent(this.state.searchTerm))
                .then(response => response.json())
                .then(this.updateRecipeDisplay)
        } else {
            this.updateRecipeDisplay({
                matches: window.cachedRecipes
            })
        }
    }
    updateRecipeDisplay(response) {
        window.cachedRecipes = response.matches
        window.cachedSearchTerm = this.state.searchTerm
      this.setState({
        recipes: response.matches
      })
    }
    openModal(recipe) {
      this.setState({
        modalIsOpen: true,
      })
      fetch("http://api.yummly.com/v1/api/recipe/" + recipe + "?_app_id=26b04d4b&_app_key=66ccdcd976be7cf99c9555fafc92d7f6")
          .then(response => response.json())
          .then(this.updateRecipeDetails)
    }
    updateRecipeDetails(response) {
      this.setState({
        recipeDetails: response,
        ingredients: response.ingredientLines,
        recipeImage: response.images[0].imageUrlsBySize["360"],
        recipeDirections: response.source.sourceRecipeUrl,
        recipeOwner: response.source.sourceDisplayName,
        api_id: response.id,
        name: response.name,
        serving_size: response.numberOfServings,
        prep_time: response.prepTime,
        total_time: response.totalTime,
        cook_time: response.cookTime,
        api_data: response
      })
    }
    search(e) {
      e.preventDefault()
      this.fetchRecipes()
      this.setState({
          searchTerm: ''
      })
    }
    updateSearchTerm(e) {
        this.setState({
          searchTerm: e.target.value
        })
    }
    saveRecipe(type) {
      fetch('/api/v1/recipes', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          type: type,
          api_id: this.state.api_id,
          name: this.state.name,
          serving_size: this.state.serving_size,
          instructions: this.state.recipeDirections,
          prep_time: this.state.prep_time,
          total_time: this.state.total_time,
          cook_time: this.state.cook_time,
          image: this.state.recipeImage,
          recipe_ingredients: this.state.ingredients,
          api_data: this.state.api_data
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        if(response.ok) {
          console.log(response)
        } else {
          throw 'Network response was not ok.'
        }
      })
    }
    favorite() {
      this.saveRecipe('favorite')
      this.setState({
        displayAlertPanel: true,
        displayFavorited: true,
        favorited: true
      })
      this.hideAlertPanel()
    }
    addToList() {
      this.saveRecipe('add')
      this.setState({
        displayAlertPanel: true,
        displayFavorited: false,
        added: true
      })
      this.hideAlertPanel()
    }
    hideAlertPanel() {
      var alert = setTimeout(() => {this.setState({displayAlertPanel: false})}, 1000)
    }
    changeFocus(ref) {
      switch (ref) {
        case 'search':
          var target = this.refs.search
          break;
        case 'favorite':
          var target = this.refs.favorite
          break;
        case 'add':
          var target = this.refs.add
          break;
      }
      var change = setTimeout(() => target.blur(), 1000)
    }
    closeModal() {
      this.setState({
        modalIsOpen: false,
        favorited: false,
        added: false
      })
    }

    render() {
      var recipes = this.state.recipes.map((recipe, i) => {
        return <div className="col-xs-6 col-sm-3 bring-to-front" key={i}>
          <div className="recipe-panel" onClick={() => this.openModal(recipe.id)}>
              <h3 className="recipe-title lead">{recipe.recipeName}</h3>
              <img src={recipe.imageUrlsBySize["90"]}/>
          </div>
        </div>
      })
      var ingredients = this.state.ingredients.map((ingredient, i) => {
        return <li key={i}>{ingredient}</li>
      })
        return <div id="recipes" className="container">
        <div id="recipe-anchor" className="row anchor">
            <div className="col-sm-4 col-sm-push-8 col-xs-12 search-bar">
                <form className="navbar-form navbar-left" onSubmit={this.search}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" value={this.state.searchTerm} onChange={this.updateSearchTerm} />
                    </div>
                    <button type="button" className="btn btn-default search-button" onClick={this.search} onFocus={() => this.changeFocus('search')} ref='search'>Search</button>
                </form>
            </div>
            <div className="col-sm-8 col-sm-pull-4 col-xs-12">
                <h1>Recipes</h1>
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
            <div className="col-sm-6 col-sm-push-6">
              <img className="modal-image" src={this.state.recipeImage}/>
              <p className="small text-right">From: {this.state.recipeOwner}</p>
            </div>
            <div className="col-sm-6 col-sm-pull-6">
              <div className="row">
                <div className="col-xs-6">
                  <p>Servings: {this.state.recipeDetails.numberOfServings}</p>
                  <p>Prep Time: {this.state.recipeDetails.prepTime}</p>
                  <p>Cook Time: {this.state.recipeDetails.cookTime}</p>
                  <p>Total Time: {this.state.recipeDetails.totalTime}</p>
                </div>
                <div className="col-xs-6">
                  <button className={this.state.favorited?'btn btn-default btn-block favorite-button-clicked ':'btn btn-default btn-block favorite-button'} onClick={this.favorite} ref='favorite' onFocus={() => this.changeFocus('favorite')}>{this.state.favorited?'Favorited':'Favorite'}</button>
                  <button className={this.state.added?'btn btn-default btn-block add-button-clicked':'btn btn-default btn-block add-button'} onClick={this.addToList} ref="add" onFocus={() => this.changeFocus('add')}>{this.state.favorited?'Added to List':'Add to List'}</button>
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

          </div>
          <div className="row">
            <div className="col-xs-12">
              {/* <h3>Directions</h3> */}
              {/* <iframe width="100%" height="350px" src={this.state.recipeDirections}>
              <p>Your browser does not support iframes view directions <a href={this.state.recipeDirections}></a>.</p>
              </iframe> */}
            </div>
          </div>
          <div className={this.state.displayAlertPanel?'panel panel-default alert':'alert-hidden'}>
            <div className="panel-body">
              <h3 className="lead">{this.state.displayFavorited?'Added to your favorites':'Added to your shopping list'}</h3>
            </div>
          </div>
          </Modal>
        </div>
        {/* End Modal */}

        </div>
    }
}

export default Recipes
