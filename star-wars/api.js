const BASE_URL = "https://www.swapi.tech/api/films/"; // SWAPI endpoint for films

// Fetch and filter items dynamically from SWAPI
export function fetchItems(filter = "", asc = true) {
  return fetch(BASE_URL) // Fetch data from SWAPI API
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data from SWAPI");
      }
      return response.json();
    })

    .then((data) => {
        if (!data.result || !Array.isArray(data.result)) {
          throw new Error("Unexpected API response structure");}})

    .then((data) => {
      const items = data.result.map((data) => data.properties.title); // Extract film titles
      return {
        items: filterAndSort(items, filter, asc), // Apply your filter and sorting logic
      };
    });
}

// Filter and sort utility
function filterAndSort(data, title, asc) {
  return data
    .filter((i) => title.length === 0 || i.toLowerCase().includes(title.toLowerCase()))
    .sort(
      asc
        ? (a, b) => (b > a ? -1 : a === b ? 0 : 1)
        : (a, b) => (a > b ? -1 : a === b ? 0 : 1)
    );
}