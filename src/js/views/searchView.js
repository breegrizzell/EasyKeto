import {elements} from "./base";

export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results__link" href="#${recipe.uri}">
       <figure class="results__fig">
          <img src="${recipe.image}" alt="${recipe.label}">
       </figure>
       <div class="results_data">
          <h4 class="results__name">${recipe.label}</h4>
          <p class="results__author">${recipe.source}</p>
        </div>
    </a>
  </li>
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};