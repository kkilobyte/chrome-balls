# Bouncing Chrome Balls ported to a PWA!
## Why?
Why not.

## Installation
1. Open https://github.com/kkilobyte/chrome-balls.
2. Press the green code button.
3. Press "Download zip".
4. Extract the downloaded zip.
5. Open `chrome.html` or `index.html`.
6. Profit.

# Notice: the current version doesn't work
```
Uncaught SecurityError: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.
    at BitmapData._initFromImg (ivank.js:1261:18)
    at new BitmapData (ivank.js:1165:9)
    at BIB.Animation.initialize (bib.js:648:28)
    at BIB.World.<anonymous> (bib.js:257:40)
    at Array.forEach (<anonymous>)
    at BIB.World.initWhenLoadComplete (bib.js:256:14)
    at decrementAndCheck (bib.js:166:12)
    at bib.js:179:7
    at bib.js:665:7
    at Array.forEach (<anonymous>)
```