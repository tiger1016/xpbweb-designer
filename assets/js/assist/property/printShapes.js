const fontFamily = [
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


const style = [
  { name: 'Solid', value: '0' },
  { name: 'Dash', value: '4' },
  { name: 'Dot', value: '4 1' },
  { name: 'DashDot', value: '4 1 2' },
  { name: 'DashDotDot', value: '4 1 2 3' },
];

const colorStyle = ['SolidColor', 'LinearGradientColor', 'RadialGradientColor'];

const displayUnit = [
  'Inch',
  'Cm'
];

const formatPanel = data => {
  const parent = $('#property');
  $('#property').parent().prev().text('Panel Properties');

  const panel = $('#panel');

  removeChildren(parent);

  parent.append(getSelect('Display Unit', displayUnit, data ? displayUnit.indexOf(data.DisplayUnit) : 0));  
  parent.append(getInput('Width', data ? data.Width : panel.width(), 'size'));  
  parent.append(getInput('Height', data ? data.Height : panel.height(), 'size'));
  parent.append(getSpin('Opacity', data ? data.Opacity : 100, 0, 100));
  parent.append(getSelect('Default Font', fontFamily, data ? fontFamily.indexOf(data.DefaultFont) : 'Calibri'));
  parent.append(getInput('Default Font Size', data ? data.DefaultFontSize : 12));

  syncSize();
}

const formatLine = data => {
  const parent = $('#property');
  removeChildren(parent);

  parent.append(getInput('Object Name', data ? data.ObjectName : '')); 
  // parent.append(getHorizontalLine());
  parent.append(getInput2('Start', data ? [data.Start.x, data.Start.y] : [0, 0]));
  parent.append(getInput2('End', data ? [data.End.x, data.End.y] : [200, 200]));
  // parent.append(getHorizontalLine());

  var style_sel = null;
  if (data) {
    style.map((item, index) => {
      if (item.value === data.Style) style_sel = index;
    })
  }


  parent.append(getSelect('Style', style, style_sel));
  parent.append(getSlider('Thickness', 0, 30, data ? data.Thickness : 2));
  // parent.append(getHorizontalLine());
  
  parent.append(getSelect2('Stroke', colorStyle, data ? colorStyle.indexOf(data.Stroke.Style) : 0, data ? data.Stroke.Color : '2 0 0 100 0 0 #000000ff'));
  parent.append(getSpin('Opacity', data ? data.Opacity : 100, 0, 100));
  parent.append(getSlider('Z-Order', -100, 100, data ? data['Z-Order'] : null));

  syncSlider();
  syncColorSlider();
}

const formatRect = data => {
  const parent = $('#property');
  removeChildren(parent);

  parent.append(getInput('Object Name', data ? data.ObjectName : ''));
  // parent.append(getHorizontalLine());
  parent.append(getInput2('Location', data ? [data.Location.x, data.Location.y] : [0, 0]));
  parent.append(getInput2('Size', data ? [data.Size.width, data.Size.height] : [200, 100], 'size'));
  parent.append(getInput3('Rotation', data ? [data.Rotation.a, data.Rotation.x, data.Rotation.y] : null));
  // parent.append(getHorizontalLine());

  var style_sel = null;
  if (data) {
    style.map((item, index) => {
      if (item.value === data.BorderStyle) style_sel = index;
    })
  }

  parent.append(getSelect('Border Style', style, style_sel));
  parent.append(getSpin('Border Thickness', data ? data.BorderThickness : null, 1));
  parent.append(getSpin('Corner Radius', data ? data.CornerRadius : 0, 0));
  // parent.append(getHorizontalLine());

  parent.append(getSelect2('Fill', colorStyle, data ? colorStyle.indexOf(data.Fill.Style) : 0, data ? data.Fill.Color : '2 0 0 100 0 0 #ffffff00'));
  parent.append(getSelect2('Outline', colorStyle, data ? colorStyle.indexOf(data.Outline.Style) : 0, data ? data.Outline.Color : '2 0 0 100 0 0 #000000ff'));

  parent.append(getSpin('Opacity', data ? data.Opacity : 100, 0, 100));
  parent.append(getSlider('Z-Order', -100, 100, data ? data['Z-Order'] : null));

  syncSlider();
  syncColorSlider();
}

const formatEllipse = data => {
  const parent = $('#property');
  removeChildren(parent);

  parent.append(getInput('Object Name', data ? data.ObjectName : ''));
  // parent.append(getHorizontalLine());
  parent.append(getInput2('Location', data ? [data.Location.x, data.Location.y] : [0, 0]));
  parent.append(getInput2('Size', data ? [data.Size.width, data.Size.height] : [200, 100], 'size'));
  parent.append(getInput3('Rotation', data ? [data.Rotation.a, data.Rotation.x, data.Rotation.y] : null));
  
  var style_sel = null;
  if (data) {
    style.map((item, index) => {
      if (item.value === data.BorderStyle) style_sel = index;
    })
  }

  parent.append(getSelect('Border Style', style, style_sel));
  parent.append(getSpin('Border Thickness', data ? data.BorderThickness : null, 1));

  parent.append(getSelect2('Fill', colorStyle, data ? colorStyle.indexOf(data.Fill.Style) : 0, data ? data.Fill.Color : '2 0 0 100 0 0 #ffffff00'));
  parent.append(getSelect2('Outline', colorStyle, data ? colorStyle.indexOf(data.Outline.Style) : 0, data ? data.Outline.Color : '2 0 0 100 0 0 #000000ff'));

  parent.append(getSpin('Opacity', data ? data.Opacity : 100, 0, 100));
  parent.append(getSlider('Z-Order', -100, 100, data ? data['Z-Order'] : null));

  syncSlider();
  syncColorSlider();
}

const formatText = data => {  
  const parent = $('#property');
  removeChildren(parent);

  parent.append(getInput('Object Name', data ? data.ObjectName : ''));
  parent.append(getTextArea('Designer Text', data ? data.DesignerText : 'Designer Text'));
  parent.append(getTextArea('Print Text', data ? data.PrintText : ''));
  // parent.append(getHorizontalLine());
  parent.append(getInput2('Location', data ? [data.Location.x, data.Location.y] : [0, 0]));
  parent.append(getInput2('Size', data ? [data.Size.width, data.Size.height] : [200, 100], 'size'));
  parent.append(getInput3('Rotation', data ? [data.Rotation.a, data.Rotation.x, data.Rotation.y] : null));

  // parent.append(getHorizontalLine());
    
  parent.append(getSelect('Font Family', fontFamily, data ? fontFamily.indexOf(data.FontFamily) : null));
  parent.append(getSpin('Font Size', data ? data.FontSize : 19, 1));

  var fontStyle = [
    'Normal',
    'Italic',
    'Oblique',
  ];
  
  parent.append(getSelect('Font Style', fontStyle, data ? fontStyle.indexOf(data.FontStyle) : null));

  var fontWeight = [
    { name: 'Extrabold', value: 800 },
    { name: 'Extralight', value: 200 },
    { name: 'Black', value: 900 },
    { name: 'Light', value: 300 },
    { name: 'Medium', value: 500 },
    { name: 'Normal', value: 400 },
    { name: 'Semibold', value: 600 },
    { name: 'Thin', value: 100},
    { name: 'Bold', value: 700 }
  ];

  var weight_sel = null;
  if (data) {
    fontWeight.map((item, index) => {
      if (item.value === parseInt(data.FontWeight)) weight_sel = index;
    })
  }

  parent.append(getSelect('Font Weight', fontWeight, weight_sel ? weight_sel : 5));

  var fontStretch = [
    'Ultra-condensed',
    'Extra-condensed',
    'Condensed',
    'Semi-condensed',      
    'Normal',
    'Semi-expanded',
    'Expanded',
    'Extra-expanded',
    'Ultra-expanded',                   
  ];
  parent.append(getSelect('Font Stretch', fontStretch, data ? fontStretch.indexOf(data.FontStretch) : 4));


  var textDecoration = [
    "None",
    "Underline",
    'Overline',
    'StrikeThrough'
  ];

  parent.append(getSelect('Text Decoration', textDecoration, data ? textDecoration.indexOf(data.TextDecoration) : null));
  // parent.append(getHorizontalLine());

  var hAlignment = [
    'Left',
    "Center",
    'Right',
  ];   

  parent.append(getSelect('H. Alignment', hAlignment, data ? hAlignment.indexOf(data.HAlignment) : 1));

  var vAlignment = [
    'Top',
    'Middle',
    'Bottom',
  ];

  parent.append(getSelect('V. Alignment', vAlignment, data ? vAlignment.indexOf(data.VAlignment) : 1));

  var textWrap = [
    'Fixed',
    'Resize',
  ];

  parent.append(getSelect('Text Wrapping', textWrap, data ? textWrap.indexOf(data.TextWrapping) : null));    
  parent.append(getInput('Line Height', data ? data.LineHeight : 0));

  parent.append(getSelect2('Fill', colorStyle, data ? colorStyle.indexOf(data.Fill.Style) : 0, data ? data.Fill.Color : '2 0 0 100 0 0 #ffffff00'));
  parent.append(getSelect2('Outline', colorStyle, data ? colorStyle.indexOf(data.Outline.Style) : 0, data ? data.Outline.Color : '2 0 0 100 0 0 #000000ff'));
  parent.append(getCheck('Show Border', data ? data.ShowBorder : false));
  
  parent.append(getSpin('Opacity', data ? parseFloat(data.Opacity) : 100, 0, 100));
  parent.append(getSlider('Z-Order', -100, 100, data ? data['Z-Order'] : null));

  syncSlider();
  syncColorSlider();  
}

const formatPicture = data => {
  const parent = $('#property');
  removeChildren(parent);

  parent.append(getInput('Object Name', data ? data.ObjectName : ''));
  parent.append(getFile("Designer Source", data ? data.DesignerSource[0] : null));
  parent.append(getTextArea('Source', data ? data.Source : ''));
  // parent.append(getHorizontalLine());
  parent.append(getInput2('Location', data ? [data.Location.x, data.Location.y] : [0, 0]));
  parent.append(getInput2('Size', data ? [data.Size.width, data.Size.height] : [200, 100], 'size'));
  parent.append(getInput3('Rotation', data ? [data.Rotation.a, data.Rotation.x, data.Rotation.y] : null));

  parent.append(getColor('Transparency Color', data ? data.TransparencyColor : '2 0 0 100 0 0 #ffffff00'));
  parent.append(getSlider('Transparency Tolerance', 0, 100, data ? data.TransparencyTolerance : 0));

  var stretch = [
    'None',
    'Fill',
    'Uniform',
    'UniformToFill',
  ];

  parent.append(getSelect('Stretch', stretch, data ? stretch.indexOf(data.Stretch) : 2));

  parent.append(getSpin('Opacity', data ? data.Opacity : 100, 0, 100));
  parent.append(getSlider('Z-Order', -100, 100, data ? data['Z-Order'] : null));

  syncSlider(); 
  syncColorSlider1();
}

const formatBarcode = data=> {
  const parent = $('#property');
  removeChildren(parent);

  parent.append(getInput('Object Name', data ? data.ObjectName : ''));
  parent.append(getTextArea('Design Data', data ? data.DesignData : '123456789'));
  parent.append(getTextArea('Data', data ? data.Data : ''));
  // parent.append(getHorizontalLine());
  parent.append(getInput2('Location', data ? [data.Location.x, data.Location.y] : [0, 0]));
  parent.append(getInput2('Size', data ? [data.Size.width, data.Size.height] : [200, 100], 'size'));
  parent.append(getInput3('Rotation', data ? [data.Rotation.a, data.Rotation.x, data.Rotation.y] : null));


  var type = [
    'CODE_39',
    'CODE_128',
    'DATA_MATRIX',
    'EAN_8',
    'EAN_13',
    'ITF',
    'PDF_417',
    'QR_CODE',
    'UPC_A',
    "MSI",
    'PLESSEEY',
  ];

  parent.append(getSelect('Type', type, data ? type.indexOf(data.Type) : 7));

  var stretch = [
    'None',
    'Fill',
    'Uniform',
    'UniformToFill',
  ];
  parent.append(getSelect('Stretch', stretch, data ? stretch.indexOf(data.Stretch) : 2));
  // parent.append(getHorizontalLine());

  // parent.append(getSelect2('Fill', colorStyle, 0, '#ffffff'));
  // parent.append(getSelect2('Outline', colorStyle, 0, '#000000'));

  parent.append(getSpin('Opacity', data ? data.Opacity : 100, 0, 100));
  parent.append(getSlider('Z-Order', -100, 100, data ? data['Z-Order'] : null));

  syncSlider();
  syncColorSlider();
}


const formatShape = layer => {
  var title;
  var data;
  var name;

  if (typeof layer === 'string') {
    title = layer.capitalize() + ' Properties';
    name = layer;
    data = null;
  } else {
    name = layer.layerName.replace(/[0-9]/g, '');
    title = name.capitalize() + ' Properties';
    data = layer.data;
  }

  $('#property').parent().prev().text(title);

  switch (name) { 
    case 'rectangle':
      formatRect(data);
      break;  
    case 'line':
      formatLine(data);
      break; 
    case 'ellipse':
      formatEllipse(data);
      break;
    case 'text':
      formatText(data);
      break;
    case 'picture':
      formatPicture(data);
      break;
    case 'barcode':
      formatBarcode(data);
      break;
  }
}

const divideRGBA = rgba => {
  return [rgba.substr(0, rgba.length - 2), parseInt(rgba.substr(rgba.length - 2), 16) * 100 / 255];
}
