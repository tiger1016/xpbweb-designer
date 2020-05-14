<?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['files'])) {
      header('Content-Type: application/json');

      $errors = [];

      $extensions = ['jpg', 'jpeg', 'svg', 'png', 'bmp'];
      $all_files = count($_FILES['files']['tmp_name']);

      $res_result = array();
      for ($i = 0; $i < $all_files; $i++) {
        $file_name = $_FILES['files']['name'][$i];
        $file_tmp = $_FILES['files']['tmp_name'][$i];
        $file_size = $_FILES['files']['size'][$i];
        $tmp = explode('.', $_FILES['files']['name'][$i]);
        $file_ext = strtolower(end($tmp));

        if (!in_array($file_ext, $extensions)) {
          $errors = array('error' => 'extension');
        }

        if ($file_size > 2097152) {
          $errors = array('error' => 'size');
        }

        if (empty($errors)) {                  
          $img = file_get_contents($file_tmp);
          array_push($res_result, base64_encode($img));
        }
      }
      
      if ($errors) {
          echo json_encode($errors);
      } else {
          echo json_encode($res_result);
      }
    }
  } else {
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WEB DESIGNER</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="./assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/css/editor.css">

    <script src="./assets/js/3rd/jquery.min.js"></script>
    <script src="./assets/js/3rd/bootstrap.min.js"></script>
    
    <script src='./assets/js/3rd/d3.js'></script>
    <script src='./assets/js/3rd/d3plus.js'></script>
    <script src='./assets/js/3rd/bwip-min.js'></script>
    <script src='./assets/js/3rd/qrious.min.js'></script>
    <script src='./assets/js/3rd/download.js'></script>
    <script src='./assets/js/3rd/jsBarcode.all.min.js'></script>
    
    <script src='./assets/js/assist/layout/layout.js'></script>
    <script src='./assets/js/assist/property/getElements.js'></script>
    <script src='./assets/js/assist/property/printShapes.js'></script>
    <script src='./assets/js/assist/property/readShapes.js'></script>
    <script src='./assets/js/assist/panel/getImage.js'></script>
    <script src='./assets/js/assist/panel/barcodeGen.js'></script>
    <script src='./assets/js/assist/panel/panel.js'></script>
    <script src='./assets/js/assist/part/getColor.js'></script>
    <script src='./assets/js/assist/activity/index.js'></script>
    <script src='./assets/js/assist/activity/action_panel.js'></script>
    <script src='./assets/js/assist/activity/action_property.js'></script>
    <script src='./assets/js/assist/xmlProcess/index.js'></script>
    <script src='./assets/js/assist/xmlProcess/encode.js'></script>
    <script src='./assets/js/assist/xmlProcess/decode.js'></script>
    <script src='./assets/js/assist/part/unitConvert.js'></script>

  </head>

  <body>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#" style='margin-left: 10px;'>WEB DESIGNER</a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="javascript: createPanel()"><span class="glyphicon glyphicon-file"></span> New</a></li>
            <li><a href="javascript: loadPanel()"><span class="glyphicon glyphicon-open"></span> Load</a></li>
            <li><a href="javascript: savePanel()"><span class="glyphicon glyphicon-log-in"></span> Save</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid text-left">
      <div class="row content">
          <div class="sidenav TA" id='Scrollstyle1' style='width: 500px'>
            <div class="panel panel-primary">
              <div class="panel-heading">Tool Box</div>
              <div class="panel-body" id='toolbox'>
              </div>
            </div>

            <!-- <div class="panel panel-primary">
              <div class="panel-heading">Layouts</div>
              <div class="panel-body">
                <div class='container-fluid' id='layout'></div>
              </div>
            </div> -->

            <div class="panel panel-primary">
              <div class="panel-heading">Properties</div>
              <div class="panel-body">
                <div class='container-fluid' id='property'></div>
              </div>
            </div> 

          </div>

          <div class="text-left" id='panel_parent' val='1' style='position: absolute; left: 510px'> 
            <div id='panel'></div>
          </div> 

          <!-- <div class="col-sm-4 sidenav TA" id='Scrollstyle2' style='background-color: rgba(255,255,255,0)'> 
            <div class="panel panel-primary">
              <div class="panel-heading">Properties</div>
              <div class="panel-body">
                <div class='container-fluid' id='property'></div>
              </div>
            </div>
          </div>   -->
      </div>
    </div>
    <input type='file' id='badge_load' style="display: none" />
    <!-- <footer class="container-fluid text-center">
      <p>by DAVID</p>
    </footer> -->

  </body>
  <script src='./assets/js/main.js'></script>
</html>
<?php
  }
?>