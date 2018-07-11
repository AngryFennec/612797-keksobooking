'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo');
  var photoUpload = document.querySelector('.ad-form__upload input[type=file]');

  function onPhotoUpload(inputFile, inputPhoto) {
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

  function onHousePhotoUpload() {
    var newPhoto = document.createElement('img');
    newPhoto.classList.add('ad-form__photo-image');
    newPhoto.width = 70;
    newPhoto.height = 70;
    newPhoto.alt = 'Фото жилья';
    photoContainer.appendChild(newPhoto);
    onPhotoUpload(photoUpload, newPhoto);
  }

  photoUpload.addEventListener('change', function () {
    onHousePhotoUpload();
  });

  fileChooser.addEventListener('change', function () {
    onPhotoUpload(fileChooser, preview);
  });
})();
