'use strict';

(function () {

  var Pin = {
    HEIGHT: 65,
    WIDTH: 65,
    TAIL: 22,
    LEFT: 570,
    TOP: 350
  };

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
    var pinX = parseInt(mapPin.style.left, 10) + Pin.WIDTH / 2;
    var pinY = parseInt(mapPin.style.top, 10) + Pin.HEIGHT / 2;
    if (isMapActive()) {
      pinY += Pin.HEIGHT / 2 + Pin.TAIL;
    }
    return Math.round(pinX) + ', ' + Math.round(pinY);
  }

  function resetPinCoords() {
    mapPin.style.left = Pin.LEFT + 'px';
    mapPin.style.top = Pin.TOP + 'px';
  }

  window.map = {
    getMainPin: getMainPin,
    isActive: isMapActive,
    disable: disableMap,
    enable: enableMap,
    getAddress: calculateAddress,
    resetPin: resetPinCoords
  };
})();
