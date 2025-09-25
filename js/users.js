const container = document.getElementById("users-container");

const loadUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    if (!response.ok) throw new Error("Ошибка")
    const users = await response.json()

    container.innerHTML = ""

    users.forEach(user => {
      const card = document.createElement("div")
      card.className = "user-card"
      card.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
      `
      container.appendChild(card)
    });
  } catch (err) {
    container.innerHTML = `<p>Не удалось загрузить пользователей 😢</p>`
    console.error(err);
  }
}

loadUsers();