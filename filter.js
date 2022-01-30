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
        newRGBVal[i+1] = RGBVal[i+1];
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
        newRGBVal[i+1] = RGBVal[i+1];
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

export const toBlackWhite = (imageData, threshold) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);

    let newRGBVal = newImageData.data;
    for (let i = 0; i < RGBVal.length; i += 4) {
        let avg = (RGBVal[i] + RGBVal[i + 1] + RGBVal[i + 2]) / 3;
        
        if (avg > threshold) {
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


export const toSketch = (imageData) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);

    let newRGBVal = newImageData.data;
    for (let i = 0; i < RGBVal.length; i += 4) {
        let avg = (RGBVal[i] + RGBVal[i + 1] + RGBVal[i + 2]) / 3;
        if ( avg > 200)
        {
            newRGBVal[i] = 255;
            newRGBVal[i + 1] = 255;
            newRGBVal[i + 2] = 255;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else if (avg > 150)
        {
            newRGBVal[i] = 200;
            newRGBVal[i + 1] = 200;
            newRGBVal[i + 2] = 200;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else if (avg > 100) {
            newRGBVal[i] = 155;
            newRGBVal[i + 1] = 155;
            newRGBVal[i + 2] = 155;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else if (avg > 50) {
            newRGBVal[i] = 100;
            newRGBVal[i + 1] = 100;
            newRGBVal[i + 2] = 100;
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



const RGBtoHSL = (RGBArray) => {

    let HSLArray = [];

    let n = RGBArray.length;
    for (let i = 0; i < i; i += 4)
    {
        r = RGBArray[i] / 255;
        g = RGBArray[i+1] / 255;
        b = RGBArray[i+2] / 255;
        a = RGBArray[i+3] / 255;

        max_ = max(r, g, b);
        min_ = min(r, g, b);

        let h,s,l;
        l = Math.round((max_ + min_) / 2);

        if (l < 0.5) s = (max_ - min_) / (max_ + min_);
        else s = (max_ - min_) / (2 - max_ - min_);

        if (max_ == r) h = (g - b) / (max_ - min_);
        else if (max_ == g) h = 2 - (b - r) / (max_ - min_);
        else h = 4 - (r - g) / (max_ - min_);

        HSLArray.push(h);
        HSLArray.push(s);
        HSLArray.push(l);
    }

    return HSLArray;
}

// Mean blur filter
export const toMeanBlur = (imageData) => {

    let RGBVal = imageData.data;
    let width = imageData.width;
    let height = imageData.height;

    let newImageData = new ImageData(width, height);
    let newRGBval = newImageData.data;

    let windowSize = 3;

    for (let i = 0; i < height-windowSize -1; i++)
    {
        for (let j = 0; j < width-windowSize-1; j++)
        {
            let currSum = [0, 0, 0, 0];
            if (j === 0)
            {
                currSum = getSum(RGBVal, i, j, windowSize, width, height);
            }
            else
            {
                for (let k = i; k < i+windowSize; k++) 
                {
                    let p = getPixel(RGBVal, k, j-1, width);
                    currSum[0] -= RGBVal[p];
                    currSum[1] -= RGBVal[p+1];
                    currSum[2] -= RGBVal[p+2];
                    currSum[3] -= RGBVal[p+3];

                    let pixel = getPixel(RGBVal, k, j+windowSize-1, width);
                    currSum[0] += pixel[0];
                    currSum[1] += pixel[1];
                    currSum[2] += pixel[2];
                    currSum[3] += pixel[3];
                }
            }

            let mn = [currSum[0] / (windowSize*windowSize), currSum[1] / (windowSize*windowSize), currSum[2] / (windowSize*windowSize), currSum[3] / (windowSize*windowSize)];
            let p = (i+windowSize/2 * width * 4) + (j + windowSize/2 * 4);

            newRGBval[p] = mn[0];
            newRGBval[p+1] = mn[1];
            newRGBval[p+2] = mn[2];
            newRGBval[p+3] = RGBVal[p + 3];
        }
    }

    return newImageData;
}

// Frost image filter (currently on hold first, implement mean and gaussian blur which will give idea about frost filter)
const toFrost = (imageData, d=1, wSize=7) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);

    let n = RGBVal.length;

    s = distanceFromCenter(wSize);

    for (let i = 0; i < n; i+=4)
    {
        for (let j = 0; j < n; j+=4)
        {
            let tempWindow = [];
            for (let k = i; k < i + 4*wSize; k+=4)
            {
                for (let l = j; k < j + 4*wSize; k+=4)
                {
                    tempWindow.push(RGBVal[i]);
                    tempWindow.push(RGBVal[i+1]);
                    tempWindow.push(RGBVal[i+2]);
                    tempWindow.push(RGBVal[i+3]);
                }
            }

            let windowMean = mean(tempWindow);
            let wVariance = variance(tempWindow);
            let windowB = d * (wVariance / (windowMean*windowMean));

            for (let k = i; k < i + 4*wSize; k+=4)
            {
                for (let l = j; k < j + 4*wSize; k+=4)
                {
                    tempWindow.push(RGBVal[i]);
                    tempWindow.push(RGBVal[i+1]);
                    tempWindow.push(RGBVal[i+2]);
                    tempWindow.push(RGBVal[i+3]);
                }
            }
        }
    }
}

//=============================== Utility functions ========================================

// function to trucate the value between 0 and 255
const trucate = (value) => Math.min(255, Math.max(0, value));

// Function to find the mean of a matrix
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

// function to find the variance of a matrix
const variance = (arr) => {

    let m = mean(arr);

    let s = arr.reduce((a, b) => a + (b-m)*(b - m)) / arr.length;

    return s;
}

// function to find weight of a pixel
const weight = (b, s) => Math.exp(-b*s);

// function to find the distance of each pixel from center of the array
const distanceFromCenter = (size) => {

    let center = size / 2 - 1;
    let arr = [];

    for (let i = 0; i < n; i++)
    {
        let temp = [];
        for (let j = 0; j < n; j++)
        {
            temp.push(Math.sqrt(Math.pow(i-c, 2), Math.pow(j-c, 2)));
        }

        arr.push(temp);
        temp.clear();
    }
}

const getPixel = (arr, x, y, width, height) => {
    let p = (x * 4 * width) + (y * 4);

    return [arr[p], arr[p + 1], arr[p + 2], arr[p + 3]];
}

const getSum = (arr, i,j, size, width, height) => {
    let sum = [0, 0, 0, 0];
    for (let k = i; k < i +size; k++)
    {
        for (let l = j; l < j +size; l++)
        {
            let pixel = getPixel(arr, k, l, width, height);
            sum[0] += pixel[0];
            sum[1] += pixel[1];
            sum[2] += pixel[2];
            sum[3] += pixel[3];

        }
    }

    return sum;
}