# Bouncing Chrome Balls ported to a PWA!
## Description
See title.

Chrome logos bouncing around. Drag them with a mouse or touchscreen.

This is a demo app made with BIB:
https://chrome.google.com/webstore/detail/bib/clpbnigmledbhmjepnjjkbmaklgbhjhe

## Why?
Why not.

## Installation
1. Open https://github.com/kkilobyte/chrome-balls.
2. Press the green code button.
3. Press "Download zip".
4. Extract the downloaded zip.
5. Open `chrome.html` or `index.html`.
6. Profit.

# Issues
## 1. Bouncing Chrome Balls can NOT run from a `file://` URL. Put it on a HTTP server like NGINX or a static web host like Github Pages or Neocities. Hopefully someone can make a pull request that fixes this.
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
I am attempting to fix this myself, however, if you want to make a pull request that manages to SUCCESSFULLY fix this, please go ahead at https://github.com/kkilobyte/chrome-balls/pulls. :)

# Credits
All credits goes to jack.m.hou, he is the original creator and made the entire thing himself using [BIB](https://chromewebstore.google.com/detail/bib/clpbnigmledbhmjepnjjkbmaklgbhjhe) which he made himself. Bouncing Chrome Balls was made as a BIB demo.
Original Chrome App - https://chromewebstore.google.com/detail/bouncing-chrome-balls/kcnppjgblnmbfhgnaambnijjfbmagihm
