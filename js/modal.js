'use strict';
(function () {
  var modalElement = document.createElement('div');
  var alertElement = document.createElement('div');

  function createModal(text) {
    modalElement.className = 'modal hidden';
    modalElement.textContent = 'bad';
    modalElement.style = 'width:100%; height: 100%; background-color: rgba(0,0,0,0.5); overflow:hidden; position:fixed; top:0px;';
    alertElement.className = 'modal-block hidden';
    alertElement.style = 'margin: 40% auto; width:300px; height: 40px; padding:10px; background-color: #c5c5c5; border-radius:5px; text-align:center';
    alertElement.textContent = 'good';
    document.body.appendChild(modalElement);
    modalElement.appendChild(alertElement);

    showModal(text);
  }

  function showModal(text) {
    modalElement.classList.remove('hidden');
    alertElement.classList.remove('hidden');
    alertElement.textContent = text;
    setTimeout(closeModal, 2000);
  }

  function closeModal() {
    modalElement.classList.add('hidden');
    alertElement.classList.add('hidden');
  }

  window.modal = {
    show: createModal
  };
})();
