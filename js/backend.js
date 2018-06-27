'use strict';
(function () {

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var urlGet = 'https://js.dump.academy/keksobooking/data';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.modal.show('Загрузка прошла успешно');
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки');
      }
    });
    xhr.responseType = 'json';
    xhr.open('GET', urlGet);
    xhr.send();
  };

  window.send = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var urlPost = 'https://js.dump.academy/keksobooking';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        window.modal.show('Загрузка прошла успешно');
      } else {
        onError('Ошибка загрузки');
      }
    });
    xhr.responseType = 'json';
    xhr.open('POST', urlPost);
    xhr.send(data);
  };
})();
