'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var type = filterForm.querySelector('#housing-type');
  var price = filterForm.querySelector('#housing-price');
  var rooms = filterForm.querySelector('#housing-rooms');
  var guests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelector('#housing-features');



  function onFilterFormChange() {
    console.log(type.value);
    console.log(price.value);
    console.log(rooms.value);
    console.log(guests.value);
    console.log(features.selected);

  }
  filterForm.addEventListener('change', onFilterFormChange);
})();
