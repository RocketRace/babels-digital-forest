"use strict";
(() => {
  // ns-params:@params
  var bannersPerPage = 256;

  // <stdin>
  var bannersPerPage2 = BigInt(bannersPerPage);
  var imageWidth = 88;
  var imageHeight = 31;
  var rgbBits = 8 + 8 + 8;
  var totalBits = imageHeight * imageHeight * rgbBits;
  var totalBanners = 1n << BigInt(totalBits);
  var totalPages = totalBanners / bannersPerPage2;
  if (totalPages * bannersPerPage2 !== totalBanners) {
    console.log(`Pick a power of 2 for bannersPerPage, it's ${bannersPerPage2}`);
  }
  var populateCanvas = (n) => {
    const canvas = document.querySelector(`#n${n}`);
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = ctx.createImageData(imageWidth, imageHeight);
        for (let x = 0; x < imageWidth; x++) {
          for (let y = 0; y < imageHeight; y++) {
            const i = y * imageWidth + x;
            const rgb = Math.floor(Math.random() * 16777216);
            data.data[i * 4] = rgb >> 16;
            data.data[i * 4 + 1] = rgb >> 8 & 255;
            data.data[i * 4 + 2] = rgb & 255;
            data.data[i * 4 + 3] = 255;
          }
        }
        ctx.putImageData(data, 0, 0);
      }
    }
  };
  var populatePage = (page) => {
    for (let i = 0n; i < bannersPerPage2; i++) {
      populateCanvas(page * bannersPerPage2 + i);
    }
  };
  populatePage(0n);
  document.addEventListener("scroll", (event) => {
    console.log("scroll event", window.scrollY, document.body.clientHeight, event);
  });
})();
