'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var previewImage = photoContainer.querySelector('.ad-form__photo');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');
  var defaultAvatar = preview.src;
  var photos = [];

  function showPhoto(inputFile, callback) {
    var file = inputFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        callback(reader.result);
      });

      reader.readAsDataURL(file);
    }
  }

  function setAvatarLink(link) {
    preview.src = link;
  }

  function createNewImg(link) {
    var img = document.createElement('img');
    img.classList.add('ad-form__photo-image');
    img.width = 70;
    img.height = 70;
    img.alt = 'Фото жилья';
    img.src = link;
    img.draggable = false;
    return img;
  }

  function resetPhoto() {
    if (photos) {
      photos.forEach(function (photo) {
        photo.remove();
      });
    }
    photos = [];
    preview.src = defaultAvatar;
  }

  function createNewPhoto(link) {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    div.draggable = true;
    var img = createNewImg(link);
    div.appendChild(img);
    if (!previewImage) {
      previewImage = document.createElement('div');
      previewImage.classList.add('ad-form__photo');
      photoContainer.appendChild(previewImage);
    }
    photos.push(div);
    photoContainer.insertBefore(div, previewImage);
  }

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, preventDefaults, false);
    photoDropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  avatarDropZone.addEventListener('drop', function (event) {
    showPhoto(event.dataTransfer, setAvatarLink);
  });

  photoDropZone.addEventListener('drop', function (event) {
    showPhoto(event.dataTransfer, createNewPhoto);
  });

  avatarDropZone.addEventListener('mouseenter', function () {
    avatarDropZone.classList.add('highlight');
  });

  avatarDropZone.addEventListener('mouseleave', function () {
    avatarDropZone.classList.remove('highlight');
  });

  photoDropZone.addEventListener('mouseenter', function () {
    photoDropZone.classList.add('highlight');
  });

  photoDropZone.addEventListener('mouseleave', function () {
    photoDropZone.classList.remove('highlight');
  });

  fileChooserPhoto.addEventListener('change', function () {
    showPhoto(fileChooserPhoto, createNewPhoto);
  });

  fileChooserAvatar.addEventListener('change', function () {
    showPhoto(fileChooserAvatar, setAvatarLink);
  });

  // перетаскивание

  function isPhotoMoved(element) {
    var rect = element.getBoundingClientRect();
    return (element.clientX - rect.left) / (rect.right - rect.left) > 0.5;
  }

  var moveElement;

  function onDragOver(evt) {
    evt.preventDefault();
    var target = evt.target;
    var element = target.closest('.ad-form__photo');
    if (element) {
      photoContainer.insertBefore(moveElement, isPhotoMoved(element) && element.nextSibling || element);
    }
  }

  function onDragEnd(evt) {
    evt.preventDefault();
    photoContainer.removeEventListener('dragover', onDragOver);
    photoContainer.removeEventListener('dragend', onDragEnd);
  }

  function onDragStart(evt) {
    var target = evt.target;
    var element = target.closest('.ad-form__photo');
    if (element) {
      moveElement = element;
      evt.dataTransfer.setData('text/html', moveElement.textContent);
      photoContainer.addEventListener('dragover', onDragOver);
      photoContainer.addEventListener('dragend', onDragEnd);
    }
  }

  photoContainer.addEventListener('dragstart', onDragStart);

  window.photo = {
    resetPhoto: resetPhoto
  };
})();
