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

var printNo = 0;
const panelLine = data => {
    const line = 
      svgDom.append('line')
            .attr('x1', data.Start.x)
            .attr('y1', data.Start.y)
            .attr('x2', data.End.x)
            .attr('y2', data.End.y)
            .attr("z-index", data['Z-Order'])
            .attr('transform', "translate(0, 0)")
            .attr('style', d => {
              return ("stroke: " + getDynamicColor(data.Stroke) + "; stroke-width: " + data.Thickness + "; stroke-dasharray: " + "1 0" + "; stroke-opacity: " + data.Opacity / 100);
            }); 

    if (!data.ObjectName || data.ObjectName === '') {
      data.ObjectName = 'Line' + (printNo ? printNo : '');
      printNo ++;
    }
    line.attr("id", data.ObjectName);
}

const panelRect = data => {
  const rect = 
    svgDom.append('rect')
          .attr('width', data.Size.width)
          .attr("height", data.Size.height)
          .attr('z-index', data['Z-Order'])
          .attr('rx', data.CornerRadius)
          .attr('ry', data.CornerRadius)
          .attr('transform', "translate(" + data.Location.x + ", " + data.Location.y + ") rotate(" + data.Rotation.a + " " + eval(data.Rotation.x + data.Size.width / 2) + " " + eval(data.Rotation.y + data.Size.height / 2) + ')')
          .attr('style', d => {
            return ("fill: " + getDynamicColor(data.Fill) + "; fill-opacity: " + data.Opacity + "; stroke: " + getDynamicColor(data.Outline) + "; stroke-width: " + data.BorderThickness + "; stroke-dasharray: " + data.BorderStyle + "; stroke-alignment: 'inner';");
          });
                      
    if (!data.ObjectName || data.ObjectName === '') {
      data.ObjectName = 'Rect' + (printNo ? printNo : '');
      printNo ++;
    }
    rect.attr("id", data.ObjectName);
}

const panelEllipse = data => {
  console.log(data)
  const cx = data.Size.width / 2;
  const cy = data.Size.height / 2;
  const rx = cx;
  const ry = cy;

  const ellipse = 
    svgDom.append('ellipse')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('rx', rx)
      .attr('ry', ry)
      .attr('z-index', data['Z-Order'])
      .attr('transform', "translate(" + data.Location.x + ", " + data.Location.y + ") rotate(" + data.Rotation.a + " " + eval(data.Rotation.x + data.Size.width / 2) + " " + eval(data.Rotation.y + data.Size.height / 2) + ')')
      .attr('style', d => {
        return ("fill: " + getDynamicColor(data.Fill) + "; fill-opacity: " + data.Opacity + "; stroke: " + getDynamicColor(data.Outline) + "; stroke-width: " + data.BorderThickness + "; stroke-dasharray: " + data.BorderStyle + "; stroke-alignment: 'inner';");
      });
    
  if (!data.ObjectName || data.ObjectName === '') {
    data.ObjectName = 'Ellipse' + (printNo ? printNo : '');
    printNo ++;
  }

  ellipse.attr("id", data.ObjectName);
}

const panelText = async data => {
  var gOut = svgDom.append('g');
  gOut.append('rect');
  var gIn = gOut.append('g');
  gIn.append('rect');
  var text = gIn.append('text');
  
  if (!data.ObjectName || data.ObjectName === '') {
    data.ObjectName = 'Text' + (printNo ? printNo : '');
    printNo ++;
  }

  gOut.attr("id", data.ObjectName)
      .attr('opacity', data.Opacity)
      .attr('z-indx', data['Z-Order'])
      .attr('transform', "translate(" + data.Location.x + ", " + data.Location.y + ") rotate(" + data.Rotation.a + " " + eval(data.Rotation.x + data.Size.width / 2) + " " + eval(data.Rotation.y + data.Size.height / 2) + ')')


  gOut.selectAll('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', data.Size.width)
      .attr("height", data.Size.height)
  
  text.attr("font-size", data.FontSize)
      .attr("font-style", data.FontStyle.toLowerCase())
      .attr("font-weight", data.FontWeight)
      .attr("font-stretch", data.FontStretch.toLowerCase())
      .attr('text-anchor', data.HAlignment.toLowerCase())
      .attr('text-decoration', data.TextDecoration.toLowerCase() === "strikethrough"?"line-through": data.TextDecoration.toLowerCase());

  if (data.FontFamily && data.FontFamily !== '') {
    $('#panel svg').prepend(`<style>svg{stroke:#000;stroke-linecap:round;stroke-linejoin:round;fill:#fff;fill-rule:evenodd;font-family:${data.FontFamily};font-size:14px;text-anchor:middle}svg text{stroke:none}</style>`)
    
    text.attr("font-family", data.FontFamily)
    if ($('#panel svg').children('defs').length === 0) {
      svgDom.insert('defs', ":first-child");
    }

    if (data.FontFamily !== '') {
      var uri = data.FontFamily.replace(/ /g, "+");

      const cssRules = await GFontToDataURI('https://fonts.googleapis.com/css?family=' + uri);

      if (typeof cssRules !== 'string') {
        const xmlns = "http://www.w3.org/2000/svg";
        const defs = $("svg defs");

        const style = document.createElementNS(xmlns, 'style'); 

        style.innerHTML = cssRules.join('\n');
        defs[0].appendChild(style);        
      }  
    }
  }

 var stroke = getDynamicColor(data.Outline);
 if (!stroke) {
    text.attr('fill', 'black')
        .attr('fill-opacity', 1);
  } else {
    text.attr('fill', stroke)
  }

  var halign = data.HAlignment.toLowerCase();        
  var valign = data.VAlignment.toLowerCase(); 
  var wrap = data.TextWrapping.toLowerCase();
  var showBorder = data.ShowBorder;
  var line = parseFloat(data.LineHeight);
  
  var fillColor = getDynamicColor(data.Fill);
  gOut.selectAll('rect').attr('fill', fillColor);

  if (showBorder && (fillColor.split('').reverse().join('').search('00') === 0 || fillColor === 'none' || fillColor.search('#ffffff') === 0)) {
    gOut.selectAll('rect')
        .attr('stroke', "#cdcdcd")
        .attr("stroke-alignment", 'inner')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)
        .attr('stroke-dasharray', 2*1.7695275590551178 + " " + 1*1.7695275590551178);
  } else {
    gOut.selectAll('rect').attr('stroke', "none");        
  }
  
  if (data.DesignerText && data.DesignerText !== '') {
    text.append('tspan').text(data.DesignerText);
    var rect = gOut.select('rect')

    d3plus.textwrap()
        .container(text)
        .align(halign)
        .valign(valign)
        .width(parseFloat(rect.attr('width')))
        .height(parseFloat(rect.attr('height')))
        .fontSizeRange([1, 1000])
        .lineHeight(line)
        .resize(wrap === "resize" ? true : false)
        .draw();
  }
  
  if (wrap === 'fixed') {
    text.attr('font-size', data.FontSize);
  }
}

const panelPicture = data => { 
  const property = $('#property');
  var file = property.find('#DesignerSource'); 

  file.trigger('click');
  file.change(function(e) {
    var g = svgDom.append('g');
    var image = g.append('image');
    var rect = g.append('rect');

    var x = parseFloat(data.Location.x);
    var y = parseFloat(data.Location.y);

    w = parseFloat(data.Size.width);
    h = parseFloat(data.Size.height);
            

    var id;
    if (!data.ObjectName || data.ObjectName === '') {
      id = 'Image' + (printNo ? printNo : '');
      printNo ++;
    }
    
    g.attr("id", id)
      .attr('opacity', data.Opacity)
      .attr('z-indx', data['Z-Order'])
      .attr('transform', "translate(" + x + ", " + y + ") rotate(" + data.Rotation.a + " " + eval(data.Rotation.x + w / 2) + " " + eval(data.Rotation.y +h / 2) + ')');

    rect.attr('width', w)
        .attr('height', h)
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', 'none')
        .attr('stroke', 'none');
            
    var  color = getEachPixel(data.TransparencyColor);
    var tolerance = parseInt(data.TransparencyTolerance);
    var  stretch = data.Stretch.toLowerCase();
    var designerSource = data.DesignerSource;

    const formdata = new FormData();

    formdata.append('files[]', e.target.files[0], e.target.files[0].name);
    
    fetch('index.php', {
        method: 'POST',
        body: formdata
    })
    .then(response => response.json())
    .then(data => {
      var img = new Image();
      img.src = "data:image/jpeg;base64," + data[0];
      img.onload = function() {
        draw(this);
      };
      
      const draw = async img => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        img.style.display = 'none';
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data_color = imageData.data;
              
        var imgProcess = function() {                
          for (var i = 0; i < data_color.length; i += 4) {
            if (Math.max(Math.abs(data_color[i] - color[0]), Math.abs(data_color[i+1] - color[1]), Math.abs(data_color[i+2] - color[2])) < tolerance) {
              data_color[i + 3] = 0;
            }
          }
          ctx.putImageData(imageData, 0, 0);
        };
          
        if (color[3] !== 0) {
          imgProcess();
        }

        const srcLast = await fetchImage(canvas.toDataURL("image/png", 1.0), 'jpeg');

        const imgLast = new Image();
        imgLast.onload = function() {
          image.attr('x', 0)
              .attr('y', 0)
              .attr('height', h)
              .attr('width', w)
              .attr('href', srcLast);

          switch (stretch) {
            case 'uniform':
              image.attr('preserveAspectRatio', "xMidYMid meet");
              break;      
            case 'uniformtofill':
              if (w > h) {
                image.attr('preserveAspectRatio', "xMidYMin slice");    
              } else {
                image.attr('preserveAspectRatio', 'xMinYMid slice');
              }    
              break;
            case 'fill':
              image.attr('preserveAspectRatio', 'none');
              break;
            case 'none':
              var realW = 0.32 * imgLast.width;
              var realH = 0.32 * imgLast.height;
              
              image.attr('x', (w - realW) / 2 > 0 ? (w - realW) / 2 : 0)
                  .attr('y', (h - realH) / 2 > 0  ? (h - realH) / 2 : 0)
                  .attr('height', realH)
                  .attr("width", realW)
                  .attr('preserveAspectRatio', 'none')
                  
              var defs;
              if ($('svg').children('defs').length !== 0) {
                defs = svgDom.select('defs');
              } else {
                defs = svgDom.insert('defs', ':first-child');
              }
              
              defs.append('clipPath')
                  .attr("id", id)
                  .append('rect')
                  .attr('x', (w - realW) / 2 > 0 ? (w - realW) / 2 : 0)
                  .attr('y', (h - realH) / 2 > 0  ? (h - realH) / 2 : 0)
                  .attr('width', w)
                  .attr("height", h);

              image.attr('clip-path', 'url(#' + id + ')');
              break;
          }
        };

        imgLast.src = srcLast;   
      } 
    })    
  })
}

const panelBarcode = data => {
  var g = svgDom.append('g');
  var image = g.append('image');
  var rect = g.append('rect');

  var x = parseFloat(data.Location.x);
  var y = parseFloat(data.Location.y);

  w = parseFloat(data.Size.width);
  h = parseFloat(data.Size.height);
          
  var name;
  if (!data.ObjectName || data.ObjectName === '') {
    id = 'Barcode' + (printNo ? printNo : '');
    printNo ++;
  }
  
  g.attr("id", name)
    .attr('opacity', data.Opacity)
    .attr('z-indx', data['Z-Order'])
    .attr('transform', "translate(" + x + ", " + y + ") rotate(" + data.Rotation.a + " " + eval(data.Rotation.x + w / 2) + " " + eval(data.Rotation.y +h / 2) + ')');

  rect.attr('width', w)
      .attr('height', h)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'none')
      .attr('stroke', 'none');   
        
  var barcodeType =  data.Type.toLowerCase();       
  var designerData = data.DesignData;
  var stretch = data.Stretch.toLowerCase();

  var url;
  if (designerData && designerData !== '') {   
    var id;
    switch (barcodeType) {
      case 'qr_code':
        id = 'qrcode';
        break;
      case 'code_39':
        id = 'code39';
        break;
      case 'code_128':
        id = 'code128';
        break;
      case 'data_matrix':
        id = 'datamatrix';
        break;
      case 'itf':
        id = 'interleaved2of5';
        break;
      case 'pdf_417':
        id = 'pdf417';
        break;
      case 'msi':
        id = 'msi';
        break;
      case 'plessey':
        id = 'plessey';
        break;
      case 'ean_8':
        id = 'ean8';
        break;
      case 'ean_13':
        id = 'ean13';
        break;
      case 'upc_a':
        id = 'upca';
        break;
    }

    url = genBarcode(designerData, id);
      
    const imgLast = new Image();
    imgLast.onload = function() {
      image.attr('x', 0)
          .attr('y', 0)
          .attr('height', h)
          .attr('width', w)
          .attr('href', url);

      switch (stretch) {
        case 'none':
          var realW = 0.32 * imgLast.width;
          var realH = 0.32 * imgLast.height;
          
          image.attr('x', (w - realW) / 2 > 0 ? (w - realW) / 2 : 0)
              .attr('y', (h - realH) / 2 > 0  ? (h - realH) / 2 : 0)
              .attr('height', realH)
              .attr("width", realW)
              .attr('preserveAspectRatio', 'none');
                
          var defs;
          if ($('svg').children('defs').length !== 0) {
            defs = svgDom.select('defs');
          } else {
            defs = svgDom.insert('defs', ':first-child');
          }
          
          defs.append('clipPath')
              .attr("id", name)
              .append('rect')
              .attr('x', (w - realW) / 2 > 0 ? (w - realW) / 2 : 0)
              .attr('y', (h - realH) / 2 > 0  ? (h - realH) / 2 : 0)
              .attr('width', w)
              .attr("height", h)

          image.attr('clip-path', 'url(#' + name + ')')
          break;
        case 'fill':
          image.attr('preserveAspectRatio', 'none')
          break;
        case 'uniformtofill':
          if (w > h) {
            image.attr('preserveAspectRatio', 'xMidYMin slice')
          } else {
            image.attr("preserveAspectRatio", 'xMinYMid slice');
          }
          break;
        case 'uniform':
          image.attr('preserveAspectRatio', 'xMidYMid meet');
          break;
      }
    };

    imgLast.src = url;
  }
}


const initPanel = async () => {
  const xmlns = "http://www.w3.org/2000/svg";

  svgDom = d3.select('#panel')
          .append('svg')
          .attr('xmlns', xmlns)
          .attr('xmlns:v', "http://vecta.io")
          .attr("width", present_panel.Width)
          .attr("height", present_panel.Height)
          .attr('opacity', present_panel.Opacity)
          .attr('font-family', present_panel.DefaultFont)
          .attr("font-size", present_panel.DefaultFontSize)
          .attr('viewBox', "0 0 " + present_panel.Width + ' ' + present_panel.Height)
  
  const font_url = "https://fonts.googleapis.com/css?family=" + present_panel.DefaultFont;
  const cssRules = await GFontToDataURI(font_url);
  if (typeof cssRules !== 'string') {
    svgDom.prepend(`<style>svg{stroke:#000;stroke-linecap:round;stroke-linejoin:round;fill:#fff;fill-rule:evenodd;font-family:${present_panel.DefaultFont};font-size:14px;text-anchor:middle}svg text{stroke:none}</style>`)

    svgDom.append('defs')
          .append('style')
          .text(cssRules.join('\n'));
  }
}

const GFontToDataURI = async url => {
  return fetch(url)
    .then(resp => resp.text())
    .then(text => {
      if (text.search('The requested URL was not found on this server.') > -1) {
        return 'error';
      }

      let s = document.createElement('style');
      s.innerHTML = text;
      document.head.appendChild(s);
      let styleSheet = s.sheet;

      let FontRule = rule => {
        if (rule.style) {
          let src = rule.style.getPropertyValue('src') || rule.style.cssText.match(/url\(.*?\)/g)[0];
          if (!src) return null;
          let url = src.split('url(')[1].split(')')[0];
          return {
            rule: rule,
            src: src,
            url: url.replace(/\"/g, '')
          };
      }
      };
      let fontRules = [],
        fontProms = [];

      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        let r = styleSheet.cssRules[i];
        let fR = FontRule(r);

        if (!fR) {
            continue;
        }

        fontRules.push(fR);
        fontProms.push(
        fetch(fR.url)
          .then(resp => resp.blob())
          .then(blob => {
            return new Promise(resolve => {                
              let f = new FileReader();
              f.onload = e => resolve(f.result);
              f.readAsDataURL(blob);
            })
          })
          .then(dataURL => {
            return fR.rule.cssText.replace(fR.url, dataURL);
          })
        )
      }

      document.head.removeChild(s);
      
      return Promise.all(fontProms);
  });
}