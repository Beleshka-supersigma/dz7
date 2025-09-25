const modalElem = document.querySelector(".modal");

const openModal = () => {
  modalElem.style.display = "flex";
};

const closeModal = () => {
  modalElem.style.display = "none";
};

document.querySelector(".modal .cross").addEventListener("click", closeModal);
