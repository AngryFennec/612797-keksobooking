'use strict';

/* module4-task1 */

var BIG_PIN_HEIGHT = 65;
var BIG_PIN_WIDTH = 65;
var TAIL_HEIGHT = 22;
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
    window.showPins();
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
    if (window.currentPopup !== undefined) {
      closeCurrentPopup();
    }
    window.showAdvert(advert);
    setPopupCloseHandler(window.currentPopup);
  };
}

function setPinClickHandlers() {
  for (var i = 0; i < window.domPinsArray.length; i++) {
    window.domPinsArray[i].addEventListener('click', setPinClickHandler(window.adverts[i]), false);
  }
}

function closeCurrentPopup() {
  window.currentPopup.remove();
  window.currentPopup = undefined;
}

function onCloseBtnPressHandler() {
  closeCurrentPopup();
  document.removeEventListener('keydown', onKeyEscPressHandler);
}

function onKeyEscPressHandler(event) {
  if (event.keyCode === 27) {
    closeCurrentPopup();
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

function clearPage() {
  if (window.currentPopup !== undefined) {
    closeCurrentPopup();
  }
  clearMap();
  initPage();
}

initPage();

/* module4-task2 */

var TYPES_PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 100000
};
var typeSelect = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');
var checkinSelect = adForm.querySelector('#timein');
var checkoutSelect = adForm.querySelector('#timeout');
var roomsSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');
var selectedRooms = Number(roomsSelect.value);
var resetBtn = adForm.querySelector('.ad-form__reset');


function getMinPriceByType(type) {
  return TYPES_PRICES[type];
}

function onTypeSelectChangeHandler() {
  var minPrice = getMinPriceByType(typeSelect.value);
  priceInput.setAttribute('min', minPrice);
  priceInput.setAttribute('placeholder', minPrice);
}

function changeCheckTime(checkField, index) {
  checkField.selectedIndex = index;
}

function onCheckinSelectChangeHandler() {
  changeCheckTime(checkoutSelect, checkinSelect.selectedIndex);
}

function onCheckoutSelectChangeHandler() {
  changeCheckTime(checkinSelect, checkoutSelect.selectedIndex);
}

function validateCapacity() {
  var selectedCapacity = Number(capacitySelect.value);
  var message = '';
  switch (selectedRooms) {
    case (1): {
      if (selectedCapacity !== 1) {
        message = 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя';
      }
      break;
    }
    case (2): {
      if (selectedCapacity !== 1 || selectedCapacity !== 2) {
        message = 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя; для 2 гостей';
      }
      break;
    }
    case (3): {
      if (selectedCapacity !== 1 || selectedCapacity !== 2 || selectedCapacity !== 3) {
        message = 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя; для 2 гостей; для 3 гостей';
      }
      break;
    }
    case (100): {
      if (selectedCapacity !== 100) {
        message = 'Для указанного количества комнат можно выбрать количество мест: не для гостей';
      }
      break;
    }
  }
  capacitySelect.setCustomValidity(message);
}

function onCapacitySelectChangeHandler() {
  validateCapacity();
}

function clearMap() {
  while (window.domPinsArray.length > 0) {
    window.domPinsArray[0].remove();
    window.domPinsArray.shift();
  }
  window.domPinsArray = null;
}

function onResetClickHandler(event) {
  event.preventDefault();
  adForm.reset();
  clearPage();
}

validateCapacity();
typeSelect.addEventListener('change', onTypeSelectChangeHandler);
checkinSelect.addEventListener('change', onCheckinSelectChangeHandler);
checkoutSelect.addEventListener('change', onCheckoutSelectChangeHandler);
capacitySelect.addEventListener('change', onCapacitySelectChangeHandler);
roomsSelect.addEventListener('change', function () {
  selectedRooms = Number(roomsSelect.value);
  validateCapacity();
});
resetBtn.addEventListener('click', onResetClickHandler);

/* module5-task1 */

var TOP_LIMIT = 130;
var BOTTOM_LIMIT = 630;

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
