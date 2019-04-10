"use strict";



//  N A T I V E

const path = require("path");
const url = require("url");

//  I M P O R T

const { BrowserWindow } = require("electron");

//  U T I L

let mainWindow;



//  P R O G R A M

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    width: 1200
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}



//  E X P O R T

module.exports = exports = createWindow;
