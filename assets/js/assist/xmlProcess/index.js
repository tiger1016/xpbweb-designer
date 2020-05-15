const encodeXML = xmlDom => {
  console.log(xmlDom)

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
        panel['DefaultFont'] = active.textContent;  
      break;
    case 'DefaultFontSize':
        panel['DefaultFontSize'] = active.textContent && active.textContent !== '' ? active.textContent : 12;
      break;
    case "FrontSideOpacity":
        panel['Opacity'] = parseFloat(active.textContent)*100;
      break;
    case 'DisplayUnits':
        panel['DisplayUnits'] = active.textContent;
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
const decodeXML = async () => {
  var xmlString = '<DrawingVM xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/" xmlns="http://schemas.datacontract.org/2004/07/BD_Desktop_VM"></DrawingVM>';
  var parser = new DOMParser();

  xmlDom = parser.parseFromString(xmlString, 'text/xml');
  
  var DrawingVM = xmlDom.getElementsByTagName('DrawingVM')[0];

  const {
    ContentId, IsActive, IsSelected, IsVisible, Title
  } = elements(xmlDom);

  ContentId.setAttribute('i:nil', true);
  IsActive.textContent = true;
  IsSelected.textContent = true;
  IsVisible.textContent = true;
  Title.textContent = "Sample For Badge";

  DrawingVM.appendChild(ContentId);
  DrawingVM.appendChild(IsActive);
  DrawingVM.appendChild(IsSelected);
  DrawingVM.appendChild(IsVisible);
  DrawingVM.appendChild(Title);

  var ActLayer = xmlDom.createElement('ActiveLayer');
  var ActiveLayerBack = xmlDom.createElement('ActiveLayerBack');
  var DataSource = xmlDom.createElement('DataSource');

  DrawingVM.appendChild(ActLayer);
  DrawingVM.appendChild(ActiveLayerBack);
  DrawingVM.appendChild(DataSource);

  var children = xmlDom.createElement('Children');
  var isFront = xmlDom.createElement('IsFront');
  var isLocked = xmlDom.createElement('IsLocked');
  var isVisible = xmlDom.createElement('IsVisible');
  var name = xmlDom.createElement('Name');
  var zOrder = xmlDom.createElement('ZOrder');

  ActLayer.appendChild(children)
  ActLayer.appendChild(isFront).textContent = true;
  ActLayer.appendChild(isLocked).textContent = false;
  ActLayer.appendChild(isVisible).textContent = true;
  ActLayer.appendChild(name).textContent = 'Layer 1';
  ActLayer.appendChild(zOrder).textContent = 0;

  children = xmlDom.createElement('Children');
  isFront = xmlDom.createElement('IsFront');
  isLocked = xmlDom.createElement('IsLocked');
  isVisible = xmlDom.createElement('IsVisible');
  name = xmlDom.createElement('Name');
  zOrder = xmlDom.createElement('ZOrder');

  ActiveLayerBack.appendChild(children)
  ActiveLayerBack.appendChild(isFront).textContent = false;
  ActiveLayerBack.appendChild(isLocked).textContent = false;
  ActiveLayerBack.appendChild(isVisible).textContent = true;
  ActiveLayerBack.appendChild(name).textContent = 'Layer 2 (Back)';
  ActiveLayerBack.appendChild(zOrder).textContent = 1;

  layers.forEach(layer => {
    switch (layer.layerName.toLowerCase().replace(/[0-9]/g, '')) {
      case 'panel':
        decodePanel(layer.data, xmlDom);
        break;
      case 'rectangle':
        decodeRect(layer.data, xmlDom);
        break;
      case 'ellipse':
        decodeEllipse(layer.data, xmlDom);
        break;
      case 'picture':
        decodePicture(layer.data, xmlDom);
        break;
      case 'barcode':
        decodeBarcode(layer.data, xmlDom);
        break;
      case 'line':
        decodeLine(layer.data, xmlDom);
        break;
      case 'text':
        decodeText(layer.data, xmlDom);
        break;
    }
  })

  console.log(xmlDom)
  var xmlText = new XMLSerializer().serializeToString(xmlDom);

  var json = await (await fetch('assets/php/save.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: xmlText
  })).json();

  if (json) {
    console.log(json[0]);
    alert('Successfully saved badge you worked with! FileName is ' + json[0] + ' Thanks!.');
    initializeParams();
  }
}



