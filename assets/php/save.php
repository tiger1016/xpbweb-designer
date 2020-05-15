<?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
      $xmlString = file_get_contents('php://input');
      header('Content-Type: application/json');

      $errors = [];
      $path = '../../saved/';

      if (!is_dir($path)) {
        mkdir($path);
      }
      
      $file = $path . 'output.xml';

      $dom = new DOMDocument;
      $dom->preserveWhiteSpace = FALSE;
      $dom->loadXML($xmlString);

      $dom->save($file);
      rename($file, str_replace('.xml', '.badge', $file));
      $file = str_replace('.xml', '.badge', $file);

      $zip = new ZipArchive;
      $fileName = $path . "output.zip";

      if ($zip->open($fileName, ZIPARCHIVE::CREATE)!==TRUE) {
        throw new Exception('Can not create zip file.');
      }

      if (file_exists($file)) {
        $zip->addFile($file, 'output.badge');
      }

      $zip->close();
      unlink($file);

      rename($fileName, str_replace('.zip', '.badge', $fileName));
      $fileName = str_replace('.zip', '.badge', $fileName);

      $result = array();
      array_push($result, $fileName);

      echo json_encode($result);
    }
  }    
?>