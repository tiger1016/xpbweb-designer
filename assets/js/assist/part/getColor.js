const getSolidColor = color => {
  return color;
}

const getLinearGradient = (id, type, data) => {
  var no = id + type;

  var firstChild = $('svg').children(':first-child');

  var handle;
  if (firstChild[0].tagName === 'defs') {
      handle = svgDom.select('defs');
  } else {
      handle = svgDom.insert('defs', ':first-child');
  }

  $('svg').find('defs').children()
    .each((index, lin) => {
      if ($(lin).attr("id") === no) $(lin).remove();
    })
  
  var defs = handle.append('linearGradient')
      .attr('id', no)
      .attr('x1', data[1] + '%')
      .attr('y1', data[2] + '%')
      .attr('x2', data[3] + '%')
      .attr('y2', data[4] + '%')

  var coln = parseInt(data[0]);  
  for (var i = 0; i < coln; i ++) {
    defs.append('stop')
      .attr('offset', data[7+i*2] + '%')
      .attr('style', "stop-color: " + data[6+i*2]);
  }

  return "url(#" + no + ")";
}


const getRadialGradient = (id, type, data) => {
  var no = id + type;

  var firstChild = $('svg').children(':first-child');

  var handle;
  if (firstChild[0].tagName === 'defs') {
      handle = svgDom.select('defs');
  } else {
      handle = svgDom.insert('defs', ':first-child');
  }

  $('svg').find('defs').children()
    .each((index, lin) => {
      if ($(lin).attr("id") === no) $(lin).remove();
    })

  var defs = handle.append('radialGradient')
      .attr('id', no)
      .attr('cx', data[1] + '%')
      .attr('cy', data[2] + '%')
      .attr('r', data[5] + '%')
      .attr('fx', data[3] + '%')
      .attr('fy', data[4] + '%')
      
  var coln = parseInt(data[0]);  
  for (var i = 0; i < coln; i ++) {
    defs.append('stop')
      .attr('offset', data[7+i*2] + '%')
      .attr('style', "stop-color: " + data[6+i*2]);
  }

  return "url(#" + no + ")";
}

const getDynamicColor = (id, type, fill) => {
  var data = fill.Color;
  var style = fill.Style;

  var color = data.split(' ');

  switch (style) {
    case colorStyle[0]:
      return getSolidColor(color[6]);
    case colorStyle[1]:
      return getLinearGradient(id, type, color);
    case colorStyle[2]:
      return getRadialGradient(id, type, color);
  }
}

const getEachPixel = data => {
  var color = data.split(' ')[6];
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const a = parseInt(color.substr(7), 16);
   
  return [r, g, b, a];
}


const getXMLColor = node => {
  var a = parseInt(node.getElementsByTagName('d5p1:A')[0].textContent).toString(16);
  var r = parseInt(node.getElementsByTagName('d5p1:R')[0].textContent).toString(16);
  var g = parseInt(node.getElementsByTagName('d5p1:G')[0].textContent).toString(16);
  var b = parseInt(node.getElementsByTagName('d5p1:B')[0].textContent).toString(16);

  return '#' + (r==0?'00':r) + (g==0?'00':g) + (b==0?'00':b) + (a==0?'00':a);
}

const getXMLSolidColor = node => {
  var a = parseInt(node.getElementsByTagName('d5p1:A')[0].textContent).toString(16);
  var r = parseInt(node.getElementsByTagName('d5p1:R')[0].textContent).toString(16);
  var g = parseInt(node.getElementsByTagName('d5p1:G')[0].textContent).toString(16);
  var b = parseInt(node.getElementsByTagName('d5p1:B')[0].textContent).toString(16);

  return '2 0 0 100 0 0 #' + (r==0?'00':r) + (g==0?'00':g) + (b==0?'00':b) + (a==0?'00':a);
}

const getXMLLinearGradient = node => {
  var gradStops = [];

  var stops = node.getElementsByTagName('d5p1:GradientStops')[0].childNodes;
  var activeStop = stops[0];
  for (var i = 0; i < stops.length; i ++) {
      gradStops.push({
          offset: parseFloat(activeStop.getElementsByTagName('d5p1:Offset')[0].textContent)*100,
          style: getXMLColor(activeStop.getElementsByTagName('d5p1:Color')[0])
      });
      activeStop = activeStop.nextSibling;
  }

  var xS = parseFloat(node.getElementsByTagName('d5p1:StartPoint')[0].firstChild.textContent)*100;
  var yS = parseFloat(node.getElementsByTagName('d5p1:StartPoint')[0].lastChild.textContent)*100;
  var xE = parseFloat(node.getElementsByTagName('d5p1:EndPoint')[0].firstChild.textContent)*100;
  var yE = parseFloat(node.getElementsByTagName('d5p1:EndPoint')[0].lastChild.textContent)*100;

  var result = gradStops.length + ' ' + xS + ' ' + yS + " " + xE + ' ' + yE + ' 0';
  gradStops.map((element, index) => {
    result += ' ' + element.style + ' ' + element.offset;
  })

  return result;
}

const getXMLRadialGradient = node => {
  var gradStops = [];

  var stops = node.getElementsByTagName('d5p1:GradientStops')[0].childNodes;
  var activeStop = stops[0];
  for (var i = 0; i < stops.length; i ++) {
      gradStops.push({
          offset: parseFloat(activeStop.getElementsByTagName('d5p1:Offset')[0].textContent)*100,
          style: getXMLColor(activeStop.getElementsByTagName('d5p1:Color')[0])
      });        
      activeStop = activeStop.nextSibling;
  }

  var cx = parseFloat(node.getElementsByTagName('d5p1:Center')[0].firstChild.textContent)*100;
  var cy = parseFloat(node.getElementsByTagName('d5p1:Center')[0].lastChild.textContent)*100;
  var fx = parseFloat(node.getElementsByTagName('d5p1:GradientOrigin')[0].firstChild.textContent)*100;
  var fy = parseFloat(node.getElementsByTagName('d5p1:GradientOrigin')[0].lastChild.textContent)*100;
  var r = parseFloat(node.getElementsByTagName('d5p1:RadiusX')[0].firstChild.textContent)*100;
  
  var result = gradStops.length + ' ' + cx + ' ' + cy + " " + fx + ' ' + fy + ' ' + r;
  
  gradStops.map((element, index) => {
    result += ' ' + element.style + ' ' + element.offset;
  })
  
  return result;
}

const getXMLDynamicColor = now => {
  var Color, Style;

  if (now.attributes.getNamedItem('i:type').nodeValue === "d5p1:SolidColorBrush") {                        
      Style = 'SolidColor';
      Color = getXMLSolidColor(now);
  } else if (now.attributes.getNamedItem('i:type').nodeValue === "d5p1:LinearGradientBrush") {                        
      Style = 'LinearGradientColor';
      Color = getXMLLinearGradient(now);
  } else if (now.attributes.getNamedItem('i:type').nodeValue === "d5p1:RadialGradientBrush") {
      Style = 'RadialGradientColor';
      Color = getXMLRadialGradient(now);
  }

  return { Style, Color };
}
