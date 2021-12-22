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

export const ambientLightProps = {
    color: 0xffffff,
    intensity: 1,
}

export const spotLightProps = {
    color: 0xffffff,
    intensity: 0.3,
    position: {
        x: 100,
        y: 1000,
        z: 100,
    },
    castShadow: true,
    shadow: {
        mapSize: {
            width: 1024,
            height: 1024,
        },
        camera: {
            near: 0.1,
            far: 1000,
            fov: 30,
        }
    }
}

export const aiLevel = 0;   // 3: advanced Up to 3;

export const alphaBet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const tileSize = 1;

export const lightTone = '#f7e58f';
export const darkTone = '#123';
export const selectTone = '#d78b00';
export const historyTone = '#d32da7';
export const dangerTone = '#ff0000';

export const boardSize = 8;

export const modelProps = {
    'board': {
        scale: 0.8,
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
}