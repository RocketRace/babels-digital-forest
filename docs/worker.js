"use strict";
importScripts("./constants.js");
const lcg = (n) => {
    return BigInt.asUintN(totalBits, n * a + c);
};
const lcgMulti = (n, count) => {
    let x = lcg(n);
    const nums = [x];
    for (let i = 1n; i < count; i++) {
        x = BigInt.asUintN(totalBits, x + a);
        nums.push(x);
    }
    return nums;
};
const generateImageData = (n, count) => {
    let nums = lcgMulti(n, count);
    return nums.map(bits => {
        // I'm using a hex string as a u8 buffer
        let hex = bits.toString(16);
        const data = new ImageData(width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = y * width + x;
                data.data[i * 4] = parseInt(hex.substring(i * 6, i * 6 + 2), 16);
                data.data[i * 4 + 1] = parseInt(hex.substring(i * 6 + 2, i * 6 + 4), 16);
                data.data[i * 4 + 2] = parseInt(hex.substring(i * 6 + 4, i * 6 + 6), 16);
                data.data[i * 4 + 3] = 0xff;
            }
        }
        return data;
    });
};
onmessage = (e) => {
    const { n, count } = e.data;
    postMessage({ n: n, nums: generateImageData(n, count) });
};
