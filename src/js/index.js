// Global app controller
import Search from "./models/Search";
import * as searchView from "./views/searchView"
import {clearLoader, elements, renderLoader} from "./views/base";


/* Global State of the App
*  - search object
*  - current recipe
*  - shopping list
*  - liked recipes
 */
const state = {};

//Functions:
const controlSearch = async () => {
  //Pull in input
  const query = searchView.getInput();
  console.log(query);
  
  if (query) {
    //New Search object, add to state
    state.search = new Search(query);
    
    // prepare the ui for the next step
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    
    //search for the recipe
    await state.search.getResults().then().catch(err => alert(err));
    
    //render results on ui
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

//Event Handler
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch().then();
});

elements.searchResPages.addEventListener(`click`, event => {
  const element = event.target;
  const btn = element.closest(`.btn-inline`);
  console.log(btn);
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.renderResults(state.search.result, goToPage);
    console.log(goToPage);
  
  }
});



