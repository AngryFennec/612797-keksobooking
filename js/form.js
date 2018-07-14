'use strict';
(function () {
  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 100000
  };

  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var checkInSelect = adForm.querySelector('#timein');
  var checkOutSelect = adForm.querySelector('#timeout');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var selectedRooms = parseInt(roomsSelect.value, 10);
  var addressField = document.querySelector('input[name="address"]');

  function getMinPriceByType(type) {
    return Price[type.toUpperCase()];
  }

  function onTypeSelectChange() {
    var minPrice = getMinPriceByType(typeSelect.value);
    priceInput.setAttribute('min', minPrice);
    priceInput.setAttribute('placeholder', minPrice);
  }

  function onCheckInSelectChange() {
    checkOutSelect.value = checkInSelect.value;
  }

  function onCheckOutSelectChange() {
    checkInSelect.value = checkOutSelect.value;
  }

  function setAddressFromPin(addressString) {
    addressField.value = addressString;
  }

  function validateCapacity() {
    var selectedCapacity = parseInt(capacitySelect.value, 10);
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

  function onCapacitySelectChange() {
    validateCapacity();
  }

  var fieldsetNodes = Array.from(adForm.querySelectorAll('fieldset'));

  function setFormDisabled() {
    adForm.classList.add('ad-form--disabled');
    fieldsetNodes.forEach(function (element) {
      element.disabled = true;
    });
  }

  function setFormEnabled() {
    adForm.classList.remove('ad-form--disabled');
    fieldsetNodes.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  }

  function isFormEnabled() {
    return !adForm.classList.contains('ad-form--disabled');
  }

  validateCapacity();
  typeSelect.addEventListener('change', onTypeSelectChange);
  checkInSelect.addEventListener('change', onCheckInSelectChange);
  checkOutSelect.addEventListener('change', onCheckOutSelectChange);
  capacitySelect.addEventListener('change', onCapacitySelectChange);
  roomsSelect.addEventListener('change', function () {
    selectedRooms = parseInt(roomsSelect.value, 10);
    validateCapacity();
  });


  function getForm() {
    return adForm;
  }

  function setListenerToResetBtn(callback) {
    adForm.querySelector('.ad-form__reset').addEventListener('click', callback);
  }

  function setListenerToSubmitBtn(callback) {
    adForm.addEventListener('submit', callback);
  }

  window.form = {
    getForm: getForm,
    setAddress: setAddressFromPin,
    enable: setFormEnabled,
    disable: setFormDisabled,
    setListenerToResetBtn: setListenerToResetBtn,
    setListenerToSubmitBtn: setListenerToSubmitBtn,
    isEnabled: isFormEnabled
  };

})();
