'use strict';

(function () {

  var BIG_PIN_HEIGHT = 65;
  var BIG_PIN_WIDTH = 65;
  var TAIL_HEIGHT = 22;

  var mapPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

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
    var pinX = parseInt(mapPin.style.left, 10) + BIG_PIN_WIDTH / 2;
    var pinY = parseInt(mapPin.style.top, 10) + BIG_PIN_HEIGHT / 2;
    if (isMapActive()) {
      pinY += BIG_PIN_HEIGHT / 2 + TAIL_HEIGHT;
    }
    return Math.round(pinX) + ', ' + Math.round(pinY);
  }

  window.map = {
    getMainPin: getMainPin,
    isActive: isMapActive,
    disable: disableMap,
    enable: enableMap,
    getAddress: calculateAddress
  };
})();
