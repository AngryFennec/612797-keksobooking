'use strict';
(function () {
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  var BIG_PIN_HEIGHT = 65;
  var BIG_PIN_WIDTH = 65;
  var TAIL_HEIGHT = 22;

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
      window.form.setAddress(window.map.getMainPin());
      window.pins.show();
      setPinClickHandlers();
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

  function setPinClickHandlers() {
    var domPins = window.pins.getDOMPins();
    var adverts = window.data.get();
    for (var i = 0; i < domPins.length; i++) {
      domPins[i].addEventListener('click', setPinClickHandler(adverts[i]), false);
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

  window.map.getMainPin().addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var mapPinParent = window.map.getMainPin().offsetParent;
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
          x: window.map.getMainPin().offsetLeft - shift.x,
          y: window.map.getMainPin().offsetTop - shift.y
        };
        if (window.map.getMainPin().offsetLeft - shift.x > limits.right) {
          newCoords.x = limits.right;
        }
        if (window.map.getMainPin().offsetLeft - shift.x < limits.left) {
          newCoords.x = limits.left;
        }
        if (window.map.getMainPin().offsetTop - shift.y > limits.bottom) {
          newCoords.y = limits.bottom;
        }
        if (window.map.getMainPin().offsetTop - shift.y < limits.top) {
          newCoords.y = limits.top;
        }
        return newCoords;
      }

      var newMapPinCoords = calculateNewCoords();
      window.map.getMainPin().style.left = newMapPinCoords.x + 'px';
      window.map.getMainPin().style.top = newMapPinCoords.y + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(window.map.getAddress());
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.card.setContainer(document.querySelector('.map'));
  window.pins.setContainer(document.querySelector('.map__pins'));
  initPage();
  window.form.setListenerToResetBtn(onResetClickHandler);

})();
