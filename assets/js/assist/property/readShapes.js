const readLine = () => {
  const property = $('#property');
  const prop = {};

  prop['Object Name'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity_text').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Start'] = {
    x: parseFloat(property.find('#Start_x').val()),
    y: parseFloat(property.find('#Start_y').val())
  };

  prop['End'] = {
    x: parseFloat(property.find('#End_x').val()),
    y: parseFloat(property.find('#End_y').val())
  };

  prop['Style'] = property.find('#Style').val();
  prop['Thickness'] = parseFloat(property.find('#Thickness_text').val());
  prop['Stroke'] = {
    Style: property.find('#Stroke_sel').val(),
    Color: property.find('#Stroke').val()
  };

  return prop;
}

const readEllipse = () => {
  var prop = {};
  const property = $('#property');

  prop['Object Name'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity_text').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Location'] = {
    x: parseFloat(property.find('#Location_x').val()),
    y: parseFloat(property.find('#Location_y').val())
  };

  prop['Size'] = {
    width: parseFloat(property.find("#Size_x").val()),
    height: parseFloat(property.find('#Size_y').val())
  };

  prop['Rotation'] = {
    a: parseFloat(property.find('#Rotation_angle').val()),
    x: parseFloat(property.find('#Rotation_x').val()),
    y: parseFloat(property.find('#Rotation_y').val())
  };

  prop['Border Style'] = property.find('#BorderStyle').val();
  prop['Border Thickness'] = property.find('#BorderThickness').val();

  prop['Fill'] = {
    Style: property.find('#Fill_sel').val(),
    Color: property.find('#Fill').val(),
  };

  prop['Outline'] = {
    Style: property.find('#Outline_sel').val(),
    Color: property.find('#Outline').val()
  };

  return prop;
}

const readPicture = () => {
  var prop = {};
  const property = $('#property');

  prop['Object Name'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity_text').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Location'] = {
    x: parseFloat(property.find('#Location_x').val()),
    y: parseFloat(property.find('#Location_y').val())
  };

  prop['Size'] = {
    width: parseFloat(property.find("#Size_x").val()),
    height: parseFloat(property.find('#Size_y').val())
  };

  prop['Rotation'] = {
    a: parseFloat(property.find('#Rotation_angle').val()),
    x: parseFloat(property.find('#Rotation_x').val()),
    y: parseFloat(property.find('#Rotation_y').val())
  };

  const file = property.find('#DesignerSource')[0].files[0];
  prop['Designer Source'] = file ? file.name : null;
  prop['Source'] = property.find('#Source').val();
  prop['Transparency Color'] = property.find('#TransparencyColor').val();
  prop['Transparency Tolerance'] = property.find('#TransparencyTolerance_text').val();
  prop['Stretch'] = property.find("#Stretch").val();

  return prop;
}

const readBarcode = () => {
  var prop = {};
  const property = $('#property');

  prop['Object Name'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity_text').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Location'] = {
    x: parseFloat(property.find('#Location_x').val()),
    y: parseFloat(property.find('#Location_y').val())
  };

  prop['Size'] = {
    width: parseFloat(property.find("#Size_x").val()),
    height: parseFloat(property.find('#Size_y').val())
  };

  prop['Rotation'] = {
    a: parseFloat(property.find('#Rotation_angle').val()),
    x: parseFloat(property.find('#Rotation_x').val()),
    y: parseFloat(property.find('#Rotation_y').val())
  };

  prop['Type'] = property.find('#Type').val();
  prop['Stretch'] = property.find("#Stretch").val();
  prop['Design Data'] = property.find('#DesignData').val();
  prop['Data'] = property.find("#Data").val();
  prop['Fill'] = {
    Style: property.find('#Fill_sel').val(),
    Color: property.find('#Fill').val(),
  };

  prop['Outline'] = {
    Style: property.find('#Outline_sel').val(),
    Color: property.find('#Outline').val()
  };

  return prop;
}

const readText = () => { 
  var prop = {};
  const property = $('#property');

  prop['Designer Text'] = property.find('#DesignerText').val();
  prop['Print Text'] = property.find('#PrintText').val();
  prop['Object Name'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity_text').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Location'] = {
    x: parseFloat(property.find('#Location_x').val()),
    y: parseFloat(property.find('#Location_y').val())
  };

  prop['Size'] = {
    width: parseFloat(property.find("#Size_x").val()),
    height: parseFloat(property.find('#Size_y').val())
  };

  prop['Rotation'] = {
    a: parseFloat(property.find('#Rotation_angle').val()),
    x: parseFloat(property.find('#Rotation_x').val()),
    y: parseFloat(property.find('#Rotation_y').val())
  };

  prop['Font Family'] = property.find("#FontFamily").val();
  prop['Font Size'] = parseInt(property.find('#FontSize').val());
  prop['Font Style'] = property.find("#FontStyle").val();
  prop['Font Weight'] = property.find("#FontWeight").val();
  prop['Font Stretch'] = property.find("#FontStretch").val();
  prop['Text Decoration'] = property.find("#TextDecoration").val();
  prop['H. Alignment'] = property.find("#HAlignment").val();
  prop['V. Alignment'] = property.find("#VAlignment").val();
  prop['Text Wrapping'] = property.find("#TextWrapping").val();
  prop['Line Height'] = parseFloat(property.find('#LineHeight').val());
  prop['Fill'] = {
    Style: property.find('#Fill_sel').val(),
    Color: property.find('#Fill').val(),
  };

  prop['Outline'] = {
    Style: property.find('#Outline_sel').val(),
    Color: property.find('#Outline').val()
  };
  prop['Show Border'] = property.find('#ShowBorder').val();

  return prop;
}

const readPanel = () => {
  var prop = {};
  const property = $('#property');

  prop['Width'] = parseFloat(property.find('#Width').val());
  prop['Height'] = parseFloat(property.find('#Height').val());
  prop['Opacity'] = parseInt(property.find('#Opacity_text').val());
  prop['Default Font'] = property.find("#DefaultFont").val();
  prop['Default Font Size'] = parseInt(property.find("#DefaultFontSize").val());

  return prop;
}


const readShape = name => {
  switch (name) {
    case 'line':
      return readLine();
    case 'rectangle':
      var prop = readEllipse();
      prop['Corner Radius'] = parseInt($('#property').find('#CornerRadius').val());
      return prop;
    case 'ellipse':
      return readEllipse();
    case 'picture':
      return readPicture();
    case 'barcode':
      return readBarcode();
    case 'text':
      return readText();
    case 'panel':
      return readPanel();
  }
}