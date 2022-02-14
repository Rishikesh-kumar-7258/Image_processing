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
        if (avg > 200) {
            newRGBVal[i] = 255;
            newRGBVal[i + 1] = 255;
            newRGBVal[i + 2] = 255;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else if (avg > 150) {
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

// const trucate = (value) => Math.min(255, Math.max(0, value));

// const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const letiance = (arr) => {

    let m = mean(arr);

    let s = arr.reduce((a, b) => a + (b - m) * (b - m)) / arr.length;

    let newRGBVal = newImageData.data;
    for (let i = 0; i < RGBVal.length; i += 4) {
        let avg = (RGBVal[i] + RGBVal[i + 1] + RGBVal[i + 2]) / 3;
        if (avg > 200) {
            newRGBVal[i] = 255;
            newRGBVal[i + 1] = 255;
            newRGBVal[i + 2] = 255;
            newRGBVal[i + 3] = RGBVal[i + 3];
        }
        else if (avg > 150) {
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
    for (let i = 0; i < i; i += 4) {
        r = RGBArray[i] / 255;
        g = RGBArray[i + 1] / 255;
        b = RGBArray[i + 2] / 255;
        a = RGBArray[i + 3] / 255;

        max_ = max(r, g, b);
        min_ = min(r, g, b);

        let h, s, l;
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

//sharppen function
export const toSharpen = (imageData) => {
    let w = imageData.width;
    let h = imageData.height;
    let mix = 0.1;
    var x, sx, sy, r, g, b, a, dstOff, srcOff, wt, cx, cy, scy, scx,
        weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = new Image(),
        dstData = imageData,
        dstBuff = dstData.data,
        srcBuff = imageData.data,
        y = h;

    while (y--) {
        x = w;
        while (x--) {
            sy = y;
            sx = x;
            dstOff = (y * w + x) * 4;
            r = 0;
            g = 0;
            b = 0;
            a = 0;

            for (cy = 0; cy < katet; cy++) {
                for (cx = 0; cx < katet; cx++) {
                    scy = sy + cy - half;
                    scx = sx + cx - half;

                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        srcOff = (scy * w + scx) * 4;
                        wt = weights[cy * katet + cx];

                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix);
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }

    // ctx.putImageData(dstData, 0, 0);
    console.log("Sharpen filter");
    return dstData;
}


// Mean blur filter
export const toMeanBlur = (imageData, windowSize) => {

    // todo have to improve the algorithm for large windowSize

    windowSize = windowSize < 1 ? 1 : windowSize;

    let RGBVal = imageData.data;
    let width = imageData.width;
    let height = imageData.height;

    let newImageData = new ImageData(width, height);
    let newRGBval = newImageData.data;

    for (let i = 0; i < height - windowSize - 1; i++) {
        for (let j = 0; j < width - windowSize - 1; j++) {
            let currSum = getSum(RGBVal, i, j, windowSize, width, height);

            for (let i = 0; i < currSum.length; i++) {
                currSum[i] /= windowSize * windowSize;
                Math.round(currSum[i]);
            }

            let p = ((i + Math.floor(windowSize / 2)) * width * 4) + ((j + Math.floor(windowSize / 2)) * 4);

            newRGBval[p] = currSum[0];
            newRGBval[p + 1] = currSum[1];
            newRGBval[p + 2] = currSum[2];
            newRGBval[p + 3] = RGBVal[p + 3];
        }


    }

    return newImageData;

}

// Frost image filter (currently on hold first, implement mean and gaussian blur which will give idea about frost filter)
// const toFrost = (imageData, d = 1, wSize = 7) => {
//     let RGBVal = imageData.data;
//     let newImageData = new ImageData(imageData.width, imageData.height);

//     let n = RGBVal.length;

//     s = distanceFromCenter(wSize);

//     for (let i = 0; i < n; i += 4) {
//         for (let j = 0; j < n; j += 4) {
//             let tempWindow = [];
//             for (let k = i; k < i + 4 * wSize; k += 4) {
//                 for (let l = j; k < j + 4 * wSize; k += 4) {
//                     tempWindow.push(RGBVal[i]);
//                     tempWindow.push(RGBVal[i + 1]);
//                     tempWindow.push(RGBVal[i + 2]);
//                     tempWindow.push(RGBVal[i + 3]);
//                 }
//             }

//             let windowMean = mean(tempWindow);
//             let wVariance = variance(tempWindow);
//             let windowB = d * (wVariance / (windowMean * windowMean));

//             for (let k = i; k < i + 4 * wSize; k += 4) {
//                 for (let l = j; k < j + 4 * wSize; k += 4) {
//                     tempWindow.push(RGBVal[i]);
//                     tempWindow.push(RGBVal[i + 1]);
//                     tempWindow.push(RGBVal[i + 2]);
//                     tempWindow.push(RGBVal[i + 3]);
//                 }
//             }
//         }
//     }

//     return newImageData;
// }

//=============================== Utility functions ========================================

// function to trucate the value between 0 and 255
const trucate = (value) => Math.min(255, Math.max(0, value));

// Function to find the mean of a matrix
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

// function to find the variance of a matrix
const variance = (arr) => {

    let m = mean(arr);

    let s = arr.reduce((a, b) => a + (b - m) * (b - m)) / arr.length;

    return s;
}

// function to find weight of a pixel
const weight = (b, s) => Math.exp(-b * s);

// function to find the distance of each pixel from center of the array
const distanceFromCenter = (size) => {

    let center = size / 2 - 1;
    let arr = [];

    for (let i = 0; i < n; i++) {
        let temp = [];
        for (let j = 0; j < n; j++) {
            temp.push(Math.sqrt(Math.pow(i - c, 2), Math.pow(j - c, 2)));
        }

        arr.push(temp);
        temp.clear();
    }
}

const getPixel = (arr, x, y, width, height) => {
    let p = (x * 4 * width) + (y * 4);

    return [arr[p], arr[p + 1], arr[p + 2], arr[p + 3]];
}

const getSum = (arr, i, j, size, width, height) => {
    let sum = [0, 0, 0, 0];
    for (let k = i; k < i + size; k++) {
        for (let l = j; l < j + size; l++) {

            let pixel = getPixel(arr, k, l, width, height);
            sum[0] += pixel[0];
            sum[1] += pixel[1];
            sum[2] += pixel[2];
            sum[3] += pixel[3];

        }
    }

    return sum;
}





//  Soft filter Working perfectly
// export const toSharpen = (imageData)=> {
export const toSoft = (imageData) => {
    imageData.filter = 'blur(5px) saturate(101%) contrast(113%) brightness(105%)';
    return imageData;
}


// working good just need to add the threshold value
export const toFaded = (imageData) => {
    // imageData.filter = 'blur(0.2px) saturate(80%) contrast(100%) brightness(110%) ';
    // imageData = toMeanBlur(imageData, 10);
    return imageData;
}

// Blossom Filter
export const toBlossom = (imageData) => {
    // imageData.filter = 'saturate(180%) contrast(95%) brightness(130%) ';
    let newImageData = new ImageData(imageData.width, imageData.height);
    newImageData = saturate(imageData, 50);
    newImageData = contrastImage(imageData, 95);
    newImageData = brightImage(imageData, 130);
    // imageData = contrastImage(imageData, 50).brightImage(imageData,50).saturate(imageData,10);
    return newImageData;
    // return "saturate(180%) contrast(95%) brightness(130%)";
}


function contrastImage(imageData, contrast) {
    let RGBVal = imageData.data;
    // contrast = contrast/100+1;
    let contrastFactor = 259 * (255 + contrast) / 255 * (259 - contrast);
    for (let index = 0; index < RGBVal.length; index++) {
        RGBVal[index] = trucate(contrastFactor * (RGBVal[index] - 128) + 128);
        RGBVal[index + 1] = trucate(contrastFactor * (RGBVal[index + 1] - 128) + 128);
        RGBVal[index + 2] = trucate(contrastFactor * (RGBVal[index + 2] - 128) + 128);
        RGBVal[index + 3] = RGBVal[index + 3]
    }
    return imageData;
}


//brightness function takes value as percentage
function brightImage(imageData, value) {
    let RGBVal = imageData.data;
    value = (value / 100) + 1;
    for (let index = 0; index < RGBVal.length; index++) {
        RGBVal[index] = trucate(RGBVal[index] + value);
        RGBVal[index + 1] = trucate(RGBVal[index + 1] + value);
        RGBVal[index + 2] = trucate(RGBVal[index + 2] + value);
        RGBVal[index + 3] = RGBVal[index + 3]
    }
    return imageData;
}


function saturate(imageData, value) {
    value = value / 100;
    var RGBVal = imageData.data;
    for (var i = 0; i < RGBVal.length; i += 4) {
        var r = RGBVal[i];
        var g = RGBVal[i + 1];
        var b = RGBVal[i + 2];
        var gray = 0.2989 * r + 0.5870 * g + 0.1140 * b; //weights from CCIR 601 spec
        RGBVal[i] = trucate(-gray * value + RGBVal[i] * (1 + value));
        RGBVal[i + 1] = trucate(-gray * value + RGBVal[i + 1] * (1 + value));
        RGBVal[i + 2] = trucate(-gray * value + RGBVal[i + 2] * (1 + value));
        //normalize over- and under-saturated values
        // if(RGBVal[i] > 255) RGBVal[i] = 255;
        // if(RGBVal[i+1] > 255) RGBVal[i] = 255;
        // if(RGBVal[i+2] > 255) d[i] = 255;
        // if(RGBVal[i] < 0) RGBVal[i] = 0;
        // if(RGBVal[i+1] < 0) RGBVal[i] = 0;
        // if(RGBVal[i+2] < 0) RGBVal[i] = 0;
    }
    return imageData;
};



//frost filter

export const toFrost = (imageData) => {
    let w = imageData.width;
    let h = imageData.height;
    let mix = 1;
    var x, sx, sy, r, g, b, a, dstOff, srcOff, wt, cx, cy, scy, scx,
        weights = [1 / 16, 1 / 8, 1 / 16, 1 / 8, 1 / 4, 1 / 8, 1 / 16, 1 / 8, 1 / 16],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = new Image(),
        dstData = imageData,
        dstBuff = dstData.data,
        srcBuff = imageData.data,
        y = h;
    while (y--) {
        x = w;
        while (x--) {
            sy = y;
            sx = x;
            dstOff = (y * w + x) * 4;
            r = 0;
            g = 0;
            b = 0;
            a = 0;

            for (cy = 0; cy < katet; cy++) {
                for (cx = 0; cx < katet; cx++) {
                    scy = sy + cy - half;
                    scx = sx + cx - half;

                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        srcOff = (scy * w + scx) * 4;
                        wt = weights[cy * katet + cx];

                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix);
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }
    // ctx.putImageData(dstData, 0, 0);
    console.log("Frost filter");
    return dstData;
}

// export const toFrost = (imageData) => {
//     imageData = toCool(imageData, 10);
//     imageData = saturate(imageData, 10);
//     imageData = brightness(imageData, 10);
//     imageData = contrastImage(imageData, 10);
//     return imageData;
// }

