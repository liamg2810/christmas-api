import { SEARCH_API_KEY } from "./config.js";

const SEARCH_API_ENDPOINT = "https://www.searchapi.io/api/v1/search";

export function SearchForPresent(query) {
    return fetch(`${SEARCH_API_ENDPOINT}?q=${query}&api_key=${SEARCH_API_KEY}&gl=uk&location=London&engine=google_shopping`)
    .then(response => response.json())
    .then(data => {
        return data.shopping_results;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}