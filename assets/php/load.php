<?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      if (isset($_FILES['files'])) {
          header('Content-Type: application/json');

          $errors = [];
          $path = '../../assets/uploads/';

          if (!is_dir($path)) {
            mkdir($path);
          }

          $xmlDoc = new DOMDocument();

          $extensions = ['zip', 'badge', 'xml', 'json'];
          $all_files = count($_FILES['files']['tmp_name']);

          $res_result = array();
          for ($i = 0; $i < $all_files; $i++) {
              $file_name = $_FILES['files']['name'][$i];
              $file_tmp = $_FILES['files']['tmp_name'][$i];
              $file_size = $_FILES['files']['size'][$i];
              $tmp = explode('.', $_FILES['files']['name'][$i]);
              $file_ext = strtolower(end($tmp));
              
              $file = $path . $file_name;

              if (!in_array($file_ext, $extensions)) {
                  $errors = array('error' => 'extension');
              }

              if ($file_size > 2097152) {
                  $errors = array('error' => 'size');
              }

              if (empty($errors)) {
                  move_uploaded_file($file_tmp, $file);

                  if ($file_ext == 'badge'){
                      rename($file, str_replace('.badge', '.zip', $file));
                      $file = str_replace('.badge', '.zip', $file);
                      $file_ext = 'zip';
                  }        

                  if ($file_ext == 'zip') {
                      $zip = new ZipArchive;
                      $res = $zip->open($file);
                      
                      if ($res === TRUE) {
                          $zip->extractTo($path);
                          $zip->close();
                          unlink($file);
                      } else {
                          echo json_encode(array('error' => "unzip"));
                      }

                      $file = str_replace('.zip', '.badge', $file);
                      rename($file, str_replace('.badge', '.xml', $file));
                      $file = str_replace('.badge', '.xml', $file);
                      $file_ext = 'xml';
                  }
                  
                  if ($file_ext === 'xml') {
                    $xmlDoc->load($file);
                
                    array_push($res_result, $xmlDoc->saveXML());
                  } else {
                    $string = file_get_contents($file);
                    array_push($res_result, $string);
                  }
              }
          }

          function deleteDirectory($dir) {
            if (!file_exists($dir)) {
                return true;
            }
        
            if (!is_dir($dir)) {
                return unlink($dir);
            }
        
            foreach (scandir($dir) as $item) {
                if ($item == '.' || $item == '..') {
                    continue;
                }
        
                if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                    return false;
                }        
            }
        
            return rmdir($dir);
          }      
          
          deleteDirectory($path);
          
          if ($errors) {
              echo json_encode($errors);
          } else {
              echo json_encode($res_result);
          }
      }
  }
?>