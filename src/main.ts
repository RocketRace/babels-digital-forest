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

const setVisibilities = () => {
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

const leewayPixels = 800;

const spawnableRows = (q: string): number => {
    const e = document.querySelector<HTMLDivElement>(q)!;
    const rect = e.getBoundingClientRect();
    const main = document.querySelector("main")!;
    // overestimation, fine
    return Math.ceil((main.clientHeight + leewayPixels - rect.top) / height);
}

const fillBottom = () => {
    const rows = spawnableRows("#bottom");
    for (let i = 0n; i < rows && lastRow < totalRows - 1n; i++) {
        lastRow += 1n;
        spawnRow(lastRow, 'bottom');
    }   
    setMeter(lastRow);
    setVisibilities();
}

// begin main
spawnRow(0n, 'bottom');
fillBottom();
// reset scroll position on load, we will be updating it based on the #frag
history.scrollRestoration = "manual";
  

let debounced = false;
document.querySelector("main")?.addEventListener('scroll', () => {
    if (!debounced) {
        fillBottom();
        debounced = true;
        setTimeout(() => {
            debounced = false;
            fillBottom();
        }, 100);
    }
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