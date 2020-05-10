const getSolidColor = (color, opacity) => {
  return color + opacity;
}

const getLinearGradient = (id, type, data) => {
  var color1 = data[0] + data[2];
  var color2 = data[1] + data[3];
  var stop1 = data[4] + '%';
  var stop2 = data[5] + '%';

  var no = id + type;

  var firstChild = $('svg').children(':first-child');

  var handle;
  if (firstChild[0].tagName === 'defs') {
      handle = svgDom.select('defs');
  } else {
      handle = svgDom.insert('defs', ':first-child');
  }

  $('svg').find('linearGradient')
    .each((index, lin) => {
      if ($(lin).attr("id") === no) $(lin).remove();
    })
  
  var defs = handle.append('linearGradient')
      .attr('id', no)
      .attr('x1', stop1)
      .attr('y1', '0%')
      .attr('x2', stop2)
      .attr('y2', '0%')
  
  defs.append('stop')
      .attr('offset', '0%')
      .attr('style', "stop-color: " + color1);

  defs.append('stop')
      .attr('offset', '100%')
      .attr('style', "stop-color: " + color2);

  return "url(#" + no + ")";
}

const getRadialGradient = (id, type, data) => {
  var color1 = data[0] + data[2];
  var color2 = data[1] + data[3];
  var stop1 = data[4] + '%';
  var stop2 = data[5] + '%';

  var no = id + type;

  var firstChild = $('svg').children(':first-child');

  var handle;
  if (firstChild[0].tagName === 'defs') {
      handle = svgDom.select('defs');
  } else {
      handle = svgDom.insert('defs', ':first-child');
  }

  $('svg').find('radialGradient')
    .each((index, lin) => {
      if ($(lin).attr("id") === no) $(lin).remove();
    })

  var defs = handle.append('radialGradient')
      .attr('id', no)
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%')
      .attr('fx', stop1)
      .attr('fy', stop2)
      
  defs.append('stop')
      .attr('offset', '0%')
      .attr('style', "stop-color: " + color1);

  defs.append('stop')
      .attr('offset', '100%')
      .attr('style', "stop-color: " + color2);

  return "url(#" + no + ")";
}

const getDynamicColor = (id, type, fill) => {
  var data = fill.Color;
  var style = fill.Style;

  var color = data.split(' ');
  if (!color[1] && color[3]) {
    return getSolidColor(color[0], color[2]);
  }

  switch (style) {
    case colorStyle[0]:
      return getSolidColor(color[0], color[2]);
    case colorStyle[1]:
      return getLinearGradient(id, type, color);
    case colorStyle[2]:
      return getRadialGradient(id, type, color);
  }
}

const getEachPixel = data => {
  var temp = data.split(' ');
  var color = temp[0];
  var opacity = temp[2];

  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const a = parseInt(opacity, 16);
   
  return [r, g, b, a];
}





