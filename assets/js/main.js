const init = () => {
  $('#bn-rect').click(function() {
    var parent = $('#property');
    removeChildren($(parent));

    $(parent).append(getInput('Object Name'));
    $(parent).append(getSlider('Opacity', 0 , 100));
    $(parent).append(getSlider('Z-Order', -100, 100));
    $(parent).append(getHorizontalLine());
    $(parent).append(getInput2('Location'));
    $(parent).append(getInput2('Size'));
    $(parent).append(getInput3('Rotation'));
    $(parent).append(getHorizontalLine());

    var Style = [12,2,4,5,4,64,6,3,63,3];
    $(parent).append(getSelect('Border Style', Style));
    $(parent).append(getSpin('Border Thick'));
    $(parent).append(getSpin('Corner Radius', 0));
    $(parent).append(getHorizontalLine());

    var colorStyle = ['SolidColor', 'LinearGradientColor', 'RadialGradientColor'];
    $(parent).append(getSelect2('Fill', colorStyle, 0, '#ffffff'));
    $(parent).append(getSelect2('Outline', colorStyle, 0, '#000000'));

    syncSlider();
    syncColorSlider();
  });

  $('#bn-line').click(function() {
    var parent = $('#property');
    removeChildren($(parent));

    $(parent).append(getInput('Object Name'));
    $(parent).append(getSlider('Opacity', 0, 100));
    $(parent).append(getSlider('Z-Order', -100, 100));
    $(parent).append(getHorizontalLine());
    $(parent).append(getInput2('Start'));
    $(parent).append(getInput2('End'));
    $(parent).append(getHorizontalLine());

    var Style = [12,2,4,5,4,64,6,3,63,3];
    $(parent).append(getSelect('Style', Style));
    $(parent).append(getSlider('Thickness', 0, 30));
    $(parent).append(getHorizontalLine());
    
    var colorStyle = ['SolidColor', 'LinearGradientColor', 'RadialGradientColor'];
    $(parent).append(getSelect2('Stroke', colorStyle, 0, '#000000'));

    syncSlider();
    syncColorSlider();
  });

  $('#bn-ellipse').click(function() {
    var parent = $('#property');
    removeChildren($(parent));

    $(parent).append(getInput('Object Name'));
    $(parent).append(getSlider('Opacity', 0 , 100));
    $(parent).append(getSlider('Z-Order', -100, 100));
    $(parent).append(getHorizontalLine());
    $(parent).append(getInput2('Location'));
    $(parent).append(getInput2('Size'));
    $(parent).append(getInput3('Rotation'));
    $(parent).append(getHorizontalLine());

    var Style = [12,2,4,5,4,64,6,3,63,3];
    $(parent).append(getSelect('Border Style', Style));
    $(parent).append(getSpin('Border Thick'));
    $(parent).append(getHorizontalLine());

    var colorStyle = ['SolidColor', 'LinearGradientColor', 'RadialGradientColor'];
    $(parent).append(getSelect2('Fill', colorStyle, 0, '#ffffff'));
    $(parent).append(getSelect2('Outline', colorStyle, 0, '#000000'));

    syncSlider();
    syncColorSlider();
  });

  $('#bn-picture').click(function() {
    var parent = $('#property');
    removeChildren($(parent));

    $(parent).append(getInput('Object Name'));
    $(parent).append(getSlider('Opacity', 0 , 100));
    $(parent).append(getSlider('Z-Order', -100, 100));
    $(parent).append(getHorizontalLine());
    $(parent).append(getInput2('Location'));
    $(parent).append(getInput2('Size'));
    $(parent).append(getInput3('Rotation'));
    $(parent).append(getHorizontalLine());

    $(parent).append(getFile("Designer Source"));
    $(parent).append(getTextArea('Source'));
    $(parent).append(getColor('Transparency Color', '#ffffff'));
    $(parent).append(getSlider('Transparency Tolerance', 0, 100, 0));

    var stretch = [
      'None',
      'Fill',
      'Uniform',
      'UniformToFill',
    ];

    $(parent).append(getSelect('Stretch', stretch, 2));
  
    syncSlider(); 
    syncColorSlider();
  });

  $('#bn-barcode').click(function() {

  });

  $('#bn-text').click(function() {
    var parent = $('#property');
    removeChildren($(parent));

    $(parent).append(getTextArea('Designer Text'));
    $(parent).append(getTextArea('Print Text'));
    $(parent).append(getInput('Object Name'));
    $(parent).append(getSlider('Opacity', 0 , 100));
    $(parent).append(getSlider('Z-Order', -100, 100));
    $(parent).append(getHorizontalLine());
    $(parent).append(getInput2('Location'));
    $(parent).append(getInput2('Size'));
    $(parent).append(getInput3('Rotation'));
    $(parent).append(getHorizontalLine());

    var fontFamilly = [
      'Arial', 'Bahnschrift', 'Cambria', 'Cambria Math', 'Candara', 
      'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 
      'Ebrima', 'Franklin Gothic', 'Gabriola', 'Gadugi', 'Georgia', 'Gulim', 
      'GulimChe', 'Dotum', 'DotumChe', 'Impact', 'Ink Free', 'Javanese Text', 
      'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 
      'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft JhengHei UI', 
      'Microsoft NewTai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 
      'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft YaHei UI', 
      'Microsoft Yi Baiti', 'MingLiU', 'PMingLiU', 'PMingLiU_HKSCS', 'MingLiU-ExtB', 
      'PMingLiU-ExtB', 'MingLiu_HKSCS-ExtB', 'Mongolian Baiti', 'MS Gothic', 
      'MS UI Gothic', 'MS PGothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 
      'Palatino Linotype', 'Segoe MDL2_Assets', 'Segoe Print', 'Segoe Script', 
      'Segoe UI', 'Segoe Emoji', 'Segoe Historic', 'Segoe Symbol', 'SimSun', 
      'NSimSun', 'SimSun-ExtB', 'Sikta Small', 'Sikta Text', 'Sikta SubHeading', 
      'Sikta Heading', 'Sikta Display', 'Sikta Banner', 'Sylfaen', 'Symbol', 
      'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 
      'Yu Gothic', 'Marlett', 'Yu Gothic UI', 'Global User Interface', 'Global Monospace', 
      'Global Sans Serif', 'Global Serif' 
    ];

    $(parent).append(getSelect('Font Family', fontFamilly));
    $(parent).append(getSpin('Font Size', 12));

    var fontStyle = [
      'Normal',
      'Italic',
      'Oblique',
    ];

    $(parent).append(getSelect('Font Style', fontStyle));

    var fontWeight = [
      { name: 'extrabold', value: 800 },
      { name: 'extralight', value: 200 },
      { naem: 'black', value: 900 },
      { name: 'light', value: 300 },
      { name: 'medium', value: 500 },
      { name: 'normal', value: 400 },
      { name: 'semibold', value: 600 },
      { name: 'thin', value: 100},
      { name: 'bold', value: 700 }
    ];
    $(parent).append(getSelect('Font Weight', fontWeight, 5));

    var fontStretch = [      
      'ultra-condensed',
      'extra-condensed',
      'condensed',
      'semi-condensed',      
      'normal',
      'semi-expanded',
      'expanded',
      'extra-expanded',
      'ultra-expanded',                   
    ];
    $(parent).append(getSelect('Font Stretch', fontStretch, 4));


    var textDecoration = [
      "None",
      "Underline",
      'Overline',
      'StrikeThrough'
    ];

    $(parent).append(getSelect('Text Decoration', textDecoration));
    $(parent).append(getHorizontalLine());

    var hAlignment = [
      'Left',
      "Center",
      'Right',
    ];   

    $(parent).append(getSelect('H. Alignment', hAlignment, 1));

    var vAlignment = [
      'Top',
      'Middle',
      'Bottom',
    ];

    $(parent).append(getSelect('V. Alignment', vAlignment, 1));

    var textWrap = [
      'Fixed',
      'Resize',
    ];

    $(parent).append(getSelect('Text Wrapping', textWrap));    
    $(parent).append(getInput('Line Height', 0));


    var colorStyle = ['SolidColor', 'LinearGradientColor', 'RadialGradientColor'];
    $(parent).append(getSelect2('Fill', colorStyle, 0, '#ffffff'));
    $(parent).append(getSelect2('Outline', colorStyle, 0, '#000000'));
    $(parent).append(getCheck('Show Border'));

    syncSlider();
    syncColorSlider();
  });
}

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

const getTextArea = name => {
  var id = name.replace(/ /g, '');

  return (
    `<div class='row' style='margin-top: 12px;'>
      <div class='col-sm-4'>
        <label for='${id}' style='float: right;'>${name}</label>
      </div>
      <div class='col-sm-8'>
        <input type='textarea' id='${id}' style='width: 100%; height: 70px' />
      </div>
    </div>`
  );
}

const getSelect = (name, value, defSel) => {
  var id = name.replace(/ /g, '');

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


const getSelect2 = (name, value, defSel, defCol) => {
  var id = name.replace(/ /g, '');
  defCol = defCol ? defCol : '#ffffff';

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
        <input type='range' id='${id}_opacity' style='width: 100%' min='0' max='100' value='100' />
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
        <input type="file" id="${id}" accept=".png, .jpg, .jpeg, .svg" style='display: none' />
        <input type="button" style='width: 100%' value="Browse..." onclick="document.getElementById('${id}').click();" />
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
    const color_rgb = $(node).find('input[type=color]');
    const opacity = $(node).find('input[type=range]');
    const color_rgba = $(node).find('input[type=text]');

    $(color_rgb).change(function() {
      $(color_rgba).val('rgba(' + parseInt($(color_rgb).val().slice(-6, -4), 16) + ',' + parseInt($(color_rgb).val().slice(-4, -2), 16) + ',' + parseInt($(color_rgb).val().slice(-2), 16) + ',' + $(opacity).val() + ')');
    });

    $(opacity).change(function() {
      $(color_rgba).val('rgba(' + parseInt($(color_rgb).val().slice(-6, -4), 16) + ',' + parseInt($(color_rgb).val().slice(-4, -2), 16) + ',' + parseInt($(color_rgb).val().slice(-2), 16) + ',' + $(opacity).val() + ')');
    });
  });  
}

init();