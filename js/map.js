'use strict';

(function () {


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

  window.map = {
    getMainPin: getMainPin,
    isActive: isMapActive,
    disable: disableMap,
    enable: enableMap
  };
})();
