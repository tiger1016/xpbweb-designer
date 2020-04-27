const init = () => {
  $('#bn-rect').click(function() {
  // console.log('ok')
  });

  $('#bn-line').click(function() {
    var parent = $('#property');
    $(parent).append(getInput('Object Name'));
    $(parent).append(getInput('Opacity'));
    $(parent).append(getInput('Z-Order'));
    $(parent).append(getInput2('Start'));
    $(parent).append(getInput2('End'));

    var Style = [12,2,4,5,4,64,6,3,63,3];
    $(parent).append(getSelect('Style', Style));
    $(parent).append(getOneProperty('Object Name'));
    $(parent).append(getOneProperty('Object Name'));
  });

  $('#bn-ellipse').click(function() {

  });

  $('#bn-picture').click(function() {

  });

  $('#bn-barcode').click(function() {

  });

  $('#bn-text').click(function() {

  });
}

const getInput = name => {
  var id = name.replace(/ /g, '');

  return (
    `<div class='row' style='margin-top: 6px;'>
      <div class='col-sm-5'>
        <label id='Object' style='float: right'>${name}</label>
      </div>
      <div class='col-sm-7'>
        <input type='text' id='${id}' style='width: 100%'/>
      </div>
    </div>`
  );
}

const getInput2 = name => {
  var id = name.replace(/ /g, '');

  return (
    `<div class='row' style='margin-top: 6px;'>
      <div class='col-sm-5'>
        <label id='Object' style='float: right'>${name}</label>
      </div>
      <div class='col-sm-3'>
        <input type='text' id='${id}_x' style='margin-left: 20px; width: 100%'/>
      </div>
      <div class='col-sm-3'>
        <input type='text' id='${id}_y' style='width: 100%; margin-left: 10px;'/>
      </div>
    </div>`
  );
}

const getSelect = (name, value) => {
  var id = name.replace(/ /g, '');

  return (
    `<div class='row' style='margin-top: 6px;'>
      <div class='col-sm-5'>
        <label id='Object' style='float: right'>${name}</label>
      </div>
      <div class='col-sm-7'>
        <select id='${id}' style='width: 100%'>
          ${value.map(element => {
            return (
              `<option>${element}</option>`
            );
          })}
        </select>
      </div>
    </div>`
  );
}

const getCheck = name = {
  
}

init();