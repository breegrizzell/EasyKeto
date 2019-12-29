import axios from 'axios'
import {renderResults} from "../views/searchView";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(){
    const res =  await axios("https://edamam-recipe-search.p.rapidapi.com/search?q=" + this.query +"&diet=low-carb", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
        "x-rapidapi-key": "a5dff7fa6fmshd3591d3f74f18a7p1b0561jsn56ae4a435647"
      }
    });
    this.results = res.data.hits;
    console.log(this.results);
    renderResults(this.results.map(r => r.recipe));
  }
}
