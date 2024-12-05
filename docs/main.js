"use strict";
(() => {
  // ns-params:@params
  var bannersPerPage = 256;

  // <stdin>
  var imageHeight = 31n;
  var rgbBits = 8n + 8n + 8n;
  var totalBanners = 1n << imageHeight * imageHeight * rgbBits;
  var totalPages = totalBanners / bannersPerPage;
  if (totalPages * bannersPerPage !== totalBanners) {
    console.log(`Pick a power of 2 for bannersPerPage, it's ${bannersPerPage}`);
  }
  document.addEventListener("scroll", (event) => {
    console.log("scroll event", window.scrollY, event);
  });
})();
