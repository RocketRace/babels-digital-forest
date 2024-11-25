"use strict";
const container = document.querySelector('#container');
if (container) {
    for (let i = 0; i < 1000; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', `http://localhost:3000/img/${i}`);
        container.appendChild(img);
    }
}
