'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var featuresFieldset = filterForm.querySelector('#housing-features');
  var features = featuresFieldset.querySelectorAll('.map__checkbox');
  var changeCallback = null;
  var globalDataValues = null;
  var onFilterFormChange;

  function getCheckedFeatures() {
    var checkedValues = [];
    Array.from(features).forEach(function (element) {
      if (element.checked) {
        checkedValues.push(element.value);
      }
    });
    return checkedValues;
  }

  function checkType(element) {
    return type.value === 'any' ? true : element.offer.type === type.value;
  }

  function checkPriceRange(range, priceValue) {
    switch (range) {
      case ('middle'): {
        return (priceValue >= 1000 && priceValue <= 5000);
      }
      case ('low'): {
        return (priceValue < 1000);
      }
      case ('high'): {
        return (priceValue > 5000);
      }
    }
    return false;
  }

  function checkPrice(element) {
    return price.value === 'any' ? true : checkPriceRange(price.value, element.offer.price);
  }

  function checkRooms(element) {
    return rooms.value === 'any' ? true : parseInt(element.offer.rooms, 10) === parseInt(rooms.value, 10);
  }

  function checkGuests(element) {
    return guests.value === 'any' ? true : parseInt(element.offer.guests, 10) === parseInt(guests.value, 10);
  }

  function isNested(inners, outers) {
    var markedValues = inners.filter(function (element) {
      return outers.indexOf(element) !== -1;
    });
    return markedValues.length === inners.length;
  }

  function checkFeatures(element) {
    return getCheckedFeatures().length === 0 ? true : isNested(getCheckedFeatures(), element.offer.features);
  }

  function getFilterState() {
    var filteredDataValues = globalDataValues.filter(function (element) {
      return checkType(element) && checkPrice(element) && checkRooms(element) && checkGuests(element) && checkFeatures(element);
    });
    changeCallback(filteredDataValues.length > 5 ? filteredDataValues.slice(0, 5) : filteredDataValues);
  }

  function setDebounce(callback) {
    onFilterFormChange = callback(getFilterState);
  }

  function setFilters(dataValues, callback) {
    changeCallback = callback;
    globalDataValues = dataValues;
    onFilterFormChange();
    filterForm.addEventListener('change', onFilterFormChange);
  }

  window.filter = {
    set: setFilters,
    setDebounce: setDebounce
  };

})();
