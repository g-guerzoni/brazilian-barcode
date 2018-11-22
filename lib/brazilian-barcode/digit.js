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
