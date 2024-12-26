"use strict";
importScripts('./constants.js');
const render = (first, count) => {
    let bits = BigInt.asUintN(totalBits, (first + offset) * a + c);
    const results = [];
    for (let i = 0n; i < count; i++) {
        const n = first + i;
        // I'm using a hex string as a u8 buffer
        let hex = bits.toString(16);
        const data = new ImageData(width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = y * width + x;
                const rgb = parseInt(hex.substring(i * 6, i * 6 + 6), 16);
                data.data[i * 4] = rgb >> 16;
                data.data[i * 4 + 1] = (rgb >> 8) & 0xff;
                data.data[i * 4 + 2] = rgb & 0xff;
                data.data[i * 4 + 3] = 0xff;
            }
        }
        const id = `#x${n.toString(16)}`;
        results.push({ id: id, data: data });
        bits = BigInt.asUintN(totalBits, bits + a);
    }
    return results;
};
onmessage = (e) => {
    const { first, count } = e.data;
    postMessage(render(first, count));
};
