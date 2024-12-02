const container = document.querySelector('main');
if (container) {
    for (let i = 0; i < 1000; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', `http://localhost:3000/img/${i}`)
        container.appendChild(img);
    }
}

const events = ['wheel', 'scroll', 'scrollend', 'touchstart', 'touchend', 'touchmove'];

events.forEach(str => {
    document.addEventListener(str, e => console.log(`${str} event`, e))
})
