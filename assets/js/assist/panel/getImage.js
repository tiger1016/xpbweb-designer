const fetchArraybuffer = (path, callback) => {
  var httpRequest = new XMLHttpRequest();
  
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var arrayBuffer = httpRequest.response;
      if (callback) callback(arrayBuffer);
      } else {
        callback();
      }
    }
  };

  httpRequest.onerror = function() {
    console.log("** fetchArraybuffer", httpRequest.status);
  };

  httpRequest.responseType = "arraybuffer";
  httpRequest.open("GET", path);
  httpRequest.send();
};

const fetchImage = (path, extension) => {
  return new Promise(async resolve => {
    fetchArraybuffer(path, arraybuffer => {
      if (!arraybuffer) {
        resolve();
      }

      const final = "data:image/" +
            extension +
            ";base64," +
            arrayBufferToBase64(arraybuffer);

      resolve(final);
    });        
  })
};

const arrayBufferToBase64 = buffer => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;

  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
};