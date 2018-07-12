'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo');
  var photoUpload = document.querySelector('.ad-form__upload input[type=file]');
  var defaultAvatar = preview.src;

  function showPhoto(inputFile, inputPhoto) {
    var file = inputFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        inputPhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function createNewImg() {
    var img = document.createElement('img');
    img.classList.add('ad-form__photo-image');
    img.width = 70;
    img.height = 70;
    img.alt = 'Фото жилья';
    return img;
  }

  function resetPhoto() {
    photoContainer.innerHTML = ('');
    preview.src = defaultAvatar;
  }


  function addHousePhoto() {
    var newPhoto = createNewImg();
    photoContainer.appendChild(newPhoto);
    showPhoto(photoUpload, newPhoto);
  }

  photoUpload.addEventListener('change', function () {
    addHousePhoto();
  });

  fileChooser.addEventListener('change', function () {
    showPhoto(fileChooser, preview);
  });

  window.photo = {
    resetPhoto: resetPhoto
  };
})();
