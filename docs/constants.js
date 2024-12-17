export const width = 88;
export const height = 31;
export const totalBits = width * height * (8 + 8 + 8);
export const totalBanners = 1n << BigInt(totalBits);
