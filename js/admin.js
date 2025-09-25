const formElem = document.querySelector("#movieForm");
const statusElem = document.querySelector(".status");

formElem.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movie = {
    name: document.querySelector(".movie-form #name").value,
    releaseDate: document.querySelector(".movie-form #releaseDate").value,
    bannerImage: document.querySelector(".movie-form #bannerImage").value,
    cardImage: document.querySelector(".movie-form #cardImage").value,
    rating: +document.querySelector(".movie-form #rating").value,
    description: document.querySelector(".movie-form #description").value,
    genres: document
      .querySelector(".movie-form #genres")
      .value.split(",")
      .map((str) => str.trim("")),
  };

  try {
    const response = await fetch("https://68c7b9ad5d8d9f514732c30b.mockapi.io/api/v1/movie", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) throw new Error(response.statusText);
    statusElem.innerHTML = "Фильм успешно добавился";
    statusElem.classList.add("status");
    statusElem.classList.add("success");
  } catch (err) {
    console.error(err);
    statusElem.innerHTML = "Ошибка";
    statusElem.classList.add("status");
    statusElem.classList.add("error");
  }
});
