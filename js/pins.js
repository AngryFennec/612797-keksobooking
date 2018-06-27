
'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var domPinsArray = null;
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

  function createDOMPinsArray(advertsArray) {
    var newArray = [];
    for (var i = 0; i < advertsArray.length; i++) {
      newArray.push(createDOMPin(advertsArray[i]));
    }
    domPinsArray = newArray;
    return newArray;
  }

  function createDOMPinsList(domPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < domPins.length; i++) {
      fragment.appendChild(domPins[i]);
    }
    return fragment;
  }

  function getDomPinsArray() {
    return domPinsArray;
  }

  function showPinsOnMap() {
/*    if (domPinsArray === null) {
      domPinsArray = createDOMPinsArray(window.data.get());
    }*/
    pinList = createDOMPinsList(domPinsArray);
    pinsContainer.appendChild(pinList);
  }

  function clearMap() {
    while (domPinsArray.length > 0) {
      domPinsArray[0].remove();
      domPinsArray.shift();
  }
}


  function setContainer(container) {
    pinsContainer = container;
  }

  window.pins = {
    show: showPinsOnMap,
    getDOMPins: getDomPinsArray,
    clear: clearMap,
    setContainer: setContainer,
    create: createDOMPinsArray
  };

})();
