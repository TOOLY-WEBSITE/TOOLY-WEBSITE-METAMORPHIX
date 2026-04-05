const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");

const app = express();

const upload = multer({ dest: "uploads/" });

app.post("/compress", upload.single("file"), (req, res) => {
  const inputPath = req.file.path;

  const outputPath = "output/compressed.pdf";

  const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;

  exec(command, (err) => {
    if (err) {
      console.log(err);
      return res.send("Error in compression");
    }

    res.download(outputPath);
  });
});

app.listen(3000, () => {
  console.log("Server started");
});