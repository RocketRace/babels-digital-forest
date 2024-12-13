import { initialBanners, imageBaseUrl } from '@params';
import { lcg } from "./prng"
import { height, totalBanners, width } from './constants';

const meterUnits = 1n << 16n;

// Global state
let rowSize = 5n;
// Integer division rounding up
let totalRows = (totalBanners + rowSize - 1n) / rowSize
let firstRow = 0n;
let lastRow = 0n;
let currentRow = 0n;

const spawnRow = (row: bigint, position: 'top' | 'bottom') => {
    for (let i = 0n; i < rowSize; i++) {
        const n = row * rowSize + i;
        const banners = document.querySelector('#banners')!;
        const link = document.createElement('a');
        link.href = `${imageBaseUrl}/${n.toString(16)}`;
        link.target = "_blank";
        
        const canvas = document.createElement('canvas');
        canvas.id = `x${n.toString(16)}`;
        canvas.width = width;
        canvas.height = height;
        
        link.append(canvas);
        banners.append(link)
        render(n);
    }
}

const setVisibility = () => {
    document.querySelector('article')!.hidden = firstRow !== 0n;
    document.querySelector<HTMLInputElement>('#top')!.hidden = firstRow === 0n;
    document.querySelector<HTMLInputElement>('#bottom')!.hidden = lastRow === totalRows - 1n;
}

const goto = (n: bigint) => {
    const row = n / rowSize;
    firstRow = row;
    lastRow = row - 1n; // will get filled in fillBottom()
    const banners = document.querySelector('#banners')!;
    // make a copy of childNodes as it is updated on removals
    [...banners.childNodes].forEach(child => banners.removeChild(child));
    fillBottom();
}

const render = (n: bigint) => {
    const id = `#x${n.toString(16)}`
    const canvas = document.querySelector<HTMLCanvasElement>(id)!;
    const ctx = canvas.getContext('2d')!;
    let bits = lcg(n);
    // I'm using a hex string as a u8 buffer
    let hex = bits.toString(16);
    const data = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = y * width + x;
            data.data[i * 4] = parseInt(hex.substring(i * 6, i * 6 + 2), 16);
            data.data[i * 4 + 1] = parseInt(hex.substring(i * 6 + 2, i * 6 + 4), 16);
            data.data[i * 4 + 2] = parseInt(hex.substring(i * 6 + 4, i * 6 + 6), 16);
            data.data[i * 4 + 3] = 0xff;
        }
    }
    ctx.putImageData(data, 0, 0);
}

const setMeter = (n: bigint) => {
    currentRow = n
    const meter = document.querySelector('meter')!;
    // in [0, meterUnits)
    const meterValue = n * meterUnits / totalBanners;
    meter.value = Number(meterValue);
}

// yeah... using both getBoundingClientRect() and IntersectionObserver together
const inViewport = (e: Element): boolean => {
    let rect = e.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

const fillBottom = () => {
    const bottom = document.querySelector<HTMLInputElement>('#bottom')!;
    do {
        lastRow += 1n;
        spawnRow(lastRow, 'bottom');
        setMeter(lastRow);
        setVisibility();
        
    } while (inViewport(bottom) && lastRow < totalRows - 1n);
}

// begin main
spawnRow(0n, 'bottom');

const bottomObserver = new IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            const bottom = document.querySelector<HTMLInputElement>('#bottom')!;
            setVisibility();
            fillBottom();
        }
    },
    { root: document.querySelector('main') }
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
document.querySelector('#jump')?.addEventListener('click', () => {
    const target = document.querySelector<HTMLInputElement>('#goto')!;
    const value = BigInt(target.value);
    if (value >= totalBanners) {
        // invalid
        console.log("kissa");
    } else {
        goto(value);
    }
})
document.querySelector('#search')?.addEventListener('click',  () => {
    const input = document.querySelector<HTMLInputElement>('#image')!;
    const file = input.files ? input.files[0] : null;
    if (file) {
        console.log(file.name);
    }
})
document.querySelector('#scroll')?.addEventListener('click', () => goto(0n));

