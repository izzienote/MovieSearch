//(5-1) 모달 열고 닫기
export const modal = document.querySelector(".modal");
export const modalOpenBtn = document.querySelector(".modal-btn");
export const modalCloseBtn = document.querySelector(".close-btn");
export const toggleModal = function () {
  modal.classList.toggle("hide");
};