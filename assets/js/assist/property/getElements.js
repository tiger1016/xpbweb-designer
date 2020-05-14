const getInput = (name, def, type) => {
  var id = name.replace(/ /g, '');

  if (type === 'size') {
    def = convertFromPixel(def, DU).toFixed(5);
  }

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <input type='text' id='${id}' style='width: 100%' ${ def || def === 0 ? 'value="' + def + '"' : '' }/>
      </div>
    </div>`
  );
}

const getInput2 = (name, def, type) => {
  var id = name.replace(/ /g, '');
  def = def ? def : [0, 0];

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right; margin-top: 3px;'>${name}</label>
      </div>
      <div class='col-sm-4'>
        <label for='x' style='font-size: 10px;'>${type === 'size' ? 'Width:' : 'X:'}</label>
        <input type='text' id='${id}_x' style='width: 100%;' value='${convertFromPixel(def[0], DU).toFixed(5)}' />
      </div>
      <div class='col-sm-4'>
        <label for='y' style='font-size: 10px;'>${type === 'size' ? 'Height:' : 'Y:'}</label>
        <input type='text' id='${id}_y' style='width: 100%;' value='${convertFromPixel(def[1], DU).toFixed(5)}' />
      </div>
    </div>`
  );
}

const getInput3 = (name, def) => {
  var id = name.replace(/ /g, '');
  def = def ? def : [0, '0.0', '0.0'];

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right; margin-top: 3px;'>${name}</label>
      </div>
      <div class='col-sm-3'>
        <label for='angle' style='font-size: 10px;'>Angle:</label>
        <input type='text' id='${id}_angle' style='width: 100%;' value='${def[0]}' />
      </div>
      <div class='col-sm-offset-1 col-sm-2'>
        <label for='x' style='font-size: 10px;'>X:</label>
        <input type='text' id='${id}_x' style='width: 100%;' value='${def[1]}' />
      </div>
      <div class='col-sm-2'>
        <label for='y' style='font-size: 10px;'>Y:</label>
        <input type='text' id='${id}_y' style='width: 100%;' value='${def[2]}' />
      </div>
    </div>`
  );
}

const getTextArea = (name, value) => {
  var id = name.replace(/ /g, '');
  if (!value) value ='';

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <textarea id='${id}' style='width: 100%;'>${value}</textarea>
      </div>
    </div>`
  );
}

const getSelect = (name, value, defSel) => {
  var id = name.replace(/ /g, '');
  id = id.replace(/\./g, '');

  if (!defSel) defSel = 0;

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <select id='${id}' style='width: 100%; height: 100%;'>
          ${
            value.map((element, index) => {
              if (typeof element !== 'object') {
                return (
                  `<option ${ index === defSel ? 'selected' : '' }>${element}</option>`
                );
              } else {
                return (
                  `<option ${index === defSel ? 'selected' : ''} value="${element.value}">${element.name}</option>`
                );
              }
            })
          }
        </select>
      </div>
    </div>`
  );
}

const getSelect2 = (name, value, defSel, defCol) => {
  var id = name.replace(/ /g, '');
  
  var cols = defCol.split(' ');
  
  var coln = parseInt(cols[0]);

  var colors = [], opacity = [], offset = [];
  for (var i = 0; i < coln; i ++) {
    colors.push(cols[6+2*i] ? cols[6+2*i].substr(0, 7) : '#ffffff');
    opacity.push(cols[6+2*i] ? cols[6+2*i].substr(7) : '00');
    offset.push(cols[7+2*i]);
  }
  
  return (
    `<div class='row color-slider' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-6'>
        <select id='${id}_sel' style='width: 100%; height: 100%;'>
          ${
            value.map((element, index) => {
              if (typeof element !== 'object') {
                return (
                  `<option ${ index === defSel ? 'selected' : '' }>${element}</option>`
                );
              } else {
                return (
                  `<option ${index === defSel ? 'selected' : ''} value=${element.value}>${element.name}</option>`
                );
              }
            })
          }
        </select>
      </div>
      <div class='col-sm-2'>
        <input id='${id}_stops' type='number' value='${coln}' min='2' max='10' ${!defSel ? 'disabled' : 'none'} style='width: 100%' />
      </div>
      <div class='col-sm-4' style='margin-top: 12px;' ${!defSel ? 'hidden' : 'none'}>
        <label for='${id}_option' style='float: right;'>Option</label>
      </div>
      <div class='col-sm-8' style='margin-top: 12px' ${!defSel ? 'hidden' : 'none'}>
          <input id="${id}_x1" type="number" value="${cols[1]}" min="0" max="100" />
          <input id="${id}_y1" type="number" value="${cols[2]}" min="0" max="100" />
          <input id="${id}_x2" type="number" value="${cols[3]}" min="0" max="100" />
          <input id="${id}_y2" type="number" value="${cols[4]}" min="0" max="100" />
          <input id="${id}_r" type="number" value="${cols[5]}" min="0" max="100" ${defSel === 1 ? 'hidden' : 'none'}/>
      </div>      
      ${
        !defSel ? `<div class='col-sm-4' style='margin-top: 12px;'>
                  <label for='${id}_selection_0' style="float: right;">Choose Color</label>
                </div>
                <div class='col-offset-sm-4 col-sm-2' style='margin-top: 8px'>
                  <input type='color' id='${id}_color_0' style='width: 100%' value='${colors[0]}' />
                </div>
                <div class='col-sm-4' style='margin-top: 8px'>
                  <input type='range' id='${id}_opacity_0' style='width: 100%' min='0' max='100' value='${parseInt(opacity[0], 16) * 100 / 255}' />
                </div>
                ` :
        colors.map((color, index) => {
          return (
            `<div class='col-sm-4' style='margin-top: 12px;'>
              <label for='${id}_selection_${index}' style="float: right;">Choose Color${index + 1}</label>
            </div>
            <div class='col-sm-2' style='margin-top: 12px'>
              <input type='color' id='${id}_color_${index}' style='width: 100%' value='${color}' style='width: 100%;'/>
            </div>
            <div class='col-sm-4' style='margin-top: 12px'>
              <input type='range' id='${id}_opacity_${index}' style='width: 100%' min='0' max='100' value='${parseInt(opacity[index], 16) * 100 / 255}' />
            </div>
            <div class='col-sm-2' style='margin-top: 12px'>
              <input id="${id}_offset_${index}" type="number" value="${offset[index] !== 'undefined' ? offset[index] : 0}" min="0" max="100" style='width: 100%;'/>
            </div>`
          )
        })  
      }
      <input type='text' id='${id}' hidden/>
    </div>`
  );
}

const getCheck = (name, def) => {
  var id = name.replace(/ /g, '');

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <input id="${id}" class="slider" type="checkbox" ${ def ? 'checked' : '' } />
      </div>
    </div>`
  );  
}

const getSlider = (name, min, max, pos) => {
  var id = name.replace(/ /g, '');
  pos = pos || pos === 0 ? pos: Math.floor((min + max) / 3);

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-6'>
        <input id="${id}_slider" class="slider" type="range" value="${pos}" min="${min}" max="${max}" />
      </div>
      <div class='col-sm-2'>
        <input id="${id}_text" type="text" style="width: 100%;" value='${pos}'/>
      </div>
    </div>`
  );
}

const getSpin = (name, def, min, max) => {
  var id = name.replace(/ /g, '');
  var pos = def || def === 0 ? def : 1;
  max = max ? max : 999;

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <input id="${id}" type="number" value="${pos}" min="${min}" max="${max}" style='width: 100%'/>
      </div>
    </div>`
  );
}

const getHorizontalLine = () => {
  return (
    `<div class='row' style='margin-top: 10px;'>
      <hr style='border: 0.5px solid grey;'>
    </div>`
  );
}

const getColor = (name, defCol) => {
  var id = name.replace(/ /g, '');
  const cols = defCol.split(' ');

  return (
    `<div class='row color-slider1' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-2'>
        <input id="${id}_color" type="color" value="${cols[6].substr(0, 7)}" style='width: 100%'/>
      </div>
      <div class='col-sm-6'>
        <input id="${id}_opacity" type="range" min='0', max='100' value='${parseInt(cols[6].substr(7), 16) * 100 / 255}' style='width: 100%'/>
      </div>
      <input type='text' id='${id}' hidden/>
    </div>`
  );
}

const getFile = (name, def)=> {
  var id = name.replace(/ /g, '');
  if (!def) def = 'Browse...';

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <input type="file" id="${id}" accept=".png, .jpg, .jpeg, .svg" style='display: none' onchange='document.getElementById("${id}_temp").value=this.value'/>
        <input type="button" id='${id}_temp' style='width: 100%' value="${def}" onclick="document.getElementById('${id}').click();" />
      </div>
    </div>`
  );
}

const syncSlider = () => {
  $('.slider').each((index, node) => {
    const text = $(node).parent().next().children(":first-child");

    $(node).change(function() {
      text.val(this.value);
    });

    $(text).change(function() {
      var max = parseInt($(node).attr('max'));
      var min = parseInt($(node).attr('min'));
      var pos = Math.max(min, parseInt($(this).val()));
      pos = Math.min(max, pos);

      $(node).val(pos);
      $(this).val(pos);
    });
  })
}

const syncSize = () => {
  $('#DisplayUnit').change(function() {
    var width = $('#Width');
    var height = $('#Height');

    if (displayUnit.indexOf(this.value) === 0) {
      width.val((parseFloat(width.val() / 2.54).toFixed(5)));
      height.val((parseFloat(height.val()) / 2.54).toFixed(5));
    } else {
      width.val((parseFloat(width.val()) * 2.54).toFixed(5));
      height.val((parseFloat(height.val()) * 2.54).toFixed(5));
    }
  });
}


const removeChildren = parent => {
  var last = parent.children(":last-child")[0];
  while (last = parent[0].lastChild) {
    $(last).remove();
  }
}

const syncColorSlider = () => {  
  $('.color-slider').each((index, node) => {
    const color_rgba = $(node).find('input[type=text]');
    var id = color_rgba.attr('id');

    const coln = $(node).find('#' + id + '_stops');
    const x1 = $(node).find('#' + id + '_x1');
    const x2 = $(node).find('#' + id + '_x2');
    const y1 = $(node).find('#' + id + '_y1');
    const y2 = $(node).find('#' + id + '_y2');
    const r = $(node).find('#' + id + '_r');

    const read = () => {      
      var colCount = parseInt(coln.val());
      var result = colCount + ' ' + x1.val() + ' ' + y1.val() + ' ' + x2.val() + ' ' + y2.val() + ' ' + r.val();

      var color, offset, opacity;
      for (var i = 0; i < colCount; i ++) {
        color = $(node).find('#' + id + '_color_' + i).val();
        opacity = $(node).find('#' + id + '_opacity_' + i).val();
        offset = $(node).find('#' + id + '_offset_' + i).val();

        if (!color) color = '#ffffff';
        if (!opacity) opacity = '0';
        if (!offset) offset = '0';

        result += ' ' + color + rgbToHex(parseInt(opacity)) + ' ' + offset;
      }

      return result;
    }
    
    $(color_rgba).val(read());

    var color, offset, opacity;
    for (var i = 0; i < parseInt(coln.val()); i ++) {
      color = $(node).find('#' + id + '_color_' + i);
      opacity = $(node).find('#' + id + '_opacity_' + i);
      offset = $(node).find('#' + id + '_offset_' + i);

      color.change(function() {
        $(color_rgba).val(read());
      })        
      
      opacity.change(function() {
        $(color_rgba).val(read());
      })        
      
      offset.change(function() {
        $(color_rgba).val(read());
      })
    }

    x1.change(function() {
      $(color_rgba).val(read());
    });

    x2.change(function() {
      $(color_rgba).val(read());
    });

    y1.change(function() {
      $(color_rgba).val(read());
    });

    y2.change(function() {
      $(color_rgba).val(read());
    });

    r.change(function() {
      $(color_rgba).val(read());
    });

    coln.change(function() {
      $(color_rgba).val(read());
    })
  });
}

const syncColorSlider1 = () => {  
  const node = $('.color-slider1')
  const color_rgba = $(node).find('input[type=text]');
  var id = color_rgba.attr('id');

  const color = $(node).find('#' + id + '_color');
  const opacity = $(node).find('#' + id + '_opacity');

  const read = () => {      
    var result = 'undefined undefined undefined undefined undefined undefined';
    result += ' ' + color.val() + rgbToHex(parseInt(opacity.val()));

    return result;
  }
  
  $(color_rgba).val(read());

  color.change(function() {
    $(color_rgba).val(read());
  })        
  
  opacity.change(function() {
    $(color_rgba).val(read());
  })
}

var rgbToHex = function (val) {
  var rgb = Math.floor(255 * val / 100);

  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};