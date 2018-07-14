'use strict';
(function () {
  var ANY_VALUE = 'any';
  var PINS_NUMBER = 5;

  var Price = {
    LOW_MAX: 1000,
    MIDDLE_MAX: 5000
  };

  var PriceValue = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var featuresFieldset = filterForm.querySelector('#housing-features');
  var features = featuresFieldset.querySelectorAll('.map__checkbox');

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
    return type.value === ANY_VALUE ? true : element.offer.type === type.value;
  }

  function checkPriceRange(range, priceValue) {
    switch (range) {
      case (PriceValue.MIDDLE): {
        return (priceValue >= Price.LOW_MAX && priceValue <= Price.MIDDLE_MAX);
      }
      case (PriceValue.LOW): {
        return (priceValue < Price.LOW_MAX);
      }
      case (PriceValue.HIGH): {
        return (priceValue > Price.MIDDLE_MAX);
      }
    }
    return false;
  }

  function checkPrice(element) {
    return price.value === ANY_VALUE ? true : checkPriceRange(price.value, element.offer.price);
  }

  function checkRooms(element) {
    return rooms.value === ANY_VALUE ? true : parseInt(element.offer.rooms, 10) === parseInt(rooms.value, 10);
  }

  function checkGuests(element) {
    return guests.value === ANY_VALUE ? true : parseInt(element.offer.guests, 10) === parseInt(guests.value, 10);
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

  function getFilterState(dataValues) {
    var filteredData = dataValues.filter(function (element) {
      return checkType(element) && checkPrice(element) && checkRooms(element) && checkGuests(element) && checkFeatures(element);
    });
    return filteredData.length > PINS_NUMBER ? filteredData.slice(0, PINS_NUMBER) : filteredData;
  }

  function setFilters(dataValues, callback) {
    filterForm.addEventListener('change', function () {
      var filteredData = getFilterState(dataValues);
      callback(filteredData);
    });
  }

  window.filter = {
    set: setFilters,
    get: getFilterState
  };

})();
