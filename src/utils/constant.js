import { ang2Rad } from "./helper";

export const cameraProps = {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    position: {
        x: 0,
        y: 8,
        z: 5,
    }
}

export const orbitControlProps = {
    target: {
        x: 0,
        y: 0.5,
        z: 0,
    },
    maxPolarAngle: ang2Rad(70),
    maxDistance: 6.5,
    minDistance: 5,
}

export const bloomParams = {
    exposure: 1,
    bloomStrength: 0.25,
    bloomThreshold: 0,
    bloomRadius: 0.1
};

export const hemiLightProps = {
    skyColor: 0xffdacf,
    groundColor: 0x000000,
    intensity: 2,
}

export const spotLightProps = {
    color: 0xffa68a,
    intensity: 2,
    position: {
        x: -25,
        y: 25,
        z: 25,
    },
    castShadow: true,
    shadow: {
        bias: -0.0001,
        mapSize: {
            width: 1024 * 4,
            height: 1024 * 4,
        }
    }
}

export const pieceMoveSpeed = 10;

export const aiLevel = 3;   // 3: advanced Up to 3;

export const alphaBet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const tileSize = 1;

export const lightTone = '#f7e58f';
export const darkTone = '#123';
export const selectTone = '#d78b00';
export const historyTone = '#d32da7';
export const dangerTone = '#ff0000';

export const boardSize = 8;

export const modelSize = 0.8;

export const modelProps = {
    'mountain': {
        scale: 1.2,
        position: {
            x: 16,
            y: 0,
            z: 5,
        },
        rotate: {
            x: 0,
            y: 10,
            z: 0,
        }
    },
    'board': {
        scale: modelSize,
        position: {
            x: 0.45,
            y: 0,
            z: -0.65,
        }
    }
}

export const gameModes = {
    'P2E': 0,
    'P2P': 1,
    'practise': 2
}

export const userTypes = {
    'creator': 0,
    'joiner': 1,
    'observer': 2,
}

export const resizeUpdateInterval = 500;