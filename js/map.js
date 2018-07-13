'use strict';

(function () {

  var PinParameter = {
    HEIGHT: 65,
    WIDTH: 65,
    TAIL: 22,
    LEFT_DEFAULT: 570,
    TOP_DEFAULT: 350
  };

  var Limit = {
    TOP: 130,
    BOTTOM: 630
  };

  var mapPin = document.querySelector('.map__pin--main');
  var mapPinParent = mapPin.offsetParent;
  var map = document.querySelector('.map');

  var MaxCoord = {
    top: Limit.TOP - PinParameter.HEIGHT - PinParameter.TAIL,
    bottom: Limit.BOTTOM - PinParameter.HEIGHT - PinParameter.TAIL,
    left: mapPinParent.offsetLeft - PinParameter.WIDTH / 2,
    right: mapPinParent.offsetWidth - PinParameter.WIDTH / 2
  };

  function isMapActive() {
    return !(map.classList.contains('map--faded'));
  }

  function disableMap() {
    map.classList.add('map--faded');
  }

  function enableMap() {
    map.classList.remove('map--faded');
  }

  function getMainPin() {
    return mapPin;
  }

  function calculateAddress() {
    var pinX = parseInt(mapPin.style.left, 10) + PinParameter.WIDTH / 2;
    var pinY = parseInt(mapPin.style.top, 10) + PinParameter.HEIGHT / 2;
    if (isMapActive()) {
      pinY += PinParameter.HEIGHT / 2 + PinParameter.TAIL;
    }
    return Math.round(pinX) + ', ' + Math.round(pinY);
  }

  function resetPinCoords() {
    setNewCoords({
      x: PinParameter.LEFT_DEFAULT,
      y: PinParameter.TOP_DEFAULT
    }
    );
  }

  function setNewCoords(newCoords) {
    mapPin.style.left = newCoords.x + 'px';
    mapPin.style.top = newCoords.y + 'px';
  }

  function calculateNewCoords(shift) {
    var newCoords = {
      x: mapPin.offsetLeft - shift.x,
      y: mapPin.offsetTop - shift.y
    };
    if (mapPin.offsetLeft - shift.x > MaxCoord.right) {
      newCoords.x = MaxCoord.right;
    }
    if (mapPin.offsetLeft - shift.x < MaxCoord.left) {
      newCoords.x = MaxCoord.left;
    }
    if (mapPin.offsetTop - shift.y > MaxCoord.bottom) {
      newCoords.y = MaxCoord.bottom;
    }
    if (mapPin.offsetTop - shift.y < MaxCoord.top) {
      newCoords.y = MaxCoord.top;
    }
    return newCoords;
  }

  window.map = {
    getMainPin: getMainPin,
    isActive: isMapActive,
    disable: disableMap,
    enable: enableMap,
    getAddress: calculateAddress,
    resetPin: resetPinCoords,
    calculateNewCoords: calculateNewCoords,
    setNewCoords: setNewCoords
  };
})();
