"use strict";

const keydown = require("keydown");
let keys = [];

function queue(press) {
    let ks = Object.keys(press);

    ks.forEach(function(k) {
        keys.push(k);
    });
}

// give it a list of keys and it'll queue them up when it notices one
// being pressed. Needed a buffer for keypresses
function Keyboard() {

    let args = Array.prototype.slice.call(arguments);

    args.forEach(function(key) {
        keydown(key).on("pressed", queue);
    });
}

// get the next key queued
Keyboard.prototype.get = function() {
    return keys.shift();
};


module.exports = Keyboard;
