const express = require("express");
const moment = require("moment");
const fs = require("fs");
const PORT = process.env.PORT || 5000;
const currentFolder = __dirname;
const app = express();
app.use(express.json());

// File Write operation
app.post("/write-file", (req, res) => {
  const date = moment().format("MMM Do YY");
  const dateArr = date.split(" ");
  const time = moment().format("LTS");
  const timeArr = time.split(/(?::| )+/);
  const currentDate = String(new Date());

  fs.writeFileSync(
    `${currentFolder}/TextFiles/${dateArr[0]}${dateArr[1]}${dateArr[2]}-${timeArr[0]}.${timeArr[1]}.${timeArr[2]}.${timeArr[3]}.txt`,
    currentDate
  );
  res.json({
    message: "File write successful",
  });
});

//Read operation
app.get("/get-all-text-files", (req, res) => {
  let listOfFiles = [];
  fs.readdirSync(`${currentFolder}/TextFiles`).forEach((file) => {
    listOfFiles.push(file);
  });
  if (listOfFiles.length === 0) {
    res.send("No files found");
  } else {
    res.send(listOfFiles);
  }
});

//Server

app.get("/", (req, res) => {
  res.send("File operations using node js");
});
app.listen(PORT, () => {
  console.log("server is up and running");
});