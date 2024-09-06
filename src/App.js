// src/App.js
import React, { useState } from "react";
import { init } from 'filestack-js';
import "./App.css"; // Import the styles

const client = init("A18L3T2eWRemxYIGwGlZsz");


function App() {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const handleUpload = () => {
    client
      .picker({
        accept: "image/*",
        onUploadDone: (res) => {
          const handle = res.filesUploaded[0].handle;
          generateQRCode(handle);
        },
      })
      .open();
  };

  const generateQRCode = (handle) => {
    const qrUrl = `https://cdn.filestackcontent.com/apikey/qr/${handle}`;
    setQrCodeUrl(qrUrl);
  };

  return (
    <div className="container">
      <img
        src="https://img.freepik.com/premium-vector/qr-code-cartoon-character-searching-with-magnifying-glass-cute-design_152558-13614.jpg"
        alt="Cartoon Banner"
        className="banner-img"
      />
      <h1>Filestack QR Code Generator</h1>
      <button id="uploadBtn" onClick={handleUpload}>
        Upload File
      </button>

      <div id="qrCode">
        {qrCodeUrl && (
          <img src={qrCodeUrl} alt="QR Code" style={{ maxWidth: "100%", height: "auto" }} />
        )}
      </div>

      {qrCodeUrl && (
        <a id="downloadLink" href={qrCodeUrl} download="qrcode.png">
          <button id="downloadBtn">Download QR Code</button>
        </a>
      )}
    </div>
  );
}

export default App;
