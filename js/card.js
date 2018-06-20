'use strict';

(function () {

  var TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  window.mapBeforePopup = document.querySelector('.map__filters-container');
  var advertTemplate = document.querySelector('template').content.querySelector('.map__card');
  var currentPopup = null;

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
    window.mapBeforePopup.before(node);
  }

  function getCurrentPopup() {
    return currentPopup;
  }

  function showPopup(advert) {
    currentPopup = createDOMAdvert(advert);
    addAdvertToPage(currentPopup);
  }

  function closePopup() {
    if (currentPopup !== null && currentPopup !== undefined) {
      currentPopup.remove();
      currentPopup = undefined;
    }
  }

  window.card = {
    show: showPopup,
    close: closePopup,
    get: getCurrentPopup,
  };
})();
