export const rad2Ang = (rad) => rad * 180 / Math.PI;

export const ang2Rad = (ang) => ang * Math.PI / 180;

export const getRandomVal = (range) => Math.ceil(Math.random() * 100000000) % range;