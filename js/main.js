'use strict';
(function () {

  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  var BIG_PIN_HEIGHT = 65;
  var BIG_PIN_WIDTH = 65;
  var TAIL_HEIGHT = 22;
  var mainPin = window.map.getMainPin();

  function clearPage() {
    window.card.close();
    window.pins.clear();
    initPage();
  }

  function onResetClickHandler(event) {
    event.preventDefault();
    window.form.getForm().reset();
    clearPage();
  }

  function onSubmitBtnClickHandler(event) {
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

  function mapPinMouseupHandler() {
    if (!window.map.isActive()) {
      setPageEnabled();
      window.form.setAddress(window.map.getAddress());
      window.backend.load(onDataLoad, window.modal.show);
    }
  }

  function setPopupCloseHandler(currentPopup) {
    currentPopup.querySelector('.popup__close').addEventListener('click', onCloseBtnPressHandler);
    document.addEventListener('keydown', onKeyEscPressHandler);
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


  function onCloseBtnPressHandler() {
    window.card.close();
    document.removeEventListener('keydown', onKeyEscPressHandler);
  }

  function onKeyEscPressHandler(event) {
    if (event.keyCode === 27) {
      window.card.close();
      document.removeEventListener('keydown', onKeyEscPressHandler);
    }
  }

  function initPage() {
    setPageDisabled();
    window.form.setAddress(window.map.getAddress());
    window.map.getMainPin().addEventListener('mouseup', mapPinMouseupHandler);
  }

  function getLimits() {
    var mapPinParent = mainPin.offsetParent;
    var limits = {
      top: TOP_LIMIT - BIG_PIN_HEIGHT - TAIL_HEIGHT,
      bottom: BOTTOM_LIMIT - BIG_PIN_HEIGHT - TAIL_HEIGHT,
      left: mapPinParent.offsetLeft - BIG_PIN_WIDTH / 2,
      right: mapPinParent.offsetWidth - BIG_PIN_WIDTH / 2
    };
    return limits;
  }

  mainPin.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var limits = getLimits();

      function calculateNewCoords() {
        var newCoords = {
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };
        if (mainPin.offsetLeft - shift.x > limits.right) {
          newCoords.x = limits.right;
        }
        if (mainPin.offsetLeft - shift.x < limits.left) {
          newCoords.x = limits.left;
        }
        if (mainPin.offsetTop - shift.y > limits.bottom) {
          newCoords.y = limits.bottom;
        }
        if (mainPin.offsetTop - shift.y < limits.top) {
          newCoords.y = limits.top;
        }
        return newCoords;
      }

      var newMapPinCoords = calculateNewCoords();
      mainPin.style.left = newMapPinCoords.x + 'px';
      mainPin.style.top = newMapPinCoords.y + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(window.map.getAddress());
      setPageEnabled();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function showChangedPins(response) {
    window.pins.create(response);
    window.pins.show();
    setPinClickHandlers(response);
  }

  function onDataLoad(response) {
    window.filter.setDebounce(window.debounce);
    window.filter.set(response, showChangedPins);
  }

  window.card.setContainer(document.querySelector('.map'));
  window.pins.setContainer(document.querySelector('.map__pins'));
  initPage();
  window.form.setListenerToSubmitBtn(onSubmitBtnClickHandler);
  window.form.setListenerToResetBtn(onResetClickHandler);
})();
