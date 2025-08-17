# 🖼️ Image Processing Web App

A browser-based image processing tool built with **JavaScript**, **HTML5 Canvas**, and **OpenCV.js**. This app allows users to apply various filters, transformations, and detection algorithms to images in real time — all without needing to install any software.

---

## 🚀 Features

-   📸 Upload and display images directly in the browser
-   🎨 Apply real-time image filters:
    -   Grayscale
    -   Thresholding
    -   Inversion
    -   Brightness adjustment
    -   Blurring
-   🧠 Perform advanced image processing:
    -   Edge detection (Canny)
    -   Contour detection
-   🕹️ Interactive UI to control filter parameters
-   🧰 Built with `opencv.js` for high-performance computer vision in the browser

---

## 🗂️ Project Structure

```

Image_processing/
├── index.html # Main interface
├── index.css # Stylesheet
├── main.js # Core logic and event handling
├── filter.js # Filter implementations
├── opencv.js # OpenCV compiled for browser
└── lips-png-transparent-2.png # Sample image asset

```

---

## 🧪 Image Processing Algorithms

### ✅ Basic Filters (`filter.js`)

-   **Grayscale**
    ```js
    applyGrayscale();
    ```

Converts the image to shades of gray.

-   **Thresholding**

    ```js
    applyThreshold(thresholdValue);
    ```

    Converts to a binary black-and-white image based on pixel intensity.

-   **Invert Colors**

    ```js
    invertColors();
    ```

    Creates a negative of the original image by inverting pixel values.

-   **Brightness Adjustment**

    ```js
    adjustBrightness(amount);
    ```

    Increases or decreases brightness based on a user-defined amount.

-   **Blurring**

    ```js
    applyBlur(radius);
    ```

    Smooths the image using a Gaussian blur.

---

### 🧠 Advanced Processing (`main.js`)

-   **Load Image**

    ```js
    loadImage();
    ```

    Loads user-uploaded or sample image onto canvas.

-   **Canny Edge Detection**

    ```js
    detectEdges();
    ```

    Highlights strong gradients using OpenCV's Canny algorithm.

-   **Contour Detection**

    ```js
    detectContours();
    ```

    Finds object outlines using OpenCV contour detection.

-   **Reset Image**

    ```js
    resetImage();
    ```

    Reverts canvas to the original state.

-   **Apply Custom Filter**

    ```js
    applyCustomFilter();
    ```

    Binds filters from `filter.js` to UI interaction.

---

## 💻 How to Run

1. **Clone the repo**

    ```bash
    git clone https://github.com/Rishikesh-kumar-7258/Image_processing.git
    cd Image_processing
    ```

2. **Open `index.html`** in any modern browser (Chrome, Firefox, Edge).

    Or use a local development server:

    ```bash
    npx serve .
    ```

3. **Upload an image**, choose a filter, and watch it work in real time!

---

## 🔧 Technologies Used

-   ✅ **Vanilla JavaScript**
-   ✅ **OpenCV.js (WebAssembly version)**
-   ✅ **HTML5 Canvas**
-   ✅ **CSS for UI Styling**

---

## 📈 Ideas for Improvement

-   Add convolution filters like sharpen or emboss
-   Enable chaining multiple filters
-   Integrate webcam live feed processing
-   Allow export/download of processed images
-   Add thumbnails/previews of filter effects
-   Support drag-and-drop image upload

---

## 🧑‍💻 Author

**Rishikesh Kumar**
GitHub: [@Rishikesh-kumar-7258](https://github.com/Rishikesh-kumar-7258)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> ⚠️ Make sure `opencv.js` is properly loaded before using advanced features like contour detection or edge detection.
