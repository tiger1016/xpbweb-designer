const panel = layer => {
  if (layer.layerName && layer.layerName.search('line') === 0) {
    panelLine(layer.data);
  } else if (layer.layerName && layer.layerName.search('rectangle') === 0) {
    panelRect(layer.data);
  } else if (layer.layerName && layer.layerName.search('ellipse') === 0) {
    panelEllipse(layer.data);    
  } else if (layer.layerName && layer.layerName.search('text') === 0) {
    panelText(layer.data);    
  } else if (layer.layerName && layer.layerName.search('picture') === 0) {
    panelPicture(layer.data);    
  } else if (layer.layerName && layer.layerName.search('barcode') === 0) {
    panelBarcode(layer.data);    
  }
}


const panelLine = data => {
  console.log(data);


}

const panelRect = data => {

}

const panelEllipse = data => {

}

const panelText = data => {

}

const panelPicture = data => {

}

const panelBarcode = data => {

}
