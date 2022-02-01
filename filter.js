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

export const toBlackWhite = (imageData) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);

    let newRGBVal = newImageData.data;
    for (let i = 0; i < RGBVal.length; i += 4) {
        let avg = (RGBVal[i] + RGBVal[i + 1] + RGBVal[i + 2]) / 3;

        if (avg > 128) {
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

const trucate = (value) => Math.min(255, Math.max(0, value));

const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const letiance = (arr) => {

    let m = mean(arr);

    let s = arr.reduce((a, b) => a + (b - m) * (b - m)) / arr.length;

    return s;
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

//convolute function
/*
var convoluteMatrix = [];

this.setMatrix = function (matrix) {
        convoluteMatrix = matrix;
        return this;
    }

this.convolute = function () {
    let side = Math.round(Math.sqrt(convoluteMatrix.length));
    let halfSide = Math.floor(side / 2);
    let src = imageData.data;
    let sw = imageData.width;
    let sh = imageData.height;

    let w = sw;
    let h = sh;

    let output = new ImageData(w, h);
    let dst = output.data;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let sy = y;
            let sx = x;
            let dstOff = (y * w + x) * 4;
            let r = 0, g = 0, b = 0, a = 0;

            for (let cy = 0; cy < side; cy++) {
                for (let cx = 0; cx < side; cx++) {
                    let scy = sy + cy - halfSide;
                    let scx = sx + cx - halfSide;

                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        let srcOff = (scy * sw + scx) * 4;
                        let wt = convoluteMatrix[cy * side + cx];

                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a = src[srcOff + 3];
                    }
                }
            }

            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a;
        }
    }
    imageData = output;
    return this;
};


this.sharpen = function () {
        return this.setMatrix([
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ]).convolute();
    };

*/

export const toSharpen = (imageData)=> {
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