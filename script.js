import Fuse from "fuse.js";
const resultsContainer = document.getElementById("results");
const searchBtn = document.getElementById("search");
let searchResult = [];

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  searchResult = [];
  // Clear previous results
  resultsContainer.innerHTML = "";
  search();
});
async function search(page = 1) {
  try {
    const searchQuery = document
      .getElementById("searchInput")
      .value?.trim()
      .toLowerCase();
    const generalResponse = await fetch(
      `https://api.attackontitanapi.com/characters?page=${page}`
    );
    const generalData = await generalResponse.json();
    const results = generalData.results;
    // Create a new Fuse instance with your dataset and desired options
    const fuse = new Fuse(results, {
      keys: ["name"], // Specify the keys to search in
      threshold: 0.2, // Adjust the threshold value to control the fuzziness
    });

    const result = fuse.search(searchQuery);

    for (let item of result) {
      searchResult.push(item);
    }
    if (generalData.info.next_page) {
      search(page + 1);
    }

    if (generalData.info.next_page == null) {
      if (searchResult.length == 0) {
        let resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = "<h3>no Characters found</h3>";
        resultsContainer.appendChild(resultItem);
      } else {
        displayResults(searchResult);
      }
    }
  } catch (error) {
    console.log("An error occurred", error);
  }
}
const displayResults = function (searchResult) {
  searchResult.forEach(function (value) {
    let alias =
      value.item.alias.length > 0
        ? `<b>Alias: </b> ${value.item.alias[0]}`
        : "";
    let group =
      value.item.groups.length > 0
        ? value.item.groups[0].name
        : "no allegiances";

    let results = `<div class="result">
  <img src="assets/tempLogo.jpg" alt="character image" />

  <div class="data">
   
      <div class="name">${value.item.name}</div>
      <div class="alias">${alias}</div>
    
    <div class="status"><b>Status: </b> ${value.item.status}</div>
    <div class="ageSex">
      <div class="age"><b>Age: </b>${value.item?.age}</div>
      <div class="sex"><b>Sex: </b>${value.item?.gender}</div>
    </div>
    <div class="residence"><b>Residence: </b>${value.item?.residence}</div>
    <div class="group"><b>Allegiance: </b>${group}</div>
  </div>
</div>`;
    resultsContainer.insertAdjacentHTML("beforeend", results);
  });
};
