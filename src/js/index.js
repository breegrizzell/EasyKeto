// Global app controller
import Search from "./models/Search";
import * as searchView from "./views/searchView"
import {elements} from "./views/base";


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
    
    //search for the recipe
    await state.search.getResults().then().catch(err => alert(err));
    
    //render results on ui
    console.log(state.search.result)
  }
};

//Event Handler
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch().then();
});



