const layers = [];
var activeLayer = null;


const init = () => {
  $('#panel').click(formatPanel);

  $('#toolbox').click(e => {
    if (e.target.tagName === 'BUTTON') {
      createTool($(e.target).attr('id'));
    }
  });

  $('#panel').trigger('click');
}

const createTool = id => {
  var name = id.slice(3);

  var layerName = layout(name);
  
  formatShape(name);

  var data = readShape(name);
  activeLayer = {
    layer: layerName,
    data,
  };
  
  layers.push(activeLayer);

  panel(activeLayer);
}

init();