# Image Processing Project (ZeroH Labs)

This project showcases core **image processing techniques** implemented in JavaScript, using OpenCV in the browser (`opencv.js`) and custom filters. It enables real-time filter application and image manipulation via a web interface.

## Demo

Open `index.html` in a modern browser to interact with your filters and view the processed results in real time.

---

## Repository Structure

Image_processing/
├── index.html ← Main web interface
├── index.css ← Styles and layout
├── main.js ← Application logic and event handling
├── filter.js ← Custom filter implementations
├── opencv.js ← OpenCV compiled for browser use
└── lips-png-transparent-2.png ← Sample image asset

---

## Image Processing Features & Algorithms

Here's where you can list methods you've implemented. Example placeholders:

### `filter.js`

-   `applyGrayscale()` — Converts images to grayscale.
-   `applyThreshold(thresholdValue)` — Applies binary thresholding to highlight features.
-   `invertColors()` — Inverts pixel colors for negative effect.
-   `adjustBrightness(amount)` — Increase or decrease image brightness.
-   `applyBlur(radius)` — Applies Gaussian or box blur to smooth image.

### `main.js`

-   `loadImage()` — Handles image upload/display and integration with `opencv.js`.
-   `detectEdges()` — Uses OpenCV’s Canny edge detection.
-   `detectContours()` — Finds and draws contours using OpenCV functions.
-   `applyCustomFilter()` — Runs filters from `filter.js` on the canvas.
-   `resetImage()` — Restores the original image state.
-   UI controls for selecting filters, adjusting parameters, and real-time updates.

_(Adapt this list to reflect the actual functions you’ve written in your files.)_

---

## How to Use

1. Clone the repository:

    ```bash
    git clone https://github.com/Rishikesh-kumar-7258/Image_processing.git
    cd Image_processing

    ```

2. Open in browser
   open index.html

3. Interact with the UI to:

````Load your own image or use the sample.
Choose and apply filters.

See real-time processing results (e.g., edge detection, contours).

Adjust filter parameters (thresholds, blur radius, brightness, etc.).```

````
