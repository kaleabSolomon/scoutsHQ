import Fuse from "fuse.js";
const resultsContainer = document.getElementById("results");
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
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
  console.log("not ftec");
  const generalData = await generalResponse.json();
  console.log(generalData);
  const results = generalData.results;
  console.log(results);

  // Clear previous results
  resultsContainer.innerHTML = "";
  const resultItem = document.createElement("div");
  resultItem.classList.add("result-item");

  // Create a new Fuse instance with your dataset and desired options
  const fuse = new Fuse(results, {
    keys: ["name"], // Specify the keys to search in
    threshold: 0.6, // Adjust the threshold value to control the fuzziness
  });

  const result = fuse.search(searchQuery);
  console.log(result);

  // let resultFound = false;
  // for (let value of results) {
  //   if (searchQuery == value.name.toLowerCase()) {
  //     console.log(value.name.toLowerCase());
  //     resultItem.innerHTML = `<p>${value.name}</p>`;
  //     resultsContainer.appendChild(resultItem);
  //     resultFound = true;
  //     break;
  //   }
  // }
  // if (resultFound == false) {
  //   if (generalData.info.next_page) {
  //     search(page + 1);
  //   } else {
  //     resultItem.innerHTML = `<p>No characters found</p>`;
  //     resultsContainer.appendChild(resultItem);
  //   }
  // }
  // // Display the results
}
