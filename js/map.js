'use strict';

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

function getNonrepeatElement(array) {}

function getRandomArray(array) {}

function getShuffledArray(array) {}

var advert = {
  author: {
    avatar: 'img/avatars/user' + getNonrepeatElement() + '.png'
  },
  offer: {
    title: getNonrepeatElement(TITLES),
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
