const createPanel = async () => {
  const panel = $('#panel');

  if (layers.length > 1) {
    if (confirm('Do you want to save recent work?')) {
      await savePanel();
    }    
  }

  initializeParams();

  panel.addClass('screen')
  panel.trigger('click');

  toolboxInit();

  property_action();

  activeLayer = {
    layerName: 'panel',
    data: readPanel()
  }

  layers.push(activeLayer);
}

const initializeParams = () => {
  layers.splice(0, layers.length);
  activeLayer = null;
  svgDom = null;
  fonts = [];
  action_mode = true;
  rect_num = 1;
  line_num = 1;
  ellipse_num = 1;
  picture_num = 1;  
  barcode_num = 1;
  text_num = 1;
  svgDom = null;
  DU = 0;

  $('#toolbox').empty();
  $('#property').empty();
  $('#panel').empty();
}

const toolboxInit = () => {
  const toolbox = $('#toolbox');
  toolbox.append(
    ` <button class="drawing-tool svg-rect" id='bn-rectangle'></button>
      <button class="drawing-tool svg-line" id='bn-line'></button>
      <button class="drawing-tool svg-ellipse" id='bn-ellipse'></button>
      <button class="drawing-tool svg-picture" id='bn-picture'></button>
      <button class="drawing-tool svg-barcode" id='bn-barcode'></button>
      <button class="drawing-tool svg-text" id='bn-text'></button>`
  );

  toolbox.css('padding-top', '7px');
  toolbox.css('padding-bottom', '7px');
}

const createTool = async id => {
  if (layers.length === 1) {
    await initPanel(layers[0].data);
  }

  var name = id.slice(3);
  var layerName = layout(name);

  formatShape(name);

  if (name === 'picture') {
    const file = $('#property').find('#DesignerSource');

    file.trigger('click');
    file.change(async () => {
      var data = await readShape(name);
      data['ObjectName'] = layerName;

      activeLayer = {
        layerName,
        data,
      };
      formatShape(activeLayer);
      
      layers.push(activeLayer);
      panel(activeLayer);
      selectRect(activeLayer.layerName, data);
    })
  } else {
    var data = await readShape(name);
    data['ObjectName'] = layerName;

    activeLayer = {
      layerName,
      data,
    };
    formatShape(activeLayer);

    layers.push(activeLayer);
    panel(activeLayer);
    selectRect(activeLayer.layerName, data);
  }
}

const setActiveLayer = id => {
  if (!activeLayer || id !== activeLayer.layerName) {
    layers.forEach(layer => {
      if (layer.layerName === id) {
        activeLayer = layer;
        formatShape(activeLayer);

        var data = layer.data;
        selectRect(id, data);
      }
    });
  }
}


const saveActiveLayer = data => {
  Object.keys(data).forEach(key => {
    activeLayer.data[key] = data[key];
  })

  layers.forEach((layer, index) => {
    if (layer.layerName === activeLayer.layerName) {
      layers[index] = activeLayer;
    }
  })
}

const refreshLayers = () => {
  var g = svgDom.select('#' + activeLayer.layerName);

  var width, height;

  switch (activeLayer.layerName.replace(/[0-9]/g, '')) {
    case 'ellipse':
      width = parseFloat(g.attr('width'));
      height= parseFloat(g.attr('height'));
    
      g.attr('cx', width / 2)
        .attr("cy", height / 2)
        .attr('rx', width / 2)
        .attr('ry', height / 2)
      break;
    case 'barcode': case 'picture':
      width = parseFloat(g.select('rect').attr('width'));
      height= parseFloat(g.select('rect').attr('height'));

      g.select('image')
        .attr('width', width)
        .attr('height', height);
      break;
    case 'text':      
      width = parseFloat(g.select('rect').attr('width'));
      height= parseFloat(g.select('rect').attr('height'));

      var data = activeLayer.data;
      if (data.DesignerText && data.DesignerText !== '') {
        d3plus.textwrap()
            .container(g.select('text'))
            .align(data.HAlignment.toLowerCase())
            .valign(data.VAlignment.toLowerCase())
            .width(parseFloat(width))
            .height(parseFloat(height))
            .fontSizeRange([1, 1000])
            .lineHeight(parseFloat(data.LineHeight))
            .resize(data.TextWrapping.toLowerCase() === "resize" ? true : false)
            .draw();
      }
      
      if (data.TextWrapping.toLowerCase() === 'fixed') {        
        g.select('text').attr('font-size', data.FontSize);
      }

      break;
  }

  formatShape(activeLayer);
}


const zOrder = () => {
  var data = [];
  $("svg").children().each((i, child) => {
    var index = $(child).attr('z-index');
    if (index && index !== '') {
      data.push(parseInt(index));
    } else {
      data.push(-1000);
    }
  })

  svgDom.selectAll("svg > *")
      .data(data)
      .sort(d3.ascending);
}


const resizePanel = () => {
  $('#panel_parent').bind('mousewheel', function(e){
    var zoom = parseFloat($(this).attr('val'));
    if(e.originalEvent.wheelDelta < 0) {
      zoom -= 0.1;        
    }else {
      zoom += 0.1;
    }

    $(this).attr('val', zoom);
    $(this).css('transform-origin', '0% 0%');
    $(this).css('transform', 'scale(' + zoom + ')');
    
    return false;
  });

  $('#panel_parent').bind('DOMMouseScroll', function(e){
    var zoom = parseFloat($(this).attr('val'));
    if(e.originalEvent.detail > 0) {
      zoom -= 0.1;        
    } else {
      zoom += 0.1;
    }

    $(this).attr('val', zoom);
    $(this).css('transform-origin', '0% 0%');
    $(this).css('transform', 'scale(' + zoom + ')');

    return false;
  });
}


const refreshPanel = async data => {
  d3.select('#panel')
    .attr("style", 'width: ' + eval(data.Width) + 'px; height: ' + eval(data.Height) + 'px');

  svgDom.attr("height", data.Height)
    .attr("width", data.Width)
    .attr("opacity", data.Opacity / 100)
    .attr("DefaultFont", data.DefaultFont)
    .attr("DefaulFontSize", data.DefaultFontSize)
    .attr("viewBox", "0 0 " + data.Width + ' ' + data.Height);

  if (fonts.indexOf(data.DefaultFont) < 0) {
    const font_url = "https://fonts.googleapis.com/css?family=" + data.DefaultFont;
    const cssRules = await GFontToDataURI(font_url);

    if (typeof cssRules !== 'string' && cssRules.length) {
      fonts.push(data.DefaultFont);
      $('#panel svg').prepend(`<style>svg{stroke:#000;stroke-linecap:round;stroke-linejoin:round;fill:#fff;fill-rule:evenodd;font-family:${data.DefaultFont};font-size:14px;text-anchor:middle}svg text{stroke:none}</style>`)

      svgDom.append('defs')
            .append('style')
            .text(cssRules.join('\n'));
    }
  }
}

const loadPanel = () => {
  const inputXML = $('#badge_load');
  inputXML.unbind();
  inputXML.trigger('click');

  inputXML.change(function() {
    const path = inputXML.val().toLowerCase();
    if (path.search('.badge') < 0 && path.search('.xml') < 0 && path.search('.zip') < 0) {
      alert('File type to be inserted should be one of xml, badge, or zip. \n Thanks');
      inputXML.val('');
    }
    
    if (inputXML.val() !== '') {
      const formData = new FormData();
      const xml = inputXML.get(0).files[0];
      formData.append('files[]', xml, xml.name);
      
      fetch('assets/php/load.php', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(json => {
        if (json[0]) {
          var parser = new DOMParser();
          var xmlDom = parser.parseFromString(json[0],"text/xml");
          encodeXML(xmlDom);
        }
        
        if (layers.length) {
          renderXML();
        }
      })
      .catch(error => {
        console.log(error);
      })

    }
  }); 
}

const savePanel = async () => {
  // decodeXML();
}