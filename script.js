function search() {
  var searchQuery = document.getElementById("searchInput").value;

  // For demonstration purposes, let's assume we have a sample response
  var response = [
    { title: "Attack on Titan Season 1", summary: "Summary of Season 1" },
    { title: "Attack on Titan Season 2", summary: "Summary of Season 2" },
    { title: "Attack on Titan Season 3", summary: "Summary of Season 3" },
  ];

  var resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Clear previous results

  // Display the results
  response.forEach(function (item) {
    var resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.innerHTML =
      "<h3>" + item.title + "</h3><p>" + item.summary + "</p>";
    resultsContainer.appendChild(resultItem);
  });

  getData();
}
