import {elements} from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
};

const limitRecipeTitle = (title = '', limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results__link" href="#${recipe.uri}">
       <figure class="results__fig">
          <img src="${recipe.image}" alt="${recipe.label}">
       </figure>
       <div class="results_data">
          <h4 class="results__name">${limitRecipeTitle(recipe.label)}</h4>
          <p class="results__author">${recipe.source}</p>
        </div>
    </a>
  </li>
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) =>
  //type = previous or next
  `
      <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? (page -1) : (page + 1)}>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${type === 'prev' ? "left" : "right"}"></use>
          </svg>
          <span>Page ${type === 'prev' ? (page -1) : (page + 1)}</span>
      </button>
  `;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    //Button for next page
    button = createButton(page, 'next')
  }
  else if (page < pages) {
    //Both buttons
    button =
      `
        ${createButton(page, 'prev')};
        ${createButton(page, 'next')}
      `;
  }
  else if (page === pages && page > 1) {
    //Button for previous page
    button = createButton(page, 'prev')

  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  //Render the results of the current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, resPerPage);

};
