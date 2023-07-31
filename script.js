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

  if (searchResult.length == 0 && generalData.info.next_page == null) {
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.innerHTML = "<h3>no results found</h3>";
    resultsContainer.appendChild(resultItem);
  } else {
    searchResult.forEach(function (value) {
      let alias =
        value.item.alias.length > 0
          ? `<b>Alias: </b> ${value.item.alias[0]}`
          : "";
      // let resultItem = document.createElement("div");
      // resultItem.classList.add("result-item");
      // resultItem.innerHTML = "<h3>" + item.item.name + "</h3>";
      // resultsContainer.appendChild(resultItem);
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
      </div>
    </div>`;
      resultsContainer.insertAdjacentHTML("beforeend", results);
      // let resultContainer = document.createElement("div");
      // resultContainer.classList.add("result");
      // let charImg = document.createElement("img");
      // charImg.src = "assets/tempLogo.jpg";
      // charImg.alt = "Character Image";
      // let dataContainer = document.createElement("div");
      // dataContainer.classList.add("data");
      // let namesContainer = document.createElement("div");
      // namesContainer.classList.add("names");
    });
  }
}
