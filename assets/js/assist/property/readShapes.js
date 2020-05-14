const readLine = () => {
  const property = $('#property');
  const prop = {};

  prop['ObjectName'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Start'] = {
    x: convertToPixel(parseFloat(property.find('#Start_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Start_y').val()), DU)
  };

  prop['End'] = {
    x: convertToPixel(parseFloat(property.find('#End_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#End_y').val()), DU)
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

  prop['ObjectName'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Location'] = {
    x: convertToPixel(parseFloat(property.find('#Location_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Location_y').val()), DU)
  };

  prop['Size'] = {
    width: convertToPixel(parseFloat(property.find('#Size_x').val()), DU),
    height: convertToPixel(parseFloat(property.find('#Size_y').val()), DU)
  };

  prop['Rotation'] = {
    a: parseFloat(property.find('#Rotation_angle').val()),
    x: convertToPixel(parseFloat(property.find('#Rotation_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Rotation_y').val()), DU)
  };

  prop['BorderStyle'] = property.find('#BorderStyle').val();
  prop['BorderThickness'] = property.find('#BorderThickness').val();

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

const readPicture = async () => {
  var prop = {};
  const property = $('#property');

  prop['ObjectName'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Location'] = {
    x: convertToPixel(parseFloat(property.find('#Location_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Location_y').val()), DU)
  };

  prop['Size'] = {
    width: convertToPixel(parseFloat(property.find('#Size_x').val()), DU),
    height: convertToPixel(parseFloat(property.find('#Size_y').val()), DU)
  };

  prop['Rotation'] = {
    a: parseFloat(property.find('#Rotation_angle').val()),
    x: convertToPixel(parseFloat(property.find('#Rotation_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Rotation_y').val()), DU)
  };

  prop['Source'] = property.find('#Source').val();
  prop['TransparencyColor'] = property.find('#TransparencyColor').val();
  prop['TransparencyTolerance'] = property.find('#TransparencyTolerance_text').val();
  prop['Stretch'] = property.find("#Stretch").val();

  const file = property.find('#DesignerSource')[0].files[0];

  if (file) {
    const formdata = new FormData();

    formdata.append('files[]', file, file ? file.name : 'null');  

    const data = await (await fetch('index.php', {
        method: 'POST',
        body: formdata
    })).json();

    prop['DesignerSource'] = [property.find('#DesignerSource')[0].value, data[0]];
  }
  
  return prop;
}

const readBarcode = () => {
  var prop = {};
  const property = $('#property');

  prop['ObjectName'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Location'] = {
    x: convertToPixel(parseFloat(property.find('#Location_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Location_y').val()), DU)
  };

  prop['Size'] = {
    width: convertToPixel(parseFloat(property.find('#Size_x').val()), DU),
    height: convertToPixel(parseFloat(property.find('#Size_y').val()), DU)
  };

  prop['Rotation'] = {
    a: parseFloat(property.find('#Rotation_angle').val()),
    x: convertToPixel(parseFloat(property.find('#Rotation_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Rotation_y').val()), DU)
  };

  prop['Type'] = property.find('#Type').val();
  prop['Stretch'] = property.find("#Stretch").val();
  prop['DesignData'] = property.find('#DesignData').val();
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

  prop['DesignerText'] = property.find('#DesignerText').val();
  prop['PrintText'] = property.find('#PrintText').val();
  prop['ObjectName'] = property.find('#ObjectName').val();
  prop['Opacity'] = parseInt(property.find('#Opacity').val());
  prop['Z-Order'] = parseInt(property.find('#Z-Order_text').val());
  prop['Location'] = {
    x: convertToPixel(parseFloat(property.find('#Location_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Location_y').val()), DU)
  };

  prop['Size'] = {
    width: convertToPixel(parseFloat(property.find('#Size_x').val()), DU),
    height: convertToPixel(parseFloat(property.find('#Size_y').val()), DU)
  };

  prop['Rotation'] = {
    a: parseFloat(property.find('#Rotation_angle').val()),
    x: convertToPixel(parseFloat(property.find('#Rotation_x').val()), DU),
    y: convertToPixel(parseFloat(property.find('#Rotation_y').val()), DU)
  };

  prop['FontFamily'] = property.find("#FontFamily").val();
  prop['FontSize'] = parseInt(property.find('#FontSize').val());
  prop['FontStyle'] = property.find("#FontStyle").val();
  prop['FontWeight'] = property.find("#FontWeight").val();
  prop['FontStretch'] = property.find("#FontStretch").val();
  prop['TextDecoration'] = property.find("#TextDecoration").val();
  prop['HAlignment'] = property.find("#HAlignment").val();
  prop['VAlignment'] = property.find("#VAlignment").val();
  prop['TextWrapping'] = property.find("#TextWrapping").val();
  prop['LineHeight'] = parseFloat(property.find('#LineHeight').val());
  prop['Fill'] = {
    Style: property.find('#Fill_sel').val(),
    Color: property.find('#Fill').val(),
  };

  prop['Outline'] = {
    Style: property.find('#Outline_sel').val(),
    Color: property.find('#Outline').val()
  };
  prop['ShowBorder'] = property.find('#ShowBorder').is(':checked');

  return prop;
}

const readPanel = () => {
  var prop = {};
  const property = $('#property');

  prop['DisplayUnit'] = property.find('#DisplayUnit').val();
  DU = displayUnit.indexOf(prop['DisplayUnit']);

  prop['Width'] = convertToPixel(parseFloat(property.find('#Width').val()), DU);
  prop['Height'] = convertToPixel(parseFloat(property.find('#Height').val()), DU);
  prop['Opacity'] = parseInt(property.find('#Opacity').val());
  prop['DefaultFont'] = property.find("#DefaultFont").val();
  prop['DefaultFontSize'] = parseInt(property.find("#DefaultFontSize").val());

  return prop;
}


const readShape = async name => {
  switch (name.toLowerCase()) {
    case 'line':
      return readLine();
    case 'rectangle':
      var prop = readEllipse();
      prop['CornerRadius'] = parseInt($('#property').find('#CornerRadius').val());
      return prop;
    case 'ellipse':
      return readEllipse();
    case 'picture':
      var prop = await readPicture();
      return prop;
    case 'barcode':
      return readBarcode();
    case 'text':
      return readText();
    case 'panel':
      return readPanel();
  }
}