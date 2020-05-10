var rect_num = 0;
var line_num = 0;
var ellipse_num = 0;
var picture_num = 0;
var barcode_num = 0;
var text_num = 0;


const layout = name => {
  // const layout = $('#layout');
  // if (!layout.children().length) {
  //   layout.append('<ul></ul>');
  // }


  switch (name) {
    case "line":
      name = line_num ? name + line_num : name;
      line_num++;
      break;
    case 'rectangle':
      name = rect_num ? name + rect_num : name;
      rect_num++;
      break;
    case 'ellipse':
      name = ellipse_num ? name + ellipse_num: name;
      ellipse_num++;
      break;
    case 'text':
      name = text_num ? name + text_num: name;
      text_num++;
      break;
    case 'picture':
      name =picture_num ? name + picture_num: name;
      picture_num++;
      break;
    case 'barcode':
      name = barcode_num ? name + barcode_num: name;
      barcode_num++;
      break;
  }

  // layout.children(':first-child').append(getList(name));

  return name;
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const getList = name => {
  name = name.capitalize();

  return (
    `<li  class='layout_li' id="${name}" style='padding_left: 0;'>
      <a style="text-decoration: none !important">${name}</a>
    </li>`
  );
}
