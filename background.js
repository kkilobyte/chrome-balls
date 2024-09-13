"use strict";

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('chrome.html', {
    'width': 1280,
    'height': 720,
    'type': 'shell',
  });
});
