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
var map = document.querySelector('.map');
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

function createDOMPinList(advertArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertArray.length; i++) {
    fragment.appendChild(createDOMPin(advertArray[i]));
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

map.classList.remove('map--faded');
addPinsToPage(createDOMPinList(adverts));
addAdvertToPage(createDOMAdvert(adverts[0]));
