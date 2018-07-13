
'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var domPins = [];
  var pinsContainer = null;
  var pinList = null;

  function createDOMPin(advertElement) {
    var domPin = pinTemplate.cloneNode(true);
    var coordX = advertElement.location.x - PIN_WIDTH / 2;
    var coordY = advertElement.location.y - PIN_HEIGHT;
    domPin.style = 'left: ' + coordX + 'px; top: ' + coordY + 'px;';
    domPin.querySelector('img').src = advertElement.author.avatar;
    domPin.querySelector('img').alt = advertElement.offer.title;
    return domPin;
  }

  function createDOMPinsArray(adverts) {
    clearMap();
    for (var i = 0; i < adverts.length; i++) {
      domPins.push(createDOMPin(adverts[i]));
    }
  }

  function createDOMPinsList(domArrayPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < domArrayPins.length; i++) {
      fragment.appendChild(domArrayPins[i]);
    }
    return fragment;
  }

  function getDomPins() {
    return domPins;
  }

  function showPinsOnMap() {
    pinList = createDOMPinsList(domPins);
    pinsContainer.appendChild(pinList);
  }

  function clearMap() {
    domPins.forEach(function (element) {
      element.remove();
    });
    domPins = [];
  }


  function setContainer(container) {
    pinsContainer = container;
  }

  window.pins = {
    show: showPinsOnMap,
    getDOMPins: getDomPins,
    clear: clearMap,
    setContainer: setContainer,
    create: createDOMPinsArray
  };

})();
