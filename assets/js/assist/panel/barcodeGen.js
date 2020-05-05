const textToBase64Barcode = (text, format) => {
  var canvasBarcode = document.createElement("canvas");
  JsBarcode(canvasBarcode, text, {
    format: format,
    margin: 0,
    displayValue: false
  });

  return canvasBarcode.toDataURL("image/png");  
}

const toQRCode = (code, size) => {
  if (typeof code !== "string") {
    code = JSON.stringify(JSON.stringify(code));
  }

  var qr = new QRious({
    value: code,
    size: size
  });

  var qrBase64 = qr.toDataURL();

  return qrBase64;
};

const genBarcode = (text, format) => {
  var canvasBarcode = document.createElement("canvas");

  if (typeof text !== "string") {
    text = JSON.stringify(JSON.stringify(text));
  }

  bwipjs.toCanvas(canvasBarcode, {
    bcid: format,
    text: text,
  });
  
  return canvasBarcode.toDataURL('image/png');
}