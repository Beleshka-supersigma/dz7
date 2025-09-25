const setMovies = (movies) => {
  moviesWrapperElem.innerHTML = "";

  movies.forEach((movie, i) => {
    moviesWrapperElem.innerHTML += `
          <a href="movie.html?id=${movie.id}" id="movie${i}" class="movie">
            <div style="background-image: url(${
              movie.cardImage
            })" class="movie__image">
              <div class="rating">${movie.rating}</div>
            </div>
            <div class="movie__info">
              <h3>${movie.name}</h3>
              <div class="stars">
                ${Array.from({ length: movie.rating })
                  .map(() => `<img src="icons/star.png" alt="star" />`)
                  .join("")}
                    ${Array.from({ length: 5 - movie.rating })
                      .map(
                        () => `<img src="icons/star-empty.png" alt="star" />`
                      )
                      .join("")}
              </div>
              <p>
               ${movie.description}
              </p>
              <div class="movie__item">
                <span class="movie__item-title">Дата выхода:</span>
                <span>${movie.releaseDate}</span>
              </div>
              <div class="movie__item">
                <span class="movie__item-title">Жанр:</span>
                <span>${movie.genres.join(", ")}</span>
              </div>
            </div>
          </a>`;
  });
};

let params = {
  sortBy: "",
  order: "",
  search: "",
};

const getMovies = async () => {
  try {
    const response = await fetch(
      `https://68d1197ce6c0cbeb39a38712.mockapi.io/movie?${new URLSearchParams(params)}`
    );
    const data = await response.json();
    setMovies(data || []);
  } catch (err) {
    console.error(err);
    setMovies([]);
  }
};
getMovies();

const sortWrapperElem = document.querySelector(".sort");
sortWrapperElem.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "sort-newest":
      params.sortBy = "releaseDate";
      params.order = "desc";
      break;
    case "sort-oldest":
      params.sortBy = "releaseDate";
      params.order = "asc";
      break;
    case "sort-rating":
      params.sortBy = "rating";
      params.order = "desc";
      break;
    case "sort-name":
      params.sortBy = "name";
      params.order = "asc";
      break;
  }
  getMovies();
});

let searchTimeout;
document
  .querySelector(".search")
  .addEventListener("input", ({ target: { value } }) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      params.search = value;
      getMovies();
    }, 1000);
  });
