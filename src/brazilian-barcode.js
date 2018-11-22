(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.brazilianBarcode = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = require('./lib/brazilian-barcode.js');
},{"./lib/brazilian-barcode.js":2}],2:[function(require,module,exports){
var bb = exports;

// Expose methods
bb.digit = require('./brazilian-barcode/digit');
bb.formatter = require('./brazilian-barcode/formatter');
},{"./brazilian-barcode/digit":3,"./brazilian-barcode/formatter":4}],3:[function(require,module,exports){
var digit = exports;

Array.prototype.insertInArray = function(index, item) {
  this.splice(index, 0, item);
};

/**
 * Get barcode (boleto) Verifying Digit (DV) type BANK
 * @param {string} barcode number.
 * @param {boolean} order order barcode numbers (false default).
 * @return {string} barcode (boleto) number with DV.
 */

digit.getVDBank = function(barcode, order = false) {
  if (barcode.length < 44 || barcode.length < 44)
    return "Invalid barcode number";

  let VDPoint = [9, 10, 10];
  let array = [
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2
  ];

  barcode = barcode.split("");

  if (order) {
    barcode.forEach((order, i) => {
      if (i >= 4 && i <= 18) {
        barcode.push(order);
      }
    });

    barcode.splice(4, 15);
  }

  VDPoint.forEach((VD, VDi) => {
    let lastIndex = 0;

    if (VDi > 0) lastIndex += VDi;

    VDPoint.forEach((el, i) => {
      if (i <= VDi) lastIndex += el;
    });

    let sum = [];
    for (let i = lastIndex - VD; i < lastIndex; i++) {
      if (i > array.length - 1) return;
      let multi = array[VDi > 0 ? i - VDi : i] * parseInt(barcode[i]);

      if (multi > 9) {
        multi = multi.toString().split("");
        multi = parseInt(multi[0]) + parseInt(multi[1]);
      }

      sum[i] = multi;

      if (i === lastIndex - 1) {
        sum = sum.reduce((x, y) => x + y);
        sum = 10 - (sum % 10);
        barcode.insertInArray(lastIndex, sum);
        sum = [];
      }
    }
  });

  barcode = barcode.join("");

  return barcode;
};

/**
 * Get barcode (boleto) Verifying Digit (DV) type BILL
 * @param {string} barcode number.
 * @return {string} barcode (boleto) number with DV.
 */

digit.getVDBill = function(barcode) {
  return "Not supported yet";
};

},{}],4:[function(require,module,exports){

},{}]},{},[1])(1)
});
