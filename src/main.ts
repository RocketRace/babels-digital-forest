import { initialBanners, imageBaseUrl, meterUnits } from '@params';
import { lcg, unlcg } from "./prng"
import { height, totalBanners, width } from './constants';

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
        // this could be funny to write as (?:)(link)
        if (position === 'bottom') {
            banners.append(link);
        } else {
            banners.prepend(link);
        }
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
    lastRow = row - 1n; // will get filled in fill()
    const banners = document.querySelector('#banners')!;
    // make a copy of childNodes as it is updated on removals
    [...banners.childNodes].forEach(child => banners.removeChild(child));
    fill();
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
    const row = n / rowSize;
    currentRow = row;
    const meter = document.querySelector('meter')!;
    // in [0, meterUnits)
    const meterValue = row * BigInt(meterUnits) / totalBanners;
    const value = Number(meterValue);
    meter.value = value;
    
    const percent = document.querySelector<HTMLLabelElement>('#percent')!;
    const ratio = value / meterUnits;
    percent.innerText = `${(ratio * 100).toFixed(6)}%`;
}


const fill = () => {
    const leeway = 800;
    const top = document.querySelector<HTMLDivElement>("#top")!;
    const bottom = document.querySelector<HTMLDivElement>("#bottom")!;
    const main = document.querySelector("main")!;
    const topRows = Math.ceil(
        (leeway + top.getBoundingClientRect().bottom) / height
    );
    const bottomRows = Math.ceil(
        (main.clientHeight + leeway - bottom.getBoundingClientRect().top) / height
    );
    for (let i = 0n; i < topRows && firstRow > 0; i++) {
        firstRow -= 1n;
        spawnRow(firstRow, 'top');
    }
    for (let i = 0n; i < bottomRows && lastRow < totalRows - 1n; i++) {
        lastRow += 1n;
        spawnRow(lastRow, 'bottom');
    }
    setMeter(lastRow * rowSize);
    setVisibilities();
}

// begin main
spawnRow(0n, 'bottom');
fill();
// reset scroll position on load, we will be updating it based on the #frag
history.scrollRestoration = "manual";

let debounced = false;
document.querySelector("main")?.addEventListener('scroll', () => {
    if (!debounced) {
        fill();
        debounced = true;
        setTimeout(() => {
            debounced = false;
            fill();
        }, 100);
    }
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
        window.createImageBitmap(file).then(bitmap => {
            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(bitmap, 0, 0);
            const pixels = ctx.getImageData(0, 0, width, height);
            const hex = ['0x'];
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = y * width + x;
                    const r = pixels.data[i * 4];
                    const g = pixels.data[i * 4 + 1];
                    const b = pixels.data[i * 4 + 2];
                    hex.push(
                        r.toString(16).padStart(2, "0"),
                        g.toString(16).padStart(2, "0"),
                        b.toString(16).padStart(2, "0"),
                    );
                }
            }
            const n = unlcg(BigInt(hex.join('')));
            goto(n);
        })
    }
})
document.querySelector('#scroll')?.addEventListener('click', () => goto(0n));
