import Fuse from "fuse.js";
const resultsContainer = document.getElementById("results");
const searchBtn = document.getElementById("search");
let searchResult = [];

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchResult = [];
  search();
});
async function search(page = 1) {
  const searchQuery = document
    .getElementById("searchInput")
    .value?.toLowerCase();
  console.log(searchQuery);
  const generalResponse = await fetch(
    `https://api.attackontitanapi.com/characters?page=${page}`
  );
  const generalData = await generalResponse.json();
  console.log(generalData);
  const results = generalData.results;
  console.log(results);

  // Clear previous results
  resultsContainer.innerHTML = "";

  // Create a new Fuse instance with your dataset and desired options
  const fuse = new Fuse(results, {
    keys: ["name"], // Specify the keys to search in
    threshold: 0.2, // Adjust the threshold value to control the fuzziness
  });

  const result = fuse.search(searchQuery);

  for (let item of result) {
    searchResult.push(item);
  }
  console.log(searchResult);
  if (generalData.info.next_page) {
    search(page + 1);
  }

  if (searchResult.length == 0 && generalData.next_page == null) {
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.innerHTML = "<h3>no results found</h3>";
    resultsContainer.appendChild(resultItem);
  } else {
    searchResult.forEach(function (item) {
      let resultItem = document.createElement("div");
      resultItem.classList.add("result-item");
      resultItem.innerHTML = "<h3>" + item.item.name + "</h3>";
      resultsContainer.appendChild(resultItem);
    });
  }
}
