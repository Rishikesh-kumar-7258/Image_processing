"use strict";

export const toGrayScale = (imageData) => {

    let originalMat = cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let grayScaleMat = new cv.Mat(); // Creating a new mat to store the grayscale image

    originalMat.convertTo(grayScaleMat, cv.CV_8UC4, 1, 0);

    cv.cvtColor(grayScaleMat, grayScaleMat, cv.COLOR_RGBA2GRAY); // Converting the image to grayscale
    cv.cvtColor(grayScaleMat, grayScaleMat, cv.COLOR_GRAY2RGBA); // Converting the image to rgba

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the grayscale image to image data
    filteredImageData.data.set(grayScaleMat.data);

    return filteredImageData;
}

export const toWarm = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        newRGBVal[i] = trucate(RGBVal[i] + value);
        newRGBVal[i + 1] = RGBVal[i + 1];
        newRGBVal[i + 2] = trucate(RGBVal[i + 2] - value);
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const toCool = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let i = 0; i < RGBVal.length; i += 4) {
        newRGBVal[i] = trucate(RGBVal[i] - value);
        newRGBVal[i + 1] = RGBVal[i + 1];
        newRGBVal[i + 2] = trucate(RGBVal[i + 2] + value);
        newRGBVal[i + 3] = RGBVal[i + 3];
    }

    return newImageData;
}

export const toSharpen = (imageData) => {

    let originalMat = new cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let sharpenMat = new cv.Mat();

    originalMat.convertTo(sharpenMat, cv.CV_8UC4, 1, 0);

    let M = new cv.matFromArray(3, 3, cv.CV_32FC1, [-1, -1, -1, -1, 7, 1, -1, -1, -1]);
    let anchor = new cv.Point(-1, -1);

    cv.filter2D(sharpenMat, sharpenMat, cv.CV_8U, M, anchor, 0, cv.BORDER_DEFAULT);

    let filteredImageData = new ImageData(imageData.width, imageData.height);
    filteredImageData.data.set(sharpenMat.data);

    return filteredImageData;
}

export const toSepia = (imageData) => {

    let originalMat = new cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let sepiaMat = new cv.Mat();

    originalMat.convertTo(sepiaMat, cv.CV_8UC4, 1, 0);

    let M = new cv.matFromArray(3, 3, cv.CV_32FC1, [0.272, 0.534, 0.131, 0.349, 0.686, 0.168, 0.393, 0.769, 0.189]);
    let anchor = new cv.Point(-1, -1);

    cv.filter2D(sepiaMat, sepiaMat, cv.CV_8U, M, anchor, 0, cv.BORDER_DEFAULT);

    let filteredImageData = new ImageData(imageData.width, imageData.height);
    filteredImageData.data.set(sepiaMat.data);

    return filteredImageData;
}

export const toBlur = (imageData, value) => {

    // let M = cv.Mat.eye(3, 3, cv.CV_32FC1);
    // console.log(M);

    let originalMat = cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let blurredMat = new cv.Mat();

    originalMat.convertTo(blurredMat, cv.CV_8UC4, 1, 0);

    let kSize = new cv.Size(value, value);
    let anchor = new cv.Point(-1, -1);

    cv.blur(blurredMat, blurredMat, kSize, anchor, cv.BORDER_DEFAULT); // Blurring the image

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data
    filteredImageData.data.set(blurredMat.data);
    return filteredImageData;
}

export const toVignette = (imageData) => {

    let X_resultant_kernel = gaussainKernel(imageData.width, 200);
    let Y_resultant_kernel = gaussainKernel(imageData.height, 200);

    let resultant_kernel = multiply(Y_resultant_kernel, transpose(X_resultant_kernel));

    let mask = flatten(resultant_kernel);
    for (let i = 0; i < mask.length; i++) mask[i] /= 255;
    console.log(mask);

    let originalMat = cv.matFromImageData(imageData); // Converting the image data to opencv mat
    let vigMat = new cv.Mat();

    originalMat.convertTo(vigMat, cv.CV_8UC4, 1, 0);

    let M = new cv.matFromArray(3, 3, cv.CV_32FC1, [...mask]);
    let anchor = new cv.Point(-1, -1);

    cv.filter2D(vigMat, vigMat, cv.CV_8U, mask, anchor, 0, cv.BORDER_DEFAULT); // Blurring the image

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data
    filteredImageData.data.set(vigMat.data);
    return filteredImageData;
}

export const toEdge = (imageData) => {

    // Making cv.Mat from image data
    let originalMat = new cv.matFromImageData(imageData);

    // Making an empty cv.Mat to store the result
    let edgeMat = new cv.Mat();

    originalMat.convertTo(edgeMat, cv.CV_8UC4, 1, 0);

    // converting the image to grayscale
    cv.cvtColor(edgeMat, edgeMat, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(edgeMat, edgeMat, 100, 120, 3.8, false);
    cv.cvtColor(edgeMat, edgeMat, cv.COLOR_GRAY2RGBA);

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data
    filteredImageData.data.set(edgeMat.data);

    return filteredImageData;
}

export const toBilateral = (imageData) => {
    // Making cv.Mat from image data

    // TODO this is not workings
    let originalMat = new cv.matFromImageData(imageData);

    // Making an empty cv.Mat to store the result
    let bilMat = new cv.Mat();

    originalMat.convertTo(bilMat, cv.CV_8U, 1, 0);

    // converting colorspace from rgba to rgb
    cv.cvtColor(bilMat, bilMat, cv.COLOR_RGBA2RGB,0);
    // cv.adaptiveThreshold(bilMat, bilMat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 11, 12);

    cv.bilateralFilter(bilMat, bilMat, 9, 75, 75, cv.BORDER_DEFAULT);

    cv.cvtColor(bilMat, bilMat, cv.Color_RGB2RGBA,0);

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data
    filteredImageData.data.set(bilMat.data);

    return filteredImageData;
}

export const toCartoon = (imageData) => {

    let edgeData = toBlur(imageData, 8);
    console.log(edgeData);
    edgeData = toEdge(edgeData);
    
    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data

    for (let i = 0; i < imageData.data.length; i += 4) {
        filteredImageData.data[i] = imageData.data[i] | edgeData.data[i];
        filteredImageData.data[i + 1] = imageData.data[i+1] | edgeData.data[i + 1];
        filteredImageData.data[i + 2] = imageData.data[i+2] | edgeData.data[i + 2];
        filteredImageData.data[i + 3] = imageData.data[i+3];
    }

    return filteredImageData;

}

// Utility functions
const trucate = (value) => Math.min(255, Math.max(0, value));

function imageDataToImage(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
}

const gaussainKernel = (size, sigma) => {
    let sum = 0;

    let kernel = new Array(size);
    for (let i = 0; i < size; i++) {
        kernel[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            kernel[i][j] = Math.exp(-(Math.pow(i - size / 2, 2) + Math.pow(j - size / 2, 2)) / (2 * Math.pow(sigma, 2)));
            sum += kernel[i][j];
        }
    }

    // normalizing the kernel
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            kernel[i][j] /= sum;
        }
    }

    return kernel;
}

// function to find the transpose of a matrix
function transpose(matrix) {
    let result = new Array(matrix[0].length);
    for (let i = 0; i < matrix[0].length; i++) {
        result[i] = new Array(matrix.length);
        for (let j = 0; j < matrix.length; j++) {
            result[i][j] = matrix[j][i];
        }
    }
    return result;
}

// function to multiply two matrices
function multiply(matrix1, matrix2) {
    let result = new Array(matrix1.length);
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = new Array(matrix1[0].length);
        for (let j = 0; j < matrix1[0].length; j++) {
            result[i][j] = 0;
            for (let k = 0; k < matrix1.length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}

// function to convert a 2d araay to a 1d array
function flatten(matrix) {

    let result = new Array(matrix.length * matrix[0].length);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            result[i * matrix[0].length + j] = matrix[i][j];
        }
    }
    return result;
}