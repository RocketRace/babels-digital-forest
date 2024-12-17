"use strict";
const width = 88;
const height = 31;
const totalBits = width * height * (8 + 8 + 8);
const totalBanners = 1n << BigInt(totalBits);
