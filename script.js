const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);
  resultsArray.forEach((result) => {
    // CARD CONTAINER
    const card = document.createElement("div");
    card.classList.add("card");
    // LINK
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    // IMAGE
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // CARD BODY
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // CARD TITLE
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // SAVE TEXT
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add To Favorites";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    // CARD TEXT
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // FOOTER CONTAINER
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // DATE
    const date = document.createElement("strong");
    date.textContent = result.date;
    // COPYRIGHT
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;
    // APPEND
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  // GET FAVORITES FROM localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  createDOMNodes(page);
}

// GET 10 IMAGES FROM NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM("favorites");
  } catch (error) {
    // CATCH ERROR HERE
  }
}

// ADD RESULT TO FAVORITES
function saveFavorite(itemUrl) {
  // LOOP THROUGH RESULTS ARRAY TO SELECT FAVORITE
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // SHOW SAVE CONFIRMATION FOR 2 SECONDS
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // SET FAVORITES IN localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

// ON LOAD
getNasaPictures();
