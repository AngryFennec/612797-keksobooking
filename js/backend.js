'use strict';
(function () {

  var GOOD_STATUS = 200;

  function createXhrRequest() {
    var newXhr = new XMLHttpRequest();
    newXhr.responseType = 'json';
    return newXhr;
  }

  function loadData(onDataLoadSuccess, onDataLoadError) {
    var urlGet = 'https://js.dump.academy/keksobooking/data';
    var xhrGet = createXhrRequest();
    xhrGet.addEventListener('load', function () {
      if (xhrGet.status === GOOD_STATUS) {
        onDataLoadSuccess(xhrGet.response);
      } else {
        onDataLoadError('Ошибка загрузки');
      }
    });
    xhrGet.open('GET', urlGet);
    xhrGet.send();
  }

  function sendData(data, onDataSendSuccess, onDataSendError) {
    var urlPost = 'https://js.dump.academy/keksobooking';
    var xhrPost = createXhrRequest();
    xhrPost.addEventListener('load', function () {
      if (xhrPost.status === GOOD_STATUS) {
        window.modal.show('Отправка прошла успешно');
        onDataSendSuccess(xhrPost.response);
      } else {
        onDataSendError('Ошибка отправки');
      }
    });
    xhrPost.open('POST', urlPost);
    xhrPost.send(data);
  }

  window.backend = {
    load: loadData,
    send: sendData
  };
})();
