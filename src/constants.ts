const width = 88;
const height = 31;
const totalBits = width * height * (8 + 8 + 8);
const totalBanners = 1n << BigInt(totalBits);
// randomly selected coefficients satisfying the Hull-Dobell theorem
// ~> m (= totalBanners), c coprime (m power of 2 and c odd)
// ~> a-1 divisible by prime factors of m (m power of 2 => a odd)
// ~> a-1 divisible by 4 if m divisible by 4 (m divisible by 4 => a = 1 mod 4)
const a = ((totalBanners - 3n ** 41308n) | 0b11n) ^ 0b10n;
const c = ((totalBanners - 5n ** 28195n)) | 1n;
