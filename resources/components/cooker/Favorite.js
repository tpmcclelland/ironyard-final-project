import React from 'react'

const Favorite = (props) => <div className="list-group-item">
  <div className="col-xs-12 favorite-heading">
    <h4 className="list-group-item-heading lead">{props.favorite.recipe.name}</h4>
  </div>
  <div className="row">
    <div className="col-xs-6">
      <img className="img" src={props.favorite.recipe.image} alt="recipe image" />
    </div>
    <div className="col-xs-6 list-group-item-text">
      <p>Servings: {props.favorite.recipe.serving_size}</p>
      <p>Prep Time: {props.favorite.recipe.prep_time}</p>
      <p>Cook Time: {props.favorite.recipe.cook_time}</p>
      <p>Total Time: {props.favorite.recipe.total_time}</p>
      <p>Link to <a href={props.favorite.recipe.instructions} target="_blank">Online Instructions</a></p>
    </div>
  </div>
</div>

export default Favorite
