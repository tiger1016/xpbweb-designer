const getInput = (name, def) => {
  var id = name.replace(/ /g, '');

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

const getInput2 = (name, def) => {
  var id = name.replace(/ /g, '');
  def = def ? def : [0, 0];

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right; margin-top: 3px;'>${name}</label>
      </div>
      <div class='col-sm-4'>
        <label for='x' style='font-size: 10px;'>X:</label>
        <input type='text' id='${id}_x' style='width: 100%;' value='${def[0]}' />
      </div>
      <div class='col-sm-4'>
        <label for='y' style='font-size: 10px;'>Y:</label>
        <input type='text' id='${id}_y' style='width: 100%;' value='${def[1]}' />
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
        <input type='textarea' id='${id}' style='width: 100%; height: 70px' value='${value}' />
      </div>
    </div>`
  );
}

const getSelect = (name, value, defSel) => {
  var id = name.replace(/ /g, '');
  id = id.replace(/\./g, '');

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
                  `<option ${index === defSel ? 'selected' : ''} value=${element.value}>${element.name}</option>`
                );
              }
            })
          }
        </select>
      </div>
    </div>`
  );
}

const getSelect2 = (name, value, defSel, defCol, defOpa) => {
  var id = name.replace(/ /g, '');
  defCol = defCol ? defCol : '#ffffff';
  defOpa = defOpa || defOpa  === 0 ? defOpa : 100;

  return (
    `<div class='row color-slider' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
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
      <div class='col-offset-sm-4 col-sm-2' style='margin-top: 8px'>
        <input type='color' id='${id}_color' style='width: 100%' value='${defCol}' />
      </div>
      <div class='col-sm-6' style='margin-top: 8px'>
        <input type='range' id='${id}_opacity' style='width: 100%' min='0' max='100' value='${defOpa}' />
      </div>
      <input type='text' id='${id}' style='width: 100%' hidden/>
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
        <input id="${id}" class="slider" type="checkbox" ${ def === true ? 'checked' : '' } />
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

const getSpin = (name, def) => {
  var id = name.replace(/ /g, '');
  var pos = def || def === 0 ? def : 1;

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <input id="${id}" type="number" value="${pos}" min="${def}" max="999" style='width: 100%'/>
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

const getColor = (name, def) => {
  var id = name.replace(/ /g, '');
  def = def ? def : "#ffffff";

  return (
    `<div class='row color-slider' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-2'>
        <input id="${id}_color" type="color" value="${def}" style='width: 100%'/>
      </div>
      <div class='col-sm-6'>
        <input id="${id}_opacity" type="range" min='0', max='100' value='100' style='width: 100%'/>
      </div>
      <input type='text' id='${id}' hidden/>
    </div>`
  );
}

const getFile = name => {
  var id = name.replace(/ /g, '');

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <input type="file" id="${id}" accept=".png, .jpg, .jpeg, .svg" style='display: none' onchange='document.getElementById("${id}_temp").value=this.value'/>
        <input type="button" id='${id}_temp' style='width: 100%' value="Browse..." onclick="document.getElementById('${id}').click();" />
      </div>
    </div>`
  );
}

const syncSlider = () => {
  $('.slider').each((index, node) => {
    const text = $(node).parent().next().children(":first-child");

    $(node)[0].oninput = function() {
      text.val(this.value);
    }  

    $(text).change(function() {
      var max = parseInt($(node).attr('max'));
      var min = parseInt($(node).attr('min'));
      var pos = Math.max(min, parseInt($(this).val()));
      pos = Math.min(max, pos);

      $(node).val(pos);
      $(this).val(pos);
    })
  })
}

const removeChildren = parent => {
  var last = parent.children(":last-child")[0];
  while (last = parent[0].lastChild) {
    $(last).remove();
  }
}

const syncColorSlider = () => {
  $('.color-slider').each((index, node) => {
    const color_rgb = $(node).find('input[type=color]').val();
    const opacity = $(node).find('input[type=range]').val();
    const color_rgba = $(node).find('input[type=text]');

    $(color_rgba).val(color_rgb + rgbToHex(parseInt(opacity)));


    $(color_rgb).change(function() {
      $(color_rgba).val(color_rgb + rgbToHex(parseInt(opacity)));
    });

    $(opacity).change(function() {
      $(color_rgba).val(color_rgb + rgbToHex(parseInt(opacity)));
    });
  });  
}

var rgbToHex = function (val) {
  var rgb = Math.floor(255 * val / 100);

  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};