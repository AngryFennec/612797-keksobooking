'use strict';

(function () {

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
  var shuffledTitles = getShuffledArray(TITLES);
  var shuffledAvatars = createAvatarsArray();
  var adverts = createAdvertArray();

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

  function getAdvertsArray() {
    if (adverts === null || adverts === undefined) {
      adverts = createAdvertArray();
    }
    return adverts;
  }

  function setAdverts(response) {
    adverts = response;
  }

  window.data = {
    get: getAdvertsArray,
    setAdverts: setAdverts
  };
})();
