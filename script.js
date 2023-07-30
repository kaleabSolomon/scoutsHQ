const resultsContainer = document.getElementById("results");

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
  const resultItem = document.createElement("div");
  resultItem.classList.add("result-item");
  let resultFound = false;
  for (value of results) {
    if (searchQuery == value.name.toLowerCase()) {
      console.log(value.name.toLowerCase());
      resultItem.innerHTML = `<p>${value.name}</p>`;
      resultsContainer.appendChild(resultItem);
      resultFound = true;
      break;
    }
  }
  if (resultFound == false) {
    if (generalData.info.next_page) {
      search(page + 1);
    } else {
      resultItem.innerHTML = `<p>No characters found</p>`;
      resultsContainer.appendChild(resultItem);
    }
  }
  // // Display the results
}
