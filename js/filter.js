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
  var dataGlobal = null;
  var onFilterFormChange;

  function getCheckedFeatures() {
    var newArray = [];
    Array.from(features).forEach(function (element) {
      if (element.checked) {
        newArray.push(element.value);
      }
    });
    return newArray;
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

  function isNested(innerArray, outerArray) {
    var marked = innerArray.filter(function (element) {
      return outerArray.indexOf(element) !== -1;
    });
    return marked.length === innerArray.length;
  }

  function checkFeatures(element) {
    return getCheckedFeatures().length ? isNested(getCheckedFeatures(), element.offer.features) : true;
  }

  function getFilterState() {
    var filteredData = dataGlobal.filter(function (it) {
      return checkType(it) && checkPrice(it) && checkRooms(it) && checkGuests(it) && checkFeatures(it);
    });
    changeCallback(filteredData);
  }

  function setDebounce(callback) {
    onFilterFormChange = callback(getFilterState);
  }

  function setFilters(data, callback) {
    changeCallback = callback;
    dataGlobal = data;
    onFilterFormChange();
    filterForm.addEventListener('change', onFilterFormChange);
  }

  window.filter = {
    set: setFilters,
    setDebounce: setDebounce
  };

})();
