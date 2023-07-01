const duration = 8; // seconds

const indexPath = "images/index.txt";
const imagesPath = "images/";

Array.prototype.randomize = function () {
  var i = this.length,
    j,
    temp;
  if (i > 1 && (i > 2 || Math.random() > 0.5)) {
    while (--i) {
      j = Math.floor(Math.random() * i);
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
  }
};

const reloadImages = async function () {
  const response = await fetch(indexPath);
  const list = await response.text();
  const images = list.split("\n").filter((line) => line.trim().length > 0);
  displayImages(images);
};

const displayImages = function (images) {
  images.randomize();
  preloadImages(images);
  iterateImages(images, 0);
};

const iterateImages = function (images, i) {
  if (i < images.length) {
    showImage(images[i]);
    setTimeout(() => iterateImages(images, i + 1), duration * 1000);
  } else {
    reloadImages();
  }
};

const preloadImages = function (images) {
  images.forEach((image) => {
    var img = new Image();
    img.src = imagesPath + image;
  });
};

const showImage = function (image) {
  document.getElementById("image").setAttribute("src", imagesPath + image);
};

document.addEventListener("DOMContentLoaded", (_) => reloadImages());
