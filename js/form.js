'use strict';
(function () {
  var TYPES_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 100000
  };
  var BIG_PIN_HEIGHT = 65;
  var BIG_PIN_WIDTH = 65;
  var TAIL_HEIGHT = 22;


  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var checkinSelect = adForm.querySelector('#timein');
  var checkoutSelect = adForm.querySelector('#timeout');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var selectedRooms = Number(roomsSelect.value);
  var addressField = document.querySelector('input[name="address"]');

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

  function calculateAddress(mapPin) {
    var pinX = parseInt(mapPin.style.left, 10) + BIG_PIN_WIDTH / 2;
    var pinY = parseInt(mapPin.style.top, 10) + BIG_PIN_HEIGHT / 2;
    if (window.map.isActive()) {
      pinY += BIG_PIN_HEIGHT / 2 + TAIL_HEIGHT;
    }
    return Math.round(pinX) + ', ' + Math.round(pinY);
  }

  function setAddressFromPin(mapPin) {
    var addressValue = calculateAddress(mapPin);
    addressField.value = addressValue;
  }

  function validateCapacity() {
    var selectedCapacity = Number(capacitySelect.value);
    capacitySelect.setCustomValidity('');
    var message = '';
    switch (selectedRooms) {
      case (1): {
        if (selectedCapacity !== 1) {
          message = 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя';
        }
        break;
      }
      case (2): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2) {
          message = 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя; для 2 гостей';
        }
        break;
      }
      case (3): {
        if (selectedCapacity !== 1 && selectedCapacity !== 2 && selectedCapacity !== 3) {
          message = 'Для указанного количества комнат можно выбрать количество мест: для 1 гостя; для 2 гостей; для 3 гостей';
        }
        break;
      }
      case (100): {
        if (selectedCapacity !== 0) {
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

  validateCapacity();
  typeSelect.addEventListener('change', onTypeSelectChangeHandler);
  checkinSelect.addEventListener('change', onCheckinSelectChangeHandler);
  checkoutSelect.addEventListener('change', onCheckoutSelectChangeHandler);
  capacitySelect.addEventListener('change', onCapacitySelectChangeHandler);
  roomsSelect.addEventListener('change', function () {
    selectedRooms = Number(roomsSelect.value);
    validateCapacity();
  });


  function getForm() {
    return adForm;
  }

  window.form = {
    getForm: getForm,
    setAddress: setAddressFromPin,
    enable: setFormEnabled,
    disable: setFormDisabled
  };

})();
