const login = async (e) => {
  e.preventDefault();

  const user = {
    username: document.querySelector(".login-form #username").value,
    password: document.querySelector(".login-form #password").value,
  };

  try {
    const response = await fetch(
      `https://68c7b9ad5d8d9f514732c30b.mockapi.io/api/v1/user?username=${user.username}&password=${user.password}`
    );
    const data = await response.json();
    if (response.ok) {
      window.location.href = "http://127.0.0.1:5500/";
    } else {
      alert("Неправильный пароль или неправильный логин");
    }
  } catch (err) {
    console.error(err);
    alert("Ошибка сети");
  }
};

document.querySelector(".login-form").addEventListener("submit", login);
