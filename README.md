**EN**

Normalize Brazilians barcode

**Bank barcode**
* Order bank barcode
* Get Verifying Digit

**Bill barcode (soon)**
* Get Verifying Digit

======

**BR**

Normaliza código de boletos

**Boleto bancário**
* Ordena o código de barras
* Calcula o digito verificador

**Boleto de conta (breve)**
* Calcula o digito verificador

======

**Code**

```
/**
 * Get barcode (boleto) Verifying Digit (DV) type BANK
 * @param {string} barcode number.
 * @param {boolean} order order barcode numbers (false default).
 * @return {string} barcode (boleto) number with DV.
 */

var bb = require("brazilian-barcode")
bb.digit.getVDBank("23792770900000699900593090000046776700017510", true)
// return 23792770900000699900593090000046776700017510
 ```