import { alphaBet, tileSize } from "./constant";

export const rad2Ang = (rad) => rad * 180 / Math.PI;

export const ang2Rad = (ang) => ang * Math.PI / 180;

export const getRandomVal = (range) => Math.ceil(Math.random() * 100000000) % range;

export const getMatrixIndexFromFen = (val) => ({
    rowIndex: val[1] - 1,
    colIndex: alphaBet.indexOf(val[0])
});

export const getFenFromMatrixIndex = (rowIndex, colIndex) => alphaBet[ colIndex ] + ( rowIndex + 1 );

export const isSamePoint = (point1, point2) => point1.x === point2.x && point1.y === point2.y && point1.z === point2.z;

export const getMeshPosition = (rowIndex, colIndex) => ({
    x: colIndex * tileSize - tileSize * 3.5,
    y: 0.6,
    z: -(rowIndex * tileSize - tileSize * 3.5)
})