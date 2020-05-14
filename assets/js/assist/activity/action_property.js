const property_action = () => {
  const property = $('#property');

  property.change(async e => {
    if (!activeLayer) return;
    
    var name = activeLayer.layerName.replace(/[0-9]/g, '');
    var data = await readShape(name);

    saveActiveLayer(data);

    if ($(e.target).attr("id").search('Z-Order') === 0) {
      svgDom.select('#' + activeLayer.layerName)
            .attr('z-index', data['Z-Order']);

      zOrder();
      selectRect(activeLayer.layerName, data);
      return;
    }

    if (activeLayer.layerName === 'panel') {
      refreshPanel(data);
      return;
    }

    $('#' + activeLayer.layerName).remove();
    formatShape(activeLayer);
    panel(activeLayer);
    selectRect(activeLayer.layerName, data);
  });
}
