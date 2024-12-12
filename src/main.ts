import { initialBanners, imageBaseUrl } from '@params';
const bannersPerPage = BigInt(initialBanners);
import { ainv } from "./constant"

// magic numbers
const imageWidth = 88;
const imageHeight = 31;
const rgbBits = 8 + 8 + 8;
const totalBits = imageWidth * imageHeight * rgbBits;
const totalBanners = 1n << BigInt(totalBits);
const totalPages = totalBanners / bannersPerPage;
// detect bad params
if (totalPages * bannersPerPage !== totalBanners) {
    console.log(`Pick a power of 2 for bannersPerPage, it's ${bannersPerPage}`);
}

const meterUnits = 1n << 16n;

// Global state
let firstLoadedPage = 0n;
let lastLoadedPage = 0n;
let visiblePage = 0n;

// This soup of "doAction()" functions is pretty poor 
// in terms of code architecture but it gets the job done.

const setArticleVisibility = (visibility: boolean) => {
    const article = document.querySelector('article')!;
    article.hidden = !visibility;
}

const loadNewPage = (pageNumber: bigint, position: 'top' | 'bottom') => {
    if (pageNumber === 0n) {
        setArticleVisibility(true);
    }
    const section = document.querySelector('section')!;
    const start = pageNumber * bannersPerPage;
    for (let offset = 0n; offset < bannersPerPage; offset++) {
        const num = start + offset;
        
        const link = document.createElement('a');
        link.href = `${imageBaseUrl}/${num.toString(16)}`;
        link.target = "_blank";
        
        const canvas = document.createElement('canvas');
        canvas.id = `x${num.toString(16)}`;
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        
        link.append(canvas);
        section.append(link);
    }
}

const goToPage = (pageNumber: bigint) => {
    firstLoadedPage = pageNumber;
    lastLoadedPage = pageNumber;
    setMeterPosition(pageNumber);
    setArticleVisibility(pageNumber === 0n);
    const section = document.querySelector('section')!;
    // make a copy of childNodes as it is updated on removals
    [...section.childNodes].forEach(child => section.removeChild(child));
    loadNewPage(pageNumber, 'bottom');
    populatePage(pageNumber);
}


// randomly selected coefficients satisfying the Hull-Dobell theorem
// ~> m, c coprime (m power of 2 and c odd)
// ~> a-1 divisible by prime factors of m (m power of 2 => a odd)
// ~> a-1 divisible by 4 if m divisible by 4 (m divisible by 4 => a = 1 mod 4)
const m = totalBanners;
const a = ((totalBanners - 3n ** 42500n) | 0b11n) ^ 0b10n;
const c = (totalBanners - 5n ** 30000n) | 1n;
// precomputed modular inverse

// basic shorthand
const d = (m - c) * ainv;

const lcg = (n: bigint): bigint => {
    return (n * a + c) % m;
}

// inverse operation
const unlcg = (n: bigint): bigint => {
    return (n * ainv + d) % m;
}

const populateCanvas = (n: bigint) => {
    const id = `#x${n.toString(16)}`
    const canvas = document.querySelector<HTMLCanvasElement>(id)!;
    const ctx = canvas.getContext('2d')!;
    let bits = lcg(n);
    // I'm using a hex string as a u8 buffer
    let hex = bits.toString(16);
    const data = ctx.createImageData(imageWidth, imageHeight);
    for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
            const i = y * imageWidth + x;
            data.data[i * 4] = parseInt(hex.substring(i * 6, i * 6 + 2), 16);
            data.data[i * 4 + 1] = parseInt(hex.substring(i * 6 + 2, i * 6 + 4), 16);
            data.data[i * 4 + 2] = parseInt(hex.substring(i * 6 + 4, i * 6 + 6), 16);
            data.data[i * 4 + 3] = 0xff;
        }
    }
    ctx.putImageData(data, 0, 0);
}

const populatePage = (page: bigint) => {
    // something weird scope-related
    for (let i = 0n; i < bannersPerPage; i++) {
        populateCanvas(page * bannersPerPage + i);
    }
}

const setMeterPosition = (page: bigint) => {
    visiblePage = page;
    const meter = document.querySelector('meter')!;
    // visiblePage / totalPages is in [0, meterUnits)
    const meterValue = visiblePage * meterUnits / totalPages;
    console.log(meterValue);
    meter.value = Number(meterValue);
}

populatePage(0n);

const bottomObserver = new IntersectionObserver(
    a => console.log(a),
    {
        root: document.querySelector('main'),
        threshold: 0.5,
    }
)

const bottom = document.querySelector('#bottom')!;
bottomObserver.observe(bottom);


document.addEventListener('scroll', () => {
    // if (window.scrollY === 0) {
    //     if (firstLoadedPage !== 0n) {
    //         firstLoadedPage -= 1n;
    //         loadNewPage(firstLoadedPage, "top");
    //         populatePage(firstLoadedPage);
    //         setMeterPosition(firstLoadedPage);
    //     }
    // } else if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
    //     if (lastLoadedPage !== totalPages - 1n) {
    //         lastLoadedPage += 1n;
    //         loadNewPage(lastLoadedPage, "bottom");
    //         populatePage(lastLoadedPage);
    //         setMeterPosition(lastLoadedPage);
    //     }
    // } else {
    //     // rough approximation, the precision doesn't matter much
    // }    
})
document.querySelector('#top')?.addEventListener('click', () => goToPage(0n));
document.querySelector('#jump')?.addEventListener('click', () => {
    const goto = document.querySelector<HTMLInputElement>('#goto')!;
    const value = BigInt(goto.value);
    if (value >= totalBanners) {
        // invalid
        console.log("kissa");
    } else {
        const selectedPage = BigInt(goto.value) / bannersPerPage;
        goToPage(selectedPage);
    }
})
document.querySelector('#jump')?.addEventListener('click',  () => {
    const input = document.querySelector<HTMLInputElement>('#image')!;
    const file = input.files ? input.files[0] : null;
    if (file) {
        console.log(file.name);
    }
})
