'use strict';

(function () {
  var BIG_PIN_HEIGHT = 65;
  var BIG_PIN_WIDTH = 65;
  var TAIL_HEIGHT = 22;
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  var mapPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressField = document.querySelector('input[name="address"]');
  var adForm = document.querySelector('.ad-form');
  var fieldsetNodeList = adForm.querySelectorAll('fieldset');


  function setFormDisabled() {
    adForm.classList.add('ad-form--disabled');
    for (var i = 0; i < fieldsetNodeList.length; i++) {
      fieldsetNodeList[i].disabled = true;
    }
  }

  function setFormEnabled() {
    adForm.classList.remove('ad-form--disabled');
    for (var j = 0; j < fieldsetNodeList.length; j++) {
      fieldsetNodeList[j].removeAttribute('disabled');
    }
  }

  function isMapActive() {
    return !(map.classList.contains('map--faded'));
  }

  function setPageEnabled() {
    map.classList.remove('map--faded');
    setFormEnabled();
  }

  function setPageDisabled() {
    map.classList.add('map--faded');
    setFormDisabled();
  }

  function mapPinMouseupHandler() {
    if (!isMapActive()) {
      setPageEnabled();
      setAddressFromPin(TAIL_HEIGHT + BIG_PIN_HEIGHT / 2);
      window.pins.show();
      setPinClickHandlers();
    }
  }

  function calculateAddress() {
    var pinX = parseInt(mapPin.style.left, 10) + BIG_PIN_WIDTH / 2;
    var pinY = parseInt(mapPin.style.top, 10) + BIG_PIN_HEIGHT / 2;
    if (isMapActive()) {
      pinY += BIG_PIN_HEIGHT / 2 + TAIL_HEIGHT;
    }
    return Math.round(pinX) + ', ' + Math.round(pinY);
  }

  function setAddressFromPin() {
    var addressValue = calculateAddress();
    addressField.value = addressValue;
  }

  function setPinClickHandler(advert) {
    return function () {
      window.card.close();
      window.card.show(advert);
      setPopupCloseHandler(window.card.get());
    };
  }

  function setPinClickHandlers() {
    var domPins = window.pins.getDOMPins();
    for (var i = 0; i < domPins.length; i++) {
      domPins[i].addEventListener('click', setPinClickHandler(window.adverts[i]), false);
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

  function setPopupCloseHandler(popup) {
    popup.querySelector('.popup__close').addEventListener('click', onCloseBtnPressHandler);
    document.addEventListener('keydown', onKeyEscPressHandler);
  }

  function initPage() {
    setPageDisabled();
    setAddressFromPin();
    mapPin.addEventListener('mouseup', mapPinMouseupHandler);
  }

  function getForm() {
    return adForm;
  }

  function getMainPin() {
    return mapPin;
  }


  mapPin.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var mapPinParent = mapPin.offsetParent;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var limits = {
        top: TOP_LIMIT - BIG_PIN_HEIGHT - TAIL_HEIGHT,
        bottom: BOTTOM_LIMIT - BIG_PIN_HEIGHT - TAIL_HEIGHT,
        left: mapPinParent.offsetLeft - BIG_PIN_WIDTH / 2,
        right: mapPinParent.offsetWidth - BIG_PIN_WIDTH / 2
      };

      function calculateNewCoords() {
        var newCoords = {
          x: mapPin.offsetLeft - shift.x,
          y: mapPin.offsetTop - shift.y
        };
        if (mapPin.offsetLeft - shift.x > limits.right) {
          newCoords.x = limits.right;
        }
        if (mapPin.offsetLeft - shift.x < limits.left) {
          newCoords.x = limits.left;
        }
        if (mapPin.offsetTop - shift.y > limits.bottom) {
          newCoords.y = limits.bottom;
        }
        if (mapPin.offsetTop - shift.y < limits.top) {
          newCoords.y = limits.top;
        }
        return newCoords;
      }

      var newMapPinCoords = calculateNewCoords();
      mapPin.style.left = newMapPinCoords.x + 'px';
      mapPin.style.top = newMapPinCoords.y + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setAddressFromPin();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    init: initPage,
    getForm: getForm,
    setAddress: setAddressFromPin,
    getMainPin: getMainPin
  };

})();
