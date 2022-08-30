// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// GET 10 IMAGES FROM NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
  } catch (error) {
    // CATCH ERROR HERE
  }
}

// ON LOAD
getNasaPictures();
