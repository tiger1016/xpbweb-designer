const fontFamilly = [
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


const style = [12,2,4,5,4,64,6,3,63,3];
const colorStyle = ['SolidColor', 'LinearGradientColor', 'RadialGradientColor'];


const formatPanel = () => {
  const parent = $('#property');
  $('#property').parent().prev().text('Panel Properties');

  const panel = $('#panel');


  removeChildren(parent);

  parent.append(getInput('Width', panel.width()));  
  parent.append(getInput('Height', panel.height()));
  parent.append(getSlider('Opacity', 0, 100, 100));
  parent.append(getSelect('Default Font', fontFamilly));
  parent.append(getInput('Default Font Size', 12));
}

const formatLine = () => {
  const parent = $('#property');

  removeChildren(parent);

  parent.append(getInput('Object Name'));
  parent.append(getSlider('Opacity', 0, 100, 100));
  parent.append(getSlider('Z-Order', -100, 100));
  parent.append(getHorizontalLine());
  parent.append(getInput2('Start'));
  parent.append(getInput2('End'));
  parent.append(getHorizontalLine());

  parent.append(getSelect('Style', style));
  parent.append(getSlider('Thickness', 0, 30));
  parent.append(getHorizontalLine());
  
  var colorStyle = ['SolidColor', 'LinearGradientColor', 'RadialGradientColor'];
  parent.append(getSelect2('Stroke', colorStyle, 0, '#000000'));

  syncSlider();
  syncColorSlider();
}

const formatRect = () => {
  const parent = $('#property');

  removeChildren(parent);

  parent.append(getInput('Object Name'));
  parent.append(getSlider('Opacity', 0 , 100));
  parent.append(getSlider('Z-Order', -100, 100));
  parent.append(getHorizontalLine());
  parent.append(getInput2('Location'));
  parent.append(getInput2('Size'));
  parent.append(getInput3('Rotation'));
  parent.append(getHorizontalLine());

  parent.append(getSelect('Border Style', style));
  parent.append(getSpin('Border Thickness'));
  parent.append(getSpin('Corner Radius', 0));
  parent.append(getHorizontalLine());

  parent.append(getSelect2('Fill', colorStyle, 0, '#ffffff'));
  parent.append(getSelect2('Outline', colorStyle, 0, '#000000'));

  syncSlider();
  syncColorSlider();
}

const formatEllipse = () => {
  const parent = $('#property');

  removeChildren(parent);

  parent.append(getInput('Object Name'));
  parent.append(getSlider('Opacity', 0 , 100));
  parent.append(getSlider('Z-Order', -100, 100));
  parent.append(getHorizontalLine());
  parent.append(getInput2('Location'));
  parent.append(getInput2('Size'));
  parent.append(getInput3('Rotation'));
  parent.append(getHorizontalLine());

  parent.append(getSelect('Border Style', style));
  parent.append(getSpin('Border Thickness'));
  parent.append(getHorizontalLine());

  parent.append(getSelect2('Fill', colorStyle, 0, '#ffffff'));
  parent.append(getSelect2('Outline', colorStyle, 0, '#000000'));

  syncSlider();
  syncColorSlider();
}

const formatText = () => {  
  const parent = $('#property');

  removeChildren(parent);

  parent.append(getTextArea('Designer Text'));
  parent.append(getTextArea('Print Text'));
  parent.append(getHorizontalLine());
  parent.append(getInput('Object Name'));
  parent.append(getSlider('Opacity', 0 , 100));
  parent.append(getSlider('Z-Order', -100, 100));
  parent.append(getHorizontalLine());
  parent.append(getInput2('Location'));
  parent.append(getInput2('Size'));
  parent.append(getInput3('Rotation'));
  parent.append(getHorizontalLine());

 

  parent.append(getSelect('Font Family', fontFamilly));
  parent.append(getSpin('Font Size', 12));

  var fontStyle = [
    'Normal',
    'Italic',
    'Oblique',
  ];

  parent.append(getSelect('Font Style', fontStyle));

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
  parent.append(getSelect('Font Weight', fontWeight, 5));

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
  parent.append(getSelect('Font Stretch', fontStretch, 4));


  var textDecoration = [
    "None",
    "Underline",
    'Overline',
    'StrikeThrough'
  ];

  parent.append(getSelect('Text Decoration', textDecoration));
  parent.append(getHorizontalLine());

  var hAlignment = [
    'Left',
    "Center",
    'Right',
  ];   

  parent.append(getSelect('H. Alignment', hAlignment, 1));

  var vAlignment = [
    'Top',
    'Middle',
    'Bottom',
  ];

  parent.append(getSelect('V. Alignment', vAlignment, 1));

  var textWrap = [
    'Fixed',
    'Resize',
  ];

  parent.append(getSelect('Text Wrapping', textWrap));    
  parent.append(getInput('Line Height', 0));

  parent.append(getSelect2('Fill', colorStyle, 0, '#ffffff'));
  parent.append(getSelect2('Outline', colorStyle, 0, '#000000'));
  parent.append(getCheck('Show Border'));

  syncSlider();
  syncColorSlider();  
}

const formatPicture = () => {
  const parent = $('#property');

  removeChildren(parent);

  parent.append(getInput('Object Name'));
  parent.append(getSlider('Opacity', 0 , 100));
  parent.append(getSlider('Z-Order', -100, 100));
  parent.append(getHorizontalLine());
  parent.append(getInput2('Location'));
  parent.append(getInput2('Size'));
  parent.append(getInput3('Rotation'));
  parent.append(getHorizontalLine());

  parent.append(getFile("Designer Source"));
  parent.append(getTextArea('Source'));
  parent.append(getColor('Transparency Color', '#ffffff'));
  parent.append(getSlider('Transparency Tolerance', 0, 100, 0));

  var stretch = [
    'None',
    'Fill',
    'Uniform',
    'UniformToFill',
  ];

  parent.append(getSelect('Stretch', stretch, 2));

  syncSlider(); 
  syncColorSlider();
}

const formatBarcode = () => {
  const parent = $('#property');
  removeChildren(parent);

  parent.append(getInput('Object Name'));
  parent.append(getSlider('Opacity', 0 , 100));
  parent.append(getSlider('Z-Order', -100, 100));
  parent.append(getHorizontalLine());
  parent.append(getInput2('Location'));
  parent.append(getInput2('Size'));
  parent.append(getInput3('Rotation'));
  parent.append(getHorizontalLine());

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

  parent.append(getSelect('Type', type, 7));

  var stretch = [
    'None',
    'Fill',
    'Uniform',
    'UniformToFill',
  ];
  parent.append(getSpin('Stretch'));
  parent.append(getTextArea('Design Data'));
  parent.append(getTextArea('Data'));
  parent.append(getHorizontalLine());

  parent.append(getSelect2('Fill', colorStyle, 0, '#ffffff'));
  parent.append(getSelect2('Outline', colorStyle, 0, '#000000'));

  syncSlider();
  syncColorSlider();
}


const formatShape = name => {
  var title = name.capitalize() + ' Properties';

  $('#property').parent().prev().text(title);

  switch (name) { 
    case 'rectangle':
      formatRect();
      break;  
    case 'line':
      formatLine();
      break; 
    case 'ellipse':
      formatEllipse();
      break;
    case 'text':
      formatText();
      break;
    case 'picture':
      formatPicture();
      break;
    case 'barcode':
      formatBarcode();
      break;
  }
}