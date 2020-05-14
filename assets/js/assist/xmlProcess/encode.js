const parseRectAndEllipse =  (parentNode, layers) => {
  const nodes = parentNode.childNodes;
  var now = parentNode.firstChild;

  var shape = 'rect';

  if (parentNode.attributes.getNamedItem('i:type').nodeValue === "Ellipse") {
    shape = 'ellipse';
  }
  else {
    shape = 'rect';
  }

  var layerName;
  var data = {};
  var x, y, w, h, rotX, rotY, rotA, fillOpacity, fillColor, strokeOpacity, strokeColor, r;

  for (var i = 0; i < nodes.length; i ++) {        
    if (now.nodeType === 1) {
      switch (now.nodeName) {
        case 'Location':
          x = parseFloat(now.firstChild.textContent);
          y = parseFloat(now.lastChild.textContent);
          break;
        case 'Name':
          layerName = now.textContent.toLowerCase();
          break;
        case 'Opacity':
          data['Opacity'] = parseFloat(now.textContent)*100;
          break;
        case 'Size':
          w = parseFloat(now.getElementsByTagName('Width')[0].textContent);
          h = parseFloat(now.getElementsByTagName('Height')[0].textContent);
          break;
        case 'ZOrder':
          data['Z-Order'] = now.textContent;
          break;
        case 'PivotX':
          rotX = parseFloat(now.textContent);
          break;
        case 'PivotY':
          rotY = parseFloat(now.textContent);
          break;
        case 'Rotation':
          rotA = parseFloat(now.textContent);
          break;
        case 'BorderStyle':
          var active = now.firstChild;
          var temp = [];
          for (var j = 0; j < now.childNodes.length; j ++) {
            temp.push(parseFloat(active.textContent)*5.795275590551178);
            active = active.nextSibling;
          }

          data['BorderStyle'] = temp.length ? temp.join(' ') : '0';
          break;
        case 'BorderThickness':
          data['BorderThickness'] = now.textContent;
          break;
        case 'Fill':
          if (now.textContent === "") {
            data['Fill'] = {
              Style: 'SolidColor',
              Color: '#ffffff00'
            };
            break;
          }

          data['Fill'] = getXMLDynamicColor(now);
          break;
        case 'Stroke':
          if (now.textContent === "") {
            data['Outline'] = {
              Style: 'SolidColor',
              Color: '#000000ff'
            }
            break;
          }

          data['Outline'] = getXMLDynamicColor(now);
          break;
        case 'CornerRadius':
          data['rx'] = now.textContent;
          data['ry'] = now.textContent;
          break;
      }
    }

    now = now.nextSibling;
  }


  if (shape === 'ellipse') {
    data['cx'] = w / 2;
    data['cy'] = h / 2;
    data['rx'] = w / 2;
    data['ry'] = h / 2;
  } else {
    data['Size'] = {
      width: w,
      height: h
    };
    data['Location'] = { x, y };
  }

  data['Rotation'] = {
    a: rotA,
    x: rotX,
    y: rotY
  };

  layers.push({ layerName, data });
}

const parseLine = (parentNode, layers) => {
  var x, y;
  const nodes = parentNode.childNodes;
  var now = parentNode.firstChild;
  
  var layerName;
  var data = {};

  for (var i = 0; i < nodes.length; i ++) {        
    if (now.nodeType === 1) {
      switch (now.nodeName) {            
        case 'Name':
          layerName = now.textContent.toLowerCase();
          break;
        case "Location":
          x = now.firstChild.textContent;
          y = now.lastChild.textContent;
          data['Location'] = { x, y };
          break;
        case 'Opacity':
          data['Opacity'] = parseFloat(now.textContent)*100;
          break;                
        case 'ZOrder':
          data['Z-Order'] = now.textContent;
          break;                
        case 'BorderStyle':
          var active = now.firstChild;
          var temp = [];

          for (var j = 0; j < now.childNodes.length; j ++) {
            temp.push(parseFloat(active.textContent)*5.795275590551178);
            active = active.nextSibling;
          }

          data['Style'] = temp.length ? temp.join(',') : '0';
          break;
        case 'Thickness':
          data['Thickness'] = now.textContent;
          break;                
        case 'Stroke':
          if (now.textContent === "") {
            data['Stroke'] = {
              Style: 'SolidColor',
              Color: '#000000ff'
            }
            break;
          }

          data['Stroke'] = getXMLDynamicColor(now);
          break;
        case "X1":
          x1 = now.textContent;
          break;
        case "X2":
          x2 = now.textContent;
          break;
        case "Y1":
          y1 = now.textContent;
          break;
        case 'Y2':
          y2 = now.textContent;
          break;
      }
    }

    now = now.nextSibling;
  }

  data['Start'] = {
    x: x1,
    y: y1
  };
  data['End'] = {
    x: x2,
    y: y2
  };

  layers.push({ layerName, data });
}

const parseLabel = async (parentNode, layers) => { 
  var rotX, rotY, rotA, x, y;
  const nodes = parentNode.childNodes;
  var now = parentNode.firstChild;
    
  var layerName;
  var data = [];

  for (var i = 0; i < nodes.length; i ++) {        
    if (now.nodeType === 1) {
      switch (now.nodeName) {
        case 'Location':
          x = parseFloat(now.firstChild.textContent);
          y = parseFloat(now.lastChild.textContent);
          data['Location'] = { x, y };
          break;
        case 'Name':
          layerName = now.textContent.toLowerCase().replace(/label/g, 'text');
          break;
        case 'Opacity':
          data["Opacity"] = parseFloat(now.textContent)*100;
          break;
        case 'Size':
          data['Size'] = {
            width: parseFloat(now.getElementsByTagName('Width')[0].textContent),
            height: parseFloat(now.getElementsByTagName('Height')[0].textContent)
          };
          break;
        case 'ZOrder':
          data['Z-Order'] = now.textContent;
          break;
        case 'PivotX':
          rotX = parseFloat(now.textContent);
          break;
        case 'PivotY':
          rotY = parseFloat(now.textContent);
          break;
        case 'Rotation':
          rotA = parseFloat(now.textContent);
          break;
        case 'DesignerText':
          data['DesignerText'] = now.textContent;                  
          break;
        case "Text":
          data['PrintText'] = now.textContent;
          break;
        case 'Fill':
          if (now.textContent === "") {
            data['Fill'] = {
              Style: 'SolidColor',
              Color: '#ffffff00'
            };
            break;
          }

          data['Fill'] = getXMLDynamicColor(now);
          break;
        case 'Stroke':
          if (now.textContent === "") {
            data['Outline'] = {
              Style: 'SolidColor',
              Color: '#000000ff'
            }
            break;
          }

          data['Outline'] = getXMLDynamicColor(now);
          break;
        case "FontFamilyAsString":
          data['FontFamily'] = now.textContent;
          break;
        case "FontSize":
          data['FontSize'] = now.textContent;
          break;
        case 'FontWeightAsString':
          var weight = now.textContent.toLowerCase();
          var table = {
                        extrabold: 800,
                        extralight: 200,
                        black: 900,
                        light: 300,
                        medium: 500,
                        normal: 400,
                        semibold: 600,
                        thin: 100,
                        bold: 700
                      }
          data['FontWeight'] = table[weight];
          break;
        case 'FontStyleAsString':
          if (now.textContent !== '') {
            data['FontStyle'] = now.textContent;   
          }                 
          break;
        case "FontStretchAsString":
          var stretch = now.textContent.toLowerCase();
          var table = {
                        normal: 'normal',
                        condensed: 'condensed',
                        expanded: 'expanded',
                        semiexpanded: 'semi-expanded',
                        semicondensed: 'semi-condensed',
                        extracondensed: 'extra-condensed',
                        extraexpanded: 'extra-expanded',
                        ultracondensed: 'ultra-condensed',
                        ultraexpanded: 'ultra-expanded',
                      }
          data['FontStretch'] = table[stretch];
          break;
        case "VerticalAlignment":
          data['VAlignment'] = now.textContent === 'Center' ? 'Middle' : now.textContent;
          break;
        case "TextAlignment":
          data['HAlignment'] = now.textContent;
          break;
        case "TextDecoration":                    
          data['TextDecoration'] = now.textContent;
          break;
        case 'TextWrapping':
          data['TextWrapping'] = now.textContent.search('Wrap') === 0 ? 'Resize' : 'Fixed';
          break;
        case "ShowBorder":
          data['ShowBorder'] = now.textContent === 'false' ? false : true;
          break;
        case "LineHeight":
          data['LineHeight'] = parseFloat(now.textContent);
          break;
      }
    }

    now = now.nextSibling;
  }  
  
  data['Rotation'] = {
    a: rotA,
    x: rotX,
    y: rotY
  };

  layers.push({ layerName, data });
}

const parseImage = (parentNode, layers) => {   
  var rotX, rotY, rotA, x, y;
  var nodes = parentNode.childNodes;
  var now = parentNode.firstChild;

  var layerName;
  var data = {};
    
  for (var i = 0; i < nodes.length; i ++) {
    if (now.nodeType === 1) {
      switch (now.nodeName) {
        case 'Location':
          x = parseFloat(now.firstChild.textContent);
          y = parseFloat(now.lastChild.textContent);
          data['Location'] = { x, y };
          break;
        case 'Size':
          data['Size'] = {
            width: parseFloat(now.getElementsByTagName('Width')[0].textContent),
            height: parseFloat(now.getElementsByTagName('Height')[0].textContent)
          };
          break;
        case 'Name':
          layerName = now.textContent.toLowerCase().replace(/image/g, 'picture');
          break;
        case 'Opacity':
          data['Opacity'] = parseFloat(now.textContent)*100;
          break;
        case 'ZOrder':
          data['Z-Order'] = now.textContent;
          break;
        case 'Rotation':
          rotA = parseFloat(now.textContent);
          break;
        case "PivotX":
          rotX = parseFloat(now.textContent);
          break;
        case "PivotY":      
          rotY = parseFloat(now.textContent);
          break;
        case "DesignerSource":
          data['DesignerSource'] = [ 'Unknown', now.textContent ];
          break;
        case "Source":
          data['Source'] = now.textContent;
          break;
        case "TransparencyColor":
          data['TransparencyColor'] = getXMLSolidColor(now);
          break;
        case 'TransparencyTolerance':
          data['TransparencyTolerance'] = parseFloat(now.textContent);
          break;
        case 'Stretch':
          data['Stretch'] = now.textContent;
          break;
      }
    }

    now = now.nextSibling;
  }

  data['Rotation'] = {
    a: rotA,
    x: rotX,
    y: rotY
  };

  layers.push({ layerName, data });
}

const parseBarcode = (parentNode, layers) => {
  var rotA, rotX, rotY, x, y;
  var nodes = parentNode.childNodes;
  var now = parentNode.firstChild;

  var layerName;
  var data = {};

  for (var i = 0; i < nodes.length; i ++) {
    if (now.nodeType === 1) {
      switch (now.nodeName) {
        case 'Name':
          layerName = now.textContent.toLowerCase();
          break;
        case 'Opacity':
          data['Opacity'] = parseFloat(now.textContent)*100;
          break;
        case 'Location':
          x = parseFloat(now.firstChild.textContent);
          y = parseFloat(now.lastChild.textContent);
          data['Location'] = { x, y };
          break;
        case 'Size':
          data['Size'] = {
            width: parseFloat(now.getElementsByTagName('Width')[0].textContent),
            height: parseFloat(now.getElementsByTagName('Height')[0].textContent)
          };
          break;
        case 'ZOrder':
          data['Z-Order'] = now.textContent;
          break;
        case 'PivotX':
          rotX = parseFloat(now.textContent);
          break;
        case 'PivotY':
          rotY = parseFloat(now.textContent);
          break;
        case 'Rotation':
          rotA = parseFloat(now.textContent);
          break;
        case 'BarcodeType':
          data['Type'] = now.textContent;
          break;
        case 'DesignerData':
          data['DesignData'] = now.textContent;
          break;
        case "Data":
          data['Data'] = now.textContent;
          break;
        case "Stretch":
          data['Stretch'] = now.textContent;
          break;
      }
    }

    now = now.nextSibling;
  }

  data['Rotation'] = {
    a: rotA,
    x: rotX,
    y: rotY
  };

  layers.push({ layerName, data });
}
