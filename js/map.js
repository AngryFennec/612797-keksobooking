'use strict';

var TOTAL = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURE_STRING = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_STRING = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandomArrayElement(array) {
  var max = array.length - 1;
  return array[getRandomInt(0, max)];
}

function swapElements(array, i, j) {
  var temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function copyPrimitiveArray(array) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

function getNonrepeatElement(shuffledArray, index) {
  return shuffledArray[index];
}

function getRandomArray(array) {
  var newLength = getRandomInt(0, array.length);
  console.log(newLength);
  var newArray = [];
  for (var i = 0; i < newLength; i++) {
    newArray.push(getRandomArrayElement(array));
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
  newArray = [];
  for (var i = 0; i < TOTAL; i++) {
    newArray.push(i);
  }
  return getShuffledArray(newArray);
}
function createAdvert(avatarNumber,  titleString) {

  var advert = {
    author: {
      avatar: 'img/avatars/user0' + avatarNumber + '.png'
    },
    offer: {
      title: titleString,
      address: this.location.x + ' ' + this.location.y,
      price: getRandomInt(1000, 1000000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 99),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArray(FEATURE_STRING),
      description: '',
      photos: getShuffledArray(PHOTO_STRING)
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(130, 630)
    }
  };
  return advert;
}

function createAdvertArray() {
  var newArray = [];
  var avatarArray = createAvatarsArray();
  
  for (var i = 0; i < TOTAL; i++) {
    newArray.push(createAdvert())
  }
}
console.log(FEATURE_STRING);
console.log(getRandomArrayElement(FEATURE_STRING));
console.log(copyPrimitiveArray(FEATURE_STRING));
console.log(getRandomArray(FEATURE_STRING));
console.log(getShuffledArray(FEATURE_STRING));
