var gradNo = 0;

const getLinearGradient = rgba => {
  var gradStops = [];

  var stops = node.getElementsByTagName('d5p1:GradientStops')[0].childNodes;
  var activeStop = stops[0];
  for (var i = 0; i < stops.length; i ++) {
      gradStops.push({
          offset: activeStop.getElementsByTagName('d5p1:Offset')[0].textContent,
          style: getColor(activeStop.getElementsByTagName('d5p1:Color')[0])
      });
      activeStop = activeStop.nextSibling;
  }

  var xS = node.getElementsByTagName('d5p1:StartPoint')[0].firstChild.textContent;
  var yS = node.getElementsByTagName('d5p1:StartPoint')[0].lastChild.textContent;
  var xE = node.getElementsByTagName('d5p1:EndPoint')[0].firstChild.textContent;
  var yE = node.getElementsByTagName('d5p1:EndPoint')[0].lastChild.textContent;

  var id = 'grad' + (gradNo++);

  var firstChild = $('svg').children(':first-child');

  var handle;
  if (firstChild[0].tagName === 'defs') {
      handle = svgDom.select('defs');
  } else {
      handle = svgDom.insert('defs', ':first-child');
  }

  var defs = handle.append('linearGradient')
      .attr('id', id)
      .attr('x1', xS)
      .attr('y1', yS)
      .attr('x2', xE)
      .attr('y2', yE)
      
  gradStops.map(value => {
      defs.append('stop')
          .attr('offset', value.offset)
          .attr('style', "stop-color: " + value.style);
  });   

  return "url(#" + id + ")";
}

const getRadialGradient = rgba => {
  var gradStops = [];

  var stops = node.getElementsByTagName('d5p1:GradientStops')[0].childNodes;
  var activeStop = stops[0];
  for (var i = 0; i < stops.length; i ++) {
      gradStops.push({
          offset: activeStop.getElementsByTagName('d5p1:Offset')[0].textContent,
          style: getColor(activeStop.getElementsByTagName('d5p1:Color')[0])
      });        
      activeStop = activeStop.nextSibling;
  }

  var cx = node.getElementsByTagName('d5p1:Center')[0].firstChild.textContent;
  var cy = node.getElementsByTagName('d5p1:Center')[0].lastChild.textContent;
  var fx = node.getElementsByTagName('d5p1:GradientOrigin')[0].firstChild.textContent;
  var fy = node.getElementsByTagName('d5p1:GradientOrigin')[0].lastChild.textContent;

  var r = node.getElementsByTagName('d5p1:RadiusX')[0].firstChild.textContent;

  var id = 'grad' + (gradNo++);

  var firstChild = $('svg').children(':first-child');

  var handle;
  if (firstChild[0].tagName === 'defs') {
      handle = svgDom.select('defs');
  } else {
      handle = svgDom.insert('defs', ':first-child');
  }

  var defs = handle.append('radialGradient')
      .attr('id', id)
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .attr('fx', fx)
      .attr('fy', fy)
      
  gradStops.map(value => {
      defs.append('stop')
          .attr('offset', value.offset)
          .attr('style', "stop-color: " + value.style);
  });   

  return "url(#" + id + ")";
}

const getDynamicColor = stroke => {
  var color;

  if (!stroke) {
    return null;
  }

  if (!stroke.Color || !stroke.Style) {
    return null;
  }

  switch (stroke.Style) {
    case colorStyle[0]:
      color = stroke.Color;
      break;
    case colorStyle[1]:
      color = getLinearGradient(stroke.Color);
      break;
    case colorStyle[2]:
      color = getRadialGradient(stroke.Color);
      break;
  }
  return color;
}

const getEachPixel = color => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const a = parseInt(color.substr(7, 2), 16);
   
  return [r, g, b, a];
}





