"use strict";
export const toGrayscale = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        let r = RGBVal[i];
        let g = RGBVal[i + 1];
        let b = RGBVal[i + 2];

        let gray = (r + g + b) / 3;
        newRGBVal[i] = gray;
        newRGBVal[i + 1] = gray;
        newRGBVal[i + 2] = gray;
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const toWarm = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        newRGBVal[i] = trucate(RGBVal[i] + value);
        newRGBVal[i + 1] = RGBVal[i + 1];
        newRGBVal[i + 2] = RGBVal[i + 2];
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const toCool = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        newRGBVal[i] = RGBVal[i];
        newRGBVal[i + 1] = RGBVal[i + 1];
        newRGBVal[i + 2] = trucate(RGBVal[i + 2] + value);
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const brightness = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        newRGBVal[i] = trucate(RGBVal[i] + value);
        newRGBVal[i + 1] = trucate(RGBVal[i + 1] + value);
        newRGBVal[i + 2] = trucate(RGBVal[i + 2] + value);
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const toWeightedGrayscale = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        let r = RGBVal[i];
        let g = RGBVal[i + 1];
        let b = RGBVal[i + 2];

        let gray = 0.3 * r + 0.59 * g + 0.11 * b;
        newRGBVal[i] = gray;
        newRGBVal[i + 1] = gray;
        newRGBVal[i + 2] = gray;
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const toBlackWhite = (imageData) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);

    let newRGBVal = newImageData.data;
    for (let i = 0; i < RGBVal.length; i += 4) {
        let avg = (RGBVal[i] + RGBVal[i + 1] + RGBVal[i + 2]) / 3;
        if (avg > 100) {
            newRGBVal[i] = 255;
            newRGBVal[i + 1] = 255;
            newRGBVal[i + 2] = 255;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else {
            newRGBVal[i] = 0;
            newRGBVal[i + 1] = 0;
            newRGBVal[i + 2] = 0;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
    }
    return newImageData;
}

const trucate = (value) => Math.min(255, Math.max(0, value));

const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const variance = (arr) => {

    let m = mean(arr);

    let s = arr.reduce((a, b) => a + (b - m) * (b - m)) / arr.length;

    return s;
}