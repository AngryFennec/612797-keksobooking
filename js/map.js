'use strict';

var TOTAL = 8;
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var shuffledTitles = getShuffledArray(TITLES);
var shuffledAvatars = createAvatarsArray();

var adverts = createAdvertArray();
var advertTemplate = document.querySelector('template').content.querySelector('.map__card');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var mapBeforePopup = document.querySelector('.map__filters-container');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandomArrayElement(array) {
  var max = array.length - 1;
  return array[getRandomInt(0, max)];
}

function getObjectKeysArrray(object) {
  var newArray = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      newArray.push(key);
    }
  }
  return newArray;
}

function swapElements(array, i, j) {
  var temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function copyPrimitiveArray(array) {
  var newArray = array.slice();
  return newArray;
}

function getRandomArray(array) {
  var newLength = getRandomInt(0, array.length);
  var tempArray = getShuffledArray(array);
  var newArray = [];
  for (var i = 0; i < newLength; i++) {
    newArray.push(tempArray[i]);
  }
  return newArray;
}

function getShuffledArray(array) {
  var newArray = copyPrimitiveArray(array);
  for (var i = newArray.length - 1; i >= 1; i--) {
    swapElements(newArray, i, getRandomInt(0, i));
  }
  return newArray;
}

function createAvatarsArray() {
  var newArray = [];
  for (var i = 0; i < TOTAL; i++) {
    newArray.push(i + 1);
  }
  return getShuffledArray(newArray);
}

function createAdvert() {
  var randomX = getRandomInt(300, 900);
  var randomY = getRandomInt(130, 630);

  var advert = {
    author: {
      avatar: 'img/avatars/user0' + shuffledAvatars[0] + '.png'
    },
    offer: {
      title: shuffledTitles[0],
      address: randomX + ' ' + randomY,
      price: getRandomInt(1000, 1000000),
      type: getRandomArrayElement(getObjectKeysArrray(TYPES)),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 99),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArray(FEATURES),
      description: '',
      photos: getShuffledArray(PHOTOS)
    },
    location: {
      x: randomX,
      y: randomY
    }
  };
  return advert;
}

function createAdvertArray() {
  var newArray = [];
  for (var i = 0; i < TOTAL; i++) {
    newArray.push(createAdvert());
    shuffledTitles.splice(0, 1);
    shuffledAvatars.splice(0, 1);
  }
  return newArray;
}

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
  return newArray;
}

function createDOMPinsList(domPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < domPins.length; i++) {
    fragment.appendChild(domPins[i]);
  }
  return fragment;
}

function addPinsToPage(fragment) {
  pinList.appendChild(fragment);
}

function getStringByType(type) {
  return TYPES[type];
}

function createDOMPhotos(domPhotos, photoArray) {
  var photo = domPhotos.querySelector('.popup__photo');
  photo.src = photoArray[0];
  domPhotos.appendChild(photo);
  for (var i = 1; i < photoArray.length; i++) {
    var newPhoto = photo.cloneNode(true);
    newPhoto.src = photoArray[i];
    domPhotos.appendChild(newPhoto);
  }
}
function clearChildren(parent) {
  parent.innerHTML = '';
}

function createDOMFeatures(domUl, featuresArray) {
  clearChildren(domUl);
  for (var i = 0; i < featuresArray.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    var classString = 'popup__feature--' + featuresArray[i];
    li.classList.add(classString);
    domUl.appendChild(li);
  }
}

function createDOMAdvert(advertElement) {
  var domAdvert = advertTemplate.cloneNode(true);
  domAdvert.querySelector('.popup__title').textContent = advertElement.offer.title;
  domAdvert.querySelector('.popup__text--address').textContent = advertElement.offer.address;
  domAdvert.querySelector('.popup__text--price').textContent = advertElement.offer.price + '₽/ночь';
  domAdvert.querySelector('.popup__type').textContent = getStringByType(advertElement.offer.type);
  domAdvert.querySelector('.popup__text--capacity').textContent = advertElement.offer.rooms + ' комнаты для ' + advertElement.offer.guests + ' гостей';
  domAdvert.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertElement.offer.checkin + ', выезд до ' + advertElement.offer.checkout;
  domAdvert.querySelector('.popup__description').textContent = advertElement.offer.description;
  domAdvert.querySelector('.popup__avatar').src = advertElement.author.avatar;
  createDOMPhotos(domAdvert.querySelector('.popup__photos'), advertElement.offer.photos);
  createDOMFeatures(domAdvert.querySelector('.popup__features'), advertElement.offer.features);
  return domAdvert;
}

function addAdvertToPage(node) {
  mapBeforePopup.before(node);
}

// map.classList.remove('map--faded');
// addPinsToPage(createDOMPinList(adverts));
// addAdvertToPage(createDOMAdvert(adverts[0]));

/* module4-task1 */

var BIG_PIN_HEIGHT = 65;
var BIG_PIN_WIDTH = 65;
var TAIL_HEIGHT = 22;
var mapPin = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var domPinsArray = createDOMPinsArray(adverts);
var addressField = document.querySelector('input[name="address"]');
var adForm = document.querySelector('.ad-form');
var fieldsetNodeList = adForm.querySelectorAll('fieldset');
var currentPopup = null;

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
    if (domPinsArray === null) {
      domPinsArray = createDOMPinsArray(adverts);
    }
    addPinsToPage(createDOMPinsList(domPinsArray));
    setPinClickHandlers();
  }
}

function calculateAddress() {
  var pinX = parseInt(mapPin.style.left, 10) + BIG_PIN_WIDTH / 2;
  var pinY = parseInt(mapPin.style.top, 10) + BIG_PIN_HEIGHT / 2;
  if (isMapActive()) {
    pinY += BIG_PIN_HEIGHT / 2 + TAIL_HEIGHT;
  }
  return pinX + ', ' + pinY;
}

function setAddressFromPin() {
  var addressValue = calculateAddress();
  addressField.value = addressValue;
}

function setPinClickHandler(advert) {
  return function () {
    if (currentPopup !== null) {
      closeCurrentPopup();
    }
    currentPopup = createDOMAdvert(advert);
    setPopupCloseHandler(currentPopup);
    addAdvertToPage(currentPopup);
  };
}

function setPinClickHandlers() {
  for (var i = 0; i < domPinsArray.length; i++) {
    domPinsArray[i].addEventListener('click', setPinClickHandler(adverts[i]), false);
  }
}

function closeCurrentPopup() {
  currentPopup.remove();
  currentPopup = null;
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
  if (currentPopup !== null) {
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
  while (domPinsArray.length > 0) {
    domPinsArray[0].remove();
    domPinsArray.shift();
  }
  domPinsArray = null;
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
