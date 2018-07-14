'use strict';
(function () {

  var mainPin = window.map.getMainPin();

  function clearPage() {
    window.card.close();
    window.pins.clear();
    window.photo.resetPhoto();
    initPage();
  }

  function onResetClick(event) {
    event.preventDefault();
    window.form.getForm().reset();
    clearPage();
  }

  function onSubmitBtnClick(event) {
    window.backend.send(new FormData(window.form.getForm()), function () {
      window.form.disable();
      window.form.getForm().reset();
      window.modal.show('Загрузка прошла успешно');
    }, window.modal.show);
    event.preventDefault();
  }


  function setPageEnabled() {
    window.map.enable();
    window.form.enable();
  }

  function setPageDisabled() {
    window.map.disable();
    window.form.disable();
  }

  function onMapPinMouseUp() {
    setPageEnabled();
    window.form.setAddress(window.map.getAddress());
    window.backend.load(onDataLoad, window.modal.show);
  }

  function setPopupCloseHandler(currentPopup) {
    currentPopup.querySelector('.popup__close').addEventListener('click', onCloseBtnPress);
    document.addEventListener('keydown', onKeyEscPress);
  }

  function setPinClickHandler(advert) {
    return function () {
      window.card.close();
      window.card.show(advert);
      window.card.setListener(setPopupCloseHandler);
    };
  }

  function setPinClickHandlers(advertsArray) {
    var domPins = window.pins.getDOMPins();
    for (var i = 0; i < domPins.length; i++) {
      domPins[i].addEventListener('click', setPinClickHandler(advertsArray[i]), false);
    }
  }

  function onCloseBtnPress() {
    window.card.close();
    document.removeEventListener('keydown', onKeyEscPress);
  }

  function onKeyEscPress(event) {
    if (event.keyCode === 27) {
      window.card.close();
      document.removeEventListener('keydown', onKeyEscPress);
    }
  }

  function initPage() {
    setPageDisabled();
    window.map.resetPin();
    window.form.setAddress(window.map.getAddress());
    window.map.getMainPin().addEventListener('mouseup', onMapPinMouseUp);
  }

  mainPin.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newMapPinCoords = window.map.calculateNewCoords(shift);
      window.map.setNewCoords(newMapPinCoords);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(window.map.getAddress());
      setPageEnabled();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function showPins(response) {
    window.pins.create(response);
    window.pins.show();
    setPinClickHandlers(response);
  }

  function onDataLoad(response) {
    window.map.getMainPin().removeEventListener('mouseup', onMapPinMouseUp);
    window.filter.set(response, window.debounce(showPins));
    var filteredData = window.filter.get(response);
    showPins(filteredData);
  }

  window.card.setContainer(document.querySelector('.map'));
  window.pins.setContainer(document.querySelector('.map__pins'));
  initPage();
  window.form.setListenerToSubmitBtn(onSubmitBtnClick);
  window.form.setListenerToResetBtn(onResetClick);
})();
