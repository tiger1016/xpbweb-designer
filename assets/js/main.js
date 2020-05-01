const layers = [];
var activeLayer = null;
var present_panel= null;
var svgDom = null;

const init = () => {
  // when 'panel' click
  $('#panel').click(formatPanel);

  // when 'toolbox' click
  var clicked_bn = [];
  var timer1;
  $('#toolbox').click(e => {
    if (e.target.tagName === 'BUTTON' && e.type === 'click') {
      clicked_bn.push($(e.target).attr('id'));

      timer1 = setTimeout(() => {
        if (clicked_bn.length === 2 && clicked_bn[0] === clicked_bn[1]) {
          clearTimeout(timer1);
          createTool(clicked_bn[0]);
        } else {
          console.log('one click');
        }

        clicked_bn = [];
      }, 250);

    }
  });
  
  //init - test
  createPanel();
}

const createTool = id => {
  var name = id.slice(3);

  var layerName = layout(name);
  
  formatShape(name);

  var data = readShape(name);
  activeLayer = {
    layerName,
    data,
  };
  
  if (!layers.length) {
    initPanel();
  }

  layers.push(activeLayer);

  panel(activeLayer);
}

const createPanel = () => {
  const panel = $('#panel');
  panel.addClass('screen');
  panel.trigger('click');

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

  panel.trigger('click');
  present_panel = readPanel();
}

init();