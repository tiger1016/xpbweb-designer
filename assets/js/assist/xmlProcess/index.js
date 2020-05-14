const encodeXML = xmlDom => {
  console.log(xmlDom)
  
  initializeParams();

  var designSign = false;
  
  const xmlNodes = xmlDom.firstChild.childNodes;
  var panel = {};

  for (i = 0; i < xmlNodes.length; i ++) {
    if (xmlNodes[i].nodeType == 1) {
      switch (xmlNodes[i].nodeName) {
        case 'ActiveLayer':
          procDrawingObjects(xmlNodes[i].firstChild);
          break;
        case 'DataSource':
          const drawing = xmlNodes[i].getElementsByTagName('Drawing')[0];
          if (drawing && drawing.textContent !== "") {
            if (!designSign) {
              var active = drawing.firstChild;
              for (var j = 0; j < drawing.childNodes.length; j ++) {
                svgFormFormat(active.nodeName, active, panel);
                active = active.nextSibling;
              }
              designSign = true;
            }
          }
          break;
        default: 
          if (!designSign) {
            svgFormFormat(xmlNodes[i].nodeName, xmlNodes[i], panel);
          }
          break;
      }
    }         
  }
  
  layers.push({
    layerName: 'panel',
    data: panel
  });
}

const procDrawingObjects = children => {
  const nodes = children.childNodes;
  var attr = null;
  var id = null;

  for (var i = 0; i < nodes.length; i ++) {
    if (nodes[i].nodeName === 'DrawingObject') {
      attr = nodes[i].attributes;
      id = attr.getNamedItem('i:type').nodeValue;

      switch (id) {
        case 'Line':
          parseLine(nodes[i], layers);
          break;
        case 'Label':
          parseLabel(nodes[i], layers);
          break;
        case "Image":
          parseImage(nodes[i], layers);
          break;
        case "Rectangle": case "Ellipse":
          parseRectAndEllipse(nodes[i], layers);
          break;
        case "NGon":
          parseNGon(nodes[i], layers);
          break;
        case 'Barcode':
          parseBarcode(nodes[i], layers);
          break;
      }
    }
  }
}

const svgFormFormat = (nodeName, active, panel) => {
  switch (nodeName) {
    case 'Size':
      if (active && active.textContent !== "") {
        var w = parseFloat(active.getElementsByTagName('Width')[0].textContent).toFixed(2);
        var h = parseFloat(active.getElementsByTagName('Height')[0].textContent).toFixed(2);

        panel['Width'] = w;
        panel['Height'] = h;
      }
      break;
    case 'DefaultFontFamilyAsString':
      if (active && active.textContent !== "") {
        var fontStyle = active.textContent;  
        panel['DefaultFont'] = fontStyle;                  
      }
      break;
    case 'DefaultFontSize':
      if (active && active.textContent !== "") {
        panel['DefaultFontSize'] = active.textContent;
      }
      break;
    case "FrontSideOpacity":
      if (active && active.textContent !== "") {
        panel['Opacity'] = parseFloat(active.textContent)*100;
      }
      break;
  }
}

const renderXML = () => {
  console.log(layers)

  layers.map(async layer => {
    if (layer.layerName === 'panel') {      
      const panel = $('#panel');
      
      panel.addClass('screen');
      panel.trigger('click');
    
      toolboxInit();
    
      property_action(); 
      
      await initPanel(layer.data);
      await refreshPanel(layer.data);
    }
  });
  
  layers.map(async layer => {
    if (layer.layerName !== 'panel') {
      await panel(layer);
    }
  });
  

  zOrder();
}

var xmlDom;
const decodeXML = () => {
  var xmlString = '<DrawingVM xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/" xmlns="http://schemas.datacontract.org/2004/07/BD_Desktop_VM"></DrawingVM>';
  var parser = new DOMParser();

  xmlDom = parser.parseFromString(xmlString, 'text/xml');
  
  var DrawingVM = xmlDom.getElementsByTagName('DrawingVM');
  var actLayer = xmlDom.createElement('ActiveLayer');

  DrawingVM[0].appendChild(actLayer);

  var children = xmlDom.createElement('Children');
  var isFront = xmlDom.createElement('IsFront');
  var isLocked = xmlDom.createElement('IsLocked');
  var isVisible = xmlDom.createElement('IsVisible');
  var name = xmlDom.createElement('Name');
  var zOrder = xmlDom.createElement('ZOrder');

  actLayer.appendChild(children)
  actLayer.appendChild(isFront)
  actLayer.appendChild(isLocked)
  actLayer.appendChild(isVisible)
  actLayer.appendChild(name)
  actLayer.appendChild(zOrder);

  xmlDom.getElementsByTagName('IsFront')[0].nodeValue = 'value'
          console.log(xmlDom)

  layers.forEach(layer => {
    switch (layer.layerName.replace(/[0-9]/g, '')) {
      case 'panel':
        decodePanel(layer, xmlDom);
        break;
      case 'rectangle':
        decodeRect(layer, xmlDom);
        break;
      case 'ellipse':
        decodeEllipse(layer, xmlDom);
        break;
      case 'picture':
        decodePicture(layer, xmlDom);
        break;
      case 'barcode':
        decodeBarcode(layer, xmlDom);
        break;
      case 'line':
        decodeLine(layer, xmlDom);
        break;
      case 'Text':
        decodeText(layer, xmlDom);
        break;
    }
  })
}



