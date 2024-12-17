importScripts("./constants.js", "./prng.js");

const generateImageData = (n: bigint) => {
    let bits = lcg(n);
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
}

onmessage = (e) => {
    const n = e.data as bigint;
    const result = [n, generateImageData(n)];
    postMessage(result)
}