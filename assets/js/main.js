const layers = [];
var activeLayer = null;
var svgDom = null;
var fonts = [];

const init = () => {
  // when 'panel' click
  $('#panel').click(function(e) {
    if (e.target.tagName.toLowerCase() === 'div' || e.target.tagName.toLowerCase() === 'svg') {
      $('#selected').remove();

      layers.forEach(layer => {
        if (layer.layerName === 'panel') activeLayer = layer;
      });

      formatPanel(activeLayer ? activeLayer.data : null);
    } else {
      var tag = $(e.target);
      var id = tag.attr('id');

      while(!id) {
        tag = tag.parent();
        id = tag.attr('id');
      }

      setActiveLayer(id);
    }
  });

  // when 'toolbox' click
  var clicked_bn = [];
  var timer1;
  $('#toolbox').click(e => {
    if (e.target.tagName === 'BUTTON' && e.type === 'click') {
      clicked_bn.push($(e.target).attr('id'));

      timer1 = setTimeout(() => {
        if (clicked_bn.length === 2 && clicked_bn[0] === clicked_bn[1]) {
          clearTimeout(timer1);
          activeLayer = null;
          createTool(clicked_bn[0]);
        } else {
          console.log('one click');
        }

        clicked_bn = [];
      }, 250);

    }
  });

  $('body').keydown(e => {
    if (activeLayer) {
      if (activeLayer.layerName !== 'panel') {
        switch (e.key) {
          case 'Escape':
            $('#selected').remove();
            activeLayer = null;
            break;
          case 'Delete':
            const index = layers.indexOf(activeLayer);
            layers.splice(index, 1);          
            $('#' + activeLayer.layerName).remove();
            $('#selected').remove();
            activeLayer = null;
            break;
          case 'ArrowRight':
            move(10, 0);
            break;
          case 'ArrowLeft':
            move(-10, 0);
            break;
          case 'ArrowDown':
            move(0, 10);
            break;
          case 'ArrowUp':
            move(0, -10);
            break;
        }
      } 
    }
  })
}

init();