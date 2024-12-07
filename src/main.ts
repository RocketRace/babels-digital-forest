import { bannersPerPage as bannersPerPageN, pageBaseUrl, imageBaseUrl } from '@params';
const bannersPerPage = BigInt(bannersPerPageN);

// Dynamic scroll experiment
const imageWidth = 88;
const imageHeight = 31;
const rgbBits = 8 + 8 + 8;
const totalBits = imageHeight * imageHeight * rgbBits;
const totalBanners = 1n << BigInt(totalBits);
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

const populateCanvas = (n: bigint) => {
    const canvas = document.querySelector<HTMLCanvasElement>(`#n${n}`);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const data = ctx.createImageData(imageWidth, imageHeight);
            for (let x = 0; x < imageWidth; x++) {
                for (let y = 0; y < imageHeight; y++) {
                    const i = y * imageWidth + x;
                    // Currently, there's no proper algorithm.
                    // Slightly annoying for the code to be 
                    // duplicated across repositories.
                    const rgb = Math.floor(Math.random() * 0x1000000);
                    data.data[i * 4] = rgb >> 16;
                    data.data[i * 4 + 1] = (rgb >> 8) & 0xff;
                    data.data[i * 4 + 2] = rgb & 0xff;
                    data.data[i * 4 + 3] = 0xff;
                }
            }
            ctx.putImageData(data, 0, 0);
        }
    }
}

const populatePage = (page: bigint) => {
    // something weird scope-related
    for (let i = 0n; i < bannersPerPage; i++) {
        populateCanvas(page * bannersPerPage + i);
    }
}

populatePage(0n);

// Debugging events
document.addEventListener('scroll', event => {
    console.log('scroll event', window.scrollY, document.body.clientHeight, event);
})