const panel = layer => {
  if (layer.layerName && layer.layerName.search('line') === 0) {
    panelLine(layer.data);
  } else if (layer.layerName && layer.layerName.search('rectangle') === 0) {
    panelRect(layer.data);
  } else if (layer.layerName && layer.layerName.search('ellipse') === 0) {
    panelEllipse(layer.data);    
  } else if (layer.layerName && layer.layerName.search('text') === 0) {
    panelText(layer.data);    
  } else if (layer.layerName && layer.layerName.search('picture') === 0) {
    panelPicture(layer.data);    
  } else if (layer.layerName && layer.layerName.search('barcode') === 0) {
    panelBarcode(layer.data);    
  }
}


const panelLine = data => {
    console.log(data);
}

const panelRect = data => {

}

const panelEllipse = data => {

}

const panelText = data => {

}

const panelPicture = data => {

}

const panelBarcode = data => {

}


const initPanel = () => {
  const xmlns = "http://www.w3.org/2000/svg";

  svgDom = d3.select('#panel')
          .append('svg')
          .attr('xmlns', xmlns)
          .attr('xmlns:v', "http://vecta.io")
          .attr("width", present_panel.Width)
          .attr("height", present_panel.Height)
          .attr('opacity', present_panel.Opacity)
          .attr('font-family', present_panel.DefaultFont)
          .attr("font-size", present_panel.DefaultFontSize)
          .attr('viewBox', "0 0 " + present_panel.Width + ' ' + present_panel.Height)
          // .attr("style", 'position: relative');
  
  const font_url = "https://fonts.googleapis.com/css?family=" + present_panel.DefaultFont;
  try {
    GFontToDataURI(font_url)
      .then(cssRules => {
        svgDom.append('defs')
              .append('style')
              .text(cssRules.join('\n'));
      });
  }
  catch (ex) {
    console.log(ex)
  }  
  // svgDom.append('rect')
  //   .attr('width', 700)
  //   .attr("height", 900);
}