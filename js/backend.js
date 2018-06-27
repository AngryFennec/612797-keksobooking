'use strict';
(function () {

  window.load = function (onDataLoadSuccess, onDataLoadError) {
    var xhr = new XMLHttpRequest();
    var urlGet = 'https://js.dump.academy/keksobooking/data';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.modal.show('Загрузка прошла успешно');
        onDataLoadSuccess(xhr.response);
      } else {
        onDataLoadError('Ошибка загрузки');
      }
    });
    xhr.responseType = 'json';
    xhr.open('GET', urlGet);
    xhr.send();
  };

  window.send = function (data, onDataSendSuccess, onDataSendError) {
    var xhr = new XMLHttpRequest();
    var urlPost = 'https://js.dump.academy/keksobooking';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onDataSendSuccess(xhr.response);
      } else {
        onDataSendError('Ошибка загрузки');
      }
    });
    xhr.responseType = 'json';
    xhr.open('POST', urlPost);
    xhr.send(data);
  };
})();
