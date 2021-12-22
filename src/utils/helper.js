import { alphaBet } from "./constant";

export const rad2Ang = (rad) => rad * 180 / Math.PI;

export const ang2Rad = (ang) => ang * Math.PI / 180;

export const getRandomVal = (range) => Math.ceil(Math.random() * 100000000) % range;

export const getMatrixIndexFromFen = (val) => ({
    rowIndex: val[1] - 1,
    colIndex: alphaBet.indexOf(val[0])
});

export const getFenFromMatrixIndex = (rowIndex, colIndex) => alphaBet[ colIndex ] + ( rowIndex + 1 );