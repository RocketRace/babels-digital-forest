"use strict";
const meterUnits = 1n << 52n;
const getRowSize = () => BigInt(Math.floor((document.querySelector("#loader")
    .getBoundingClientRect().width - 32) / (width + 2 * 4)
//            WARNING: relies on CSS ^^             ^^^^^
));
// Global state
let rowSize = getRowSize();
const totalRows = () => (totalBanners + rowSize - 1n) / rowSize; // Ceiling division
let firstRow = 0n;
let lastRow = 0n;
let currentValue = 0n;
const spawnRow = (row, position) => {
    const links = [];
    for (let i = 0n; i < rowSize; i++) {
        const n = row * rowSize + i;
        if (n >= totalBanners) {
            break;
        }
        const link = document.createElement('a');
        const hex = `x${n.toString(16)}`;
        link.href = `./#${hex}`;
        const canvas = document.createElement('canvas');
        canvas.id = hex;
        canvas.width = width;
        canvas.height = height;
        link.append(canvas);
        links.push(link);
        // this could be funny to write as (?:)(link)
    }
    const banners = document.querySelector('#banners');
    if (position === 'bottom') {
        banners.append(...links);
    }
    else {
        banners.prepend(...links);
    }
};
const setVisibilities = () => {
    document.querySelector('article').hidden = firstRow !== 0n;
    document.querySelector('#top').hidden = firstRow === 0n;
    document.querySelector('#bottom').hidden = lastRow === totalRows() - 1n;
};
const goto = (n, overrideFocus) => {
    currentValue = n;
    const row = n / rowSize;
    firstRow = row;
    lastRow = row - 1n;
    const banners = document.querySelector('#banners');
    // make a copy of childNodes as it is updated on removals
    [...banners.childNodes].forEach(child => banners.removeChild(child));
    fill();
    const focus = overrideFocus ?? (document.activeElement !== null);
    if (focus && n !== 0n) {
        const hash = `#x${n.toString(16)}`;
        const canvas = document.querySelector(hash);
        if (canvas) {
            canvas.parentElement.focus();
        }
        location.hash = hash;
    }
    else {
        document.activeElement?.blur();
        location.hash = "";
    }
};
const setMeter = (n) => {
    const meter = document.querySelector('meter');
    // in [0, meterUnits)
    const meterValue = n * meterUnits / totalBanners;
    const value = Number(meterValue);
    meter.value = value;
    meter.max = Number(meterUnits);
    const percent = document.querySelector('#percent');
    const ratio = value / Number(meterUnits);
    percent.innerText = `${(ratio * 100).toFixed(13)}%`;
};
const fill = () => {
    const leeway = 1600;
    const top = document.querySelector("#top");
    const bottom = document.querySelector("#bottom");
    const main = document.querySelector("main");
    const topRows = Math.ceil((leeway + top.getBoundingClientRect().bottom) / height);
    const bottomRows = Math.ceil((main.clientHeight + leeway - bottom.getBoundingClientRect().top) / height);
    const oldLast = lastRow;
    for (let i = 0n; i < bottomRows && lastRow < totalRows() - 1n; i++) {
        lastRow += 1n;
        spawnRow(lastRow, 'bottom');
    }
    const oldHeight = document.querySelector('#banners').clientHeight;
    const oldFirst = firstRow;
    for (let i = 0n; i < topRows && firstRow > 0; i++) {
        firstRow -= 1n;
        spawnRow(firstRow, 'top');
    }
    const lastCount = Number((lastRow - oldLast) * rowSize);
    if (lastCount > 0) {
        worker.postMessage({
            first: (oldLast + 1n) * rowSize,
            count: lastCount
        });
    }
    const firstCount = Number((oldFirst - firstRow) * rowSize);
    if (firstCount > 0) {
        worker.postMessage({
            first: firstRow * rowSize,
            count: firstCount
        });
    }
    const toScroll = topRows > 0
        ? document.querySelector('#banners').clientHeight - oldHeight
        : 0;
    setMeter(lastRow * rowSize);
    setVisibilities();
    if (toScroll > 0) {
        const main = document.querySelector("main");
        // only scroll if we're locked to the top of the screen
        if (main.scrollTop === 0) {
            main.scrollBy(0, toScroll);
        }
    }
};
// worker thread for less freezing
const worker = new Worker("./worker.js");
worker.onmessage = (e) => {
    const results = e.data;
    results.forEach(({ id, bitmap }) => {
        const canvas = document.querySelector(id);
        if (canvas === null) {
            // The canvases were unloaded while the worker was running
            // this does mean that all the computation still runs, only
            // that it's discarded afterwards
            return;
        }
        const ctx = canvas.getContext("bitmaprenderer");
        ctx.transferFromImageBitmap(bitmap);
    });
};
worker.onerror = (e) => console.log("oops", e);
// begin main
if (location.hash.startsWith("#")) {
    goto(BigInt("0" + location.hash.slice(1)), true);
}
else {
    goto(0n, false);
}
window.onhashchange = () => {
    if (location.hash) {
        const canvas = document.querySelector(location.hash);
        if (canvas) {
            canvas.parentElement.focus();
            // align the outline a bit better
            document.querySelector("main")?.scrollBy(0, -8);
        }
    }
};
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
    const pos = document.querySelector("main").scrollTop;
    const offset = document.querySelector("article").getBoundingClientRect().height;
    const clamped = Math.max(0, pos - offset);
    const roughDelta = BigInt(Math.floor(clamped / (height + 8)));
    //                               WARNING: reliant on CSS ^
    currentValue = (firstRow + roughDelta) * rowSize;
});
window.addEventListener('resize', () => {
    const oldRowSize = rowSize;
    rowSize = getRowSize();
    if (oldRowSize !== rowSize) {
        goto(currentValue);
    }
});
document.querySelector("meter")?.addEventListener('click', e => {
    const meter = document.querySelector("meter");
    const px = (e.clientX - meter.offsetLeft) / meter.clientWidth;
    if (px === 1) {
        goto(totalBanners - 1n);
    }
    else if (px === 0) {
        goto(0n);
    }
    else {
        const n = BigInt(Math.round(px * 2 ** 52));
        // some shuffling because otherwise you see #0 everywhere lol
        goto((n * totalBanners >> 52n) + 3n ** 32n);
    }
    console.log(px);
});
document.querySelector('#jump')?.addEventListener('click', () => {
    const target = document.querySelector('#goto');
    const value = BigInt(target.value);
    if (value >= totalBanners) {
        // invalid
        console.log("kissa");
    }
    else {
        goto(value, true);
    }
});
document.querySelector('#search')?.addEventListener('click', () => {
    const input = document.querySelector('#image');
    const file = input.files ? input.files[0] : null;
    if (file) {
        window.createImageBitmap(file).then(bitmap => {
            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(bitmap, 0, 0);
            const pixels = ctx.getImageData(0, 0, width, height);
            const hex = ['0x'];
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = y * width + x;
                    const r = pixels.data[i * 4];
                    const g = pixels.data[i * 4 + 1];
                    const b = pixels.data[i * 4 + 2];
                    hex.push(r.toString(16).padStart(2, "0"), g.toString(16).padStart(2, "0"), b.toString(16).padStart(2, "0"));
                }
            }
            const n = unlcg(BigInt(hex.join('')));
            goto(n, true);
        });
    }
});
document.querySelector('#scroll')?.addEventListener('click', () => goto(0n, false));
document.querySelector('#random')?.addEventListener('click', () => {
    const buffer = new Uint8Array(totalBits / 8);
    crypto.getRandomValues(buffer);
    const list = [...buffer].map(byte => byte.toString(16).padStart(2, "0"));
    const n = BigInt("0x" + list.join(""));
    goto(n, true);
});
document.querySelector('#relax')?.addEventListener('click', () => {
    const footer = document.querySelector("footer");
    footer.classList.add("relaxed");
    setTimeout(() => {
        footer.querySelectorAll("input, button").forEach(element => element.disabled = true);
        const stop = () => {
            footer.classList.remove("relaxed");
            footer.classList.add("woken");
            footer.querySelectorAll("input, button").forEach(element => element.disabled = false);
            document.removeEventListener('click', stop);
            document.removeEventListener('keydown', stop);
            halting = true;
            setTimeout(() => {
                footer.classList.remove("woken");
            }, 1000);
        };
        document.addEventListener('click', stop);
        document.addEventListener('keydown', stop);
    }, 100);
    let halting = false;
    let px = 1;
    const scroller = () => {
        document.querySelector("main").scrollBy({
            top: px,
            behavior: "instant",
        });
        if (halting) {
            px -= 0.1;
        }
        else if (px < 4) {
            px += 0.1;
        }
        else {
            px = 4; // rounded for convenience
        }
        if (px > 0) {
            requestAnimationFrame(scroller);
        }
    };
    scroller();
});
