var action_mode = true;

const selectRect = (id, data) => {
  $('#selected').remove();

  if (id.toLowerCase().replace(/[0-9]/g, '') === 'line') {
    svgDom.append('line')
          .attr("id", 'selected')
          .attr('x1', data.Start.x)
          .attr("y1", data.Start.y)
          .attr("x2", data.End.x)
          .attr("y2", data.End.y)
          .attr("stroke", "#f22311")
          .attr("stroke-width", data.Thickness + 6)
          .attr("stroke-opacity",'0.5')
  } else {
    svgDom.append('g')
          .attr('id', 'selected')
          .attr('transform', "translate(" + data.Location.x + ", " + data.Location.y + ") rotate(" + data.Rotation.a + " " + eval(data.Rotation.x + data.Size.width / 2) + " " + eval(data.Rotation.y + data.Size.height / 2) + ')')
          .append('rect')
          .attr('width', data.Size.width)
          .attr('height', data.Size.height)
          .attr('fill', '#11111122')
          .attr("stroke", "#f22311")
          .attr("stroke-width", 3)
          .attr("stroke-opacity",'0.5')
  }

  $('#selected').mousemove(function(e) {   
    var curX = e.offsetX;
    var curY = e.offsetY; 
    
    var pos;
    if (e.target.tagName === 'line') {
      var x1 = parseFloat($(e.target).attr("x1"));
      var x2 = parseFloat($(e.target).attr("x2"));
      var y1 = parseFloat($(e.target).attr("y1"));
      var y2 = parseFloat($(e.target).attr("y2"));

      
      if (Math.pow(curX - x1, 2) + Math.pow(curY - y1, 2) < 150) {
        $(e.target).attr("type", true);
        pos = 'LR';
      } else if (Math.pow(curX - x2, 2) + Math.pow(curY - y2, 2) < 150) {
        $(e.target).attr("type", false);
        pos = 'LR';
      } else pos = 'C';
    } else {
      const transform = $(this).attr("transform");
      const value = getTransformVal(transform);

      const width = parseFloat($(this).children('rect').attr('width'));
      const height = parseFloat($(this).children('rect').attr('height'));

      pos = getPosition(curX, curY, value[0], value[1], width, height);
    }

    switch (pos) {
      case 'N': 
        this.style.cursor = 'n-resize';
        break;
      case 'S':
        this.style.cursor = 's-resize';
        break;
      case 'E': 
        this.style.cursor = 'e-resize';
        break;
      case 'W':
        this.style.cursor = 'w-resize';
        break;
      case 'WN': 
        this.style.cursor = 'nw-resize';
        break;
      case 'ES':
        this.style.cursor = 'se-resize';
        break;
      case 'EN':
        this.style.cursor = 'ne-resize';
        break;
      case 'WS':
        this.style.cursor = 'sw-resize';
        break;
      case 'C':
        this.style.cursor = 'url(assets/icons/mouse-move.svg) 27 27, move';
        break;
      case 'LR':
        this.style.cursor = 'crosshair';
        break;
      case 'R':
        this.style.cursor = 'url(assets/icons/arrows.svg) 28 28, auto';
        break;
    }
  });

  if (action_mode) {
    action_mode = false;
    action();
  }
}

const action = () => {
  var x, y;
  var clicked_down = false;

  $('#panel svg').mousedown(function(e) {
    if ($(e.target).parent().attr("id") === 'selected' || (e.target.tagName === 'line' && $(e.target).attr("id") === 'selected')) {
      clicked_down = true;
      x = e.offsetX;
      y = e.offsetY;
      this.style.cursor = $('#selected')[0].style.cursor;
    }   
  });

  $('#panel svg').mousemove(function(e) {
    if (clicked_down) {
      if (this.style.cursor.search('move') > -1) {
        move(e.offsetX - x, e.offsetY - y);
        x = e.offsetX;
        y = e.offsetY;
      } else if (this.style.cursor.search('resize') > -1 || this.style.cursor === 'crosshair') {
        resize(this.style.cursor, e.offsetX, e.offsetY);        
      }  else {
        rotate(x, y, e.offsetX, e.offsetY);
      }
    }
  })

  $('#panel svg').mouseup(function(e) {
    clicked_down = false;
    $('svg')[0].style.cursor = 'auto';
  });
}

const getPosition = (x, y, oX, oY, w, h) => {
  const delta = 5;

  var pos = null;

  if (x - oX < delta) {
    if (y - oY< delta) pos = 'WN';
    else if (y - oY >= delta && y - oY < h - delta) pos = 'W';
    else pos = 'WS'
  } else if (x - oX >= delta && x - oX < w - delta) {
    if (y - oY < delta) pos = 'N';
    else if (y - oY >= delta && y - oY < h - delta) pos = 'C';
    else pos = 'S';
  } else {
    if (y - oY < delta) pos = 'EN';
    else if (y - oY >= delta && y - oY < h - delta) pos = 'E';
    else pos = 'ES'
  }

  if (Math.pow(oX + w / 2 - x, 2) + Math.pow(oY + h / 2 - y, 2) < 100) pos = "R";

  return pos;
}

const move = (delta_x, delta_y) => {
  var data = null;

  if (activeLayer.layerName.toLowerCase().replace(/[0-9]/g, '') === 'line') {
    const line_selected = svgDom.select('#selected');
    line_selected.attr('x1', parseFloat(line_selected.attr('x1')) + delta_x)
                .attr("y1", parseFloat(line_selected.attr('y1')) + delta_y)
                .attr("x2", parseFloat(line_selected.attr('x2')) + delta_x)
                .attr("y2", parseFloat(line_selected.attr('y2')) + delta_y);

    const line_real = svgDom.select('#' + activeLayer.layerName);
    line_real.attr('x1', parseFloat(line_real.attr('x1')) + delta_x)
            .attr("y1", parseFloat(line_real.attr('y1')) + delta_y)
            .attr("x2", parseFloat(line_real.attr('x2')) + delta_x)
            .attr("y2", parseFloat(line_real.attr('y2')) + delta_y);
    
    data = {
      Start: {
        x: parseFloat(line_real.attr('x1')),
        y: parseFloat(line_real.attr('y1')),
      },
      End: {
        x: parseFloat(line_real.attr('x2')),
        y: parseFloat(line_real.attr('y2')),
      }
    }
  } else {
    const transform = $('#selected').attr("transform");
    const value = getTransformVal(transform);
  
    const x = value[0] + delta_x;
    const y = value[1] + delta_y;

    $('#selected').attr('transform', "translate(" + x + ', ' + y + ') rotate(' + value[2] + ' ' + value[3] + ' ' + value[4] + ")");
    $('#' + activeLayer.layerName).attr('transform', "translate(" + x + ', ' + y + ') rotate(' + value[2] + ' ' + value[3] + ' ' + value[4] + ")");

    data = {
      Location: {
        x,
        y
      }
    };
  }  

  saveActiveLayer(data);
  formatShape(activeLayer);
}

const rotate = (x1, y1, x2, y2) => {
  var dig = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  if (dig === 0) return;

  var nX = x2 - x1;
  
  var a = (Math.acos(nX / dig) * 180 / Math.PI).toFixed(2);
  if (y1 - y2 > 0) a = -a;

  const transform = $('#selected').attr("transform");
  const value = getTransformVal(transform);

  $('#selected').attr('transform', "translate(" + value[0] + ', ' + value[1] + ') rotate(' + a + ' ' + value[3] + ' ' + value[4] + ")");
  $('#' + activeLayer.layerName).attr('transform', "translate(" + value[0] + ', ' + value[1] + ') rotate(' + a + ' ' + value[3] + ' ' + value[4] + ")");

  var data = {
    Rotation: {
      a,
      x: 0,
      y: 0
    }
  }

  saveActiveLayer(data);
  formatShape(activeLayer);
}

const resize = (cursor, x, y) => {
  var data = null;

  if (cursor === 'crosshair') {
    const line_selected = svgDom.select('#selected');
    const line_real = svgDom.select('#' + activeLayer.layerName);
    const type = line_selected.attr('type');

    if (type === 'true') {
      line_selected.attr('x1', x)
        .attr("y1", y);

      line_real.attr('x1', x)
        .attr("y1", y);
      
      data = {
        Start: {
          x, y
        }
      }
    } else {
      line_selected.attr('x2', x)
        .attr("y2", y);

      line_real.attr('x2', x)
        .attr("y2", y);
      
      data = {
        End: {
          x, y
        }
      }
    }
  } else {
    const transform = $('#selected').attr("transform");
    const value = getTransformVal(transform);
    const width = parseFloat($('#selected').children('rect').attr('width'));
    const height = parseFloat($('#selected').children('rect').attr('height'));

    var nX, nY, nWidth, nHeight, ref = 30;
    switch (cursor) {
      case 'e-resize':
        nX = value[0];
        nY = value[1];
        nWidth = x - value[0] < ref ? ref : x - value[0];
        nHeight = height;
        break;
      case 'w-resize':
        nX = x;
        nY = value[1];
        nWidth = width + value[0] - x;
        if (nWidth < ref) {
          nWidth = ref;
          nX = width + value[0] - ref;
        }
        nHeight = height;
        break;
      case 's-resize':
        nX = value[0];
        nY = value[1];
        nWidth = width;
        nHeight = y - value[1] < ref ? ref : y - value[1];
        break;
      case 'n-resize':
        nX = value[0];
        nY = y;
        nWidth = width;
        nHeight = height - y + value[1];
        if (nHeight < ref) {
          nHeight = ref;
          nY = height + value[1] - ref;
        }
        break;
      case 'ne-resize':
        nX = value[0];
        nY = y;
        nWidth = x - value[0] < ref ? ref : x - value[0];
        nHeight = height - y + value[1];
        if (nHeight < ref) {
          nHeight = ref;
          nY = height + value[1] - ref;
        }
        break;
      case 'nw-resize':
        nX = x;
        nY = y;
        nWidth = width - x + value[0];
        if (nWidth < ref) {
          nWidth = ref;
          nX = width + value[0] - ref;
        }
        nHeight = height - y + value[1];
        if (nHeight < ref) {
          nHeight = ref;
          nY = height + value[1] - ref;
        }
        break;
      case 'se-resize':
        nX = value[0];
        nY = value[1];
        nWidth = x - value[0] < ref ? ref : x - value[0]
        nHeight = y - value[1] < ref ? ref : y - value[1];
        break;
      case 'sw-resize':
        nX = x;
        nY = value[1];
        nWidth = width + value[0] - x;
        if (nWidth < ref) {
          nWidth = ref;
          nX = width + value[0] - ref;
        }
        nHeight = y - value[1] < ref ? ref : y - value[1];
        break;
    }

    svgDom.select('#selected')
          .attr('transform', "translate(" + nX + ', ' + nY + ') rotate(' + value[2] + ' ' + value[3] + ' ' + value[4] + ")")
          .select('rect')
          .attr('width', nWidth)
          .attr('height', nHeight);

    var rect;
    var g;
    var selected = svgDom.select('#' + activeLayer.layerName);
    if (selected[0][0].tagName === 'rect' || selected[0][0].tagName ==='ellipse') {
      g = rect = selected;
    } else {
      g = selected;
      rect = g.selectAll('rect');
    }

    g.attr('transform', "translate(" + nX + ', ' + nY + ') rotate(' + value[2] + ' ' + value[3] + ' ' + value[4] + ")");
    rect.attr('width', nWidth)
        .attr('height', nHeight);

    data = {
      Size: {
        width: nWidth,
        height: nHeight
      },
      Location: {
        x: nX,
        y: nY
      }
    };    
  }

  saveActiveLayer(data);
  refreshLayers();
}


const getTransformVal = str => {
  return str.replace(/[a-z]/g, '').replace(/\(|\)|\,/g, '').split(' ').map(e => parseFloat(e));
}