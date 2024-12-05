import { bannersPerPage, pageBaseUrl, imageBaseUrl } from '@params';

// Dynamic scroll experiment
const imageWidth = 88n;
const imageHeight = 31n;
const rgbBits = 8n + 8n + 8n;
const totalBanners = 1n << (imageHeight * imageHeight * rgbBits);
const totalPages = totalBanners / bannersPerPage;
// detect bad params
if (totalPages * bannersPerPage !== totalBanners) {
    console.log(`Pick a power of 2 for bannersPerPage, it's ${bannersPerPage}`);
}

// Global state
let currentPage = 0n;
let firstLoadedPage = 0n;
let lastLoadedPage = 0n;

const loadNewPage = (pageNumber: bigint, position: 'before' | 'after') => {
    const section = document.querySelector('section');
    if (section) {
        for (let offset = 0n; offset < bannersPerPage; offset++) {
            const num = pageNumber * bannersPerPage + offset;
            
            const link = document.createElement('a');
            link.setAttribute('href', `${pageBaseUrl}#${num}`);
            link.setAttribute('id', num.toString());
            
            const img = document.createElement('img');
            img.setAttribute('src', `${imageBaseUrl}/${num}`);
            img.setAttribute('width', imageWidth.toString());
            img.setAttribute('height', imageHeight.toString());
            img.setAttribute('loading', 'lazy');
            
            link.append(img);
            section.append(link);
        }
    }
}

// loadNewPage(1n, 'after');

// Debugging events
document.addEventListener('scroll', event => {
    console.log('scroll event', window.scrollY, event);
})