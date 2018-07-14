'use strict';

(function () {

  var Title = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var advertTemplate = document.querySelector('template').content.querySelector('.map__card');
  var currentPopup = null;
  var popupContainer = null;

  function getStringByType(type) {
    return Title[type.toUpperCase()];
  }

  function createDOMPhotos(domPhotos, photos) {
    var photo = domPhotos.querySelector('.popup__photo');
    photo.src = photos[0];
    domPhotos.appendChild(photo);
    for (var i = 1; i < photos.length; i++) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = photos[i];
      domPhotos.appendChild(newPhoto);
    }
  }

  function clearChildren(parent) {
    parent.innerHTML = '';
  }

  function createDOMFeatures(domUl, features) {
    clearChildren(domUl);
    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      var classString = 'popup__feature--' + features[i];
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

  function showPopup(advert) {
    currentPopup = createDOMAdvert(advert);
    popupContainer.appendChild(currentPopup);
  }

  function closePopup() {
    if (currentPopup) {
      currentPopup.remove();
      currentPopup = null;
    }
  }

  function setListenerToCloseBtn(callback) {
    callback(currentPopup);
  }

  function setContainer(container) {
    popupContainer = container;
  }

  window.card = {
    show: showPopup,
    close: closePopup,
    setListener: setListenerToCloseBtn,
    setContainer: setContainer
  };
})();
