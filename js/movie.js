const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const setMovie = (movie) => {
  document.querySelector("#title").innerHTML = movie.name;
  document.querySelector("#releaseDate").innerHTML = movie.releaseDate;
  document.querySelector("#genreList").innerHTML = movie.genres.join(" | ");
  document.querySelector(
    "#ratingBadge"
  ).innerHTML = `Рейтинг: ${movie.rating}/5`;
  document.querySelector("#stars").innerHTML = Array.from({
    length: movie.rating,
  })
    .map(() => "★")
    .join("");
  document.querySelector("#starsCount").innerHTML = movie.rating + ".0";
  document.querySelector("#description").innerHTML = movie.description;
  document.querySelector("#cardImage").src = movie.cardImage;
  document.querySelector(
    "#hero"
  ).style.backgroundImage = `url(${movie.bannerImage})`;

  document.querySelector(".form-card #infoRelease").innerHTML =
    movie.releaseDate;
  document.querySelector(".form-card #infoGenres").innerHTML =
    movie.genres.join(" | ");
};

const array = ["word1", "word2", "word3"];

const getMovie = async () => {
  try {
    const response = await fetch(`https://68d1197ce6c0cbeb39a38712.mockapi.io/movie/${id}`);
    const data = await response.json();
    setMovie(data);
  } catch (e) {
    console.log(e.message);
  }
};

getMovie();

const setComment = (comment) => {
  document.querySelector("#commentsList").innerHTML += `
    <div class="comment">
      <div class="meta">
        <div class="avatar">${comment.username[0]}</div>
        <div>
          <div class="c-name">${comment.username}</div>
          <div class="c-time">${new Date(comment.createdAt).toLocaleString(
            "ru-RU"
          )}</div>
        </div>
        </div>
        <div style="margin-top: 6px">
          ${comment.text} 
        </div>
    </div>
  `;
};

const sendComment = async (e) => {
  e.preventDefault();

  const comment = {
    username: document.querySelector("#name").value,
    text: document.querySelector("#comment").value,
    rating: document.querySelector("#rating").value,
    createdAt: new Date().toISOString(),
  };

  try {
    await fetch(
      `https://68d1197ce6c0cbeb39a38712.mockapi.io/movie/${id}/review/`,
      {
        method: "POST",
        body: JSON.stringify(comment),
        headers: { "Content-type": "application/json" },
      }
    );
  } catch (e) {
    console.log(e.message);
  }
};

document.querySelector("#commentForm").addEventListener("submit", sendComment);

const getComments = async () => {
  const response = await fetch(
    `https://68d1197ce6c0cbeb39a38712.mockapi.io/movie/${id}/review/`
  );
  const data = await response.json();

  data.forEach(setComment);
};
getComments();
