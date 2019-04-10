"use strict";



//  N A T I V E

const path = require("path");

//  U T I L S

const { execSync, spawn } = require("child_process");



//  P R O G R A M

class SDK {
  constructor() {
    this.path = process.env.LBRY_DAEMON || path.join(__dirname, "../../dist/sdk/lbrynet");
    this.handlers = [];
    this.subprocess = undefined;
  }

  launch() {
    this.subprocess = spawn(this.path, ["start"]);
    this.subprocess.stdout.on("data", data => console.log(`SDK: ${data}`)); // eslint-disable-line no-console
    this.subprocess.stderr.on("data", data => console.error(`SDK: ${data}`)); // eslint-disable-line no-console
    this.subprocess.on("exit", () => this.fire("exit"));
    this.subprocess.on("error", error => console.error(`SDK error: ${error}`)); // eslint-disable-line no-console
  }

  quit() {
    if (process.platform === "win32") {
      try {
        execSync(`taskkill /pid ${this.subprocess.pid} /t /f`);
      } catch (error) {
        console.error(error.message); // eslint-disable-line no-console
      }
    } else {
      this.subprocess.kill();
    }
  }

  // Follows the publish/subscribe pattern

  // Subscribe method
  on(event, handler, context = handler) {
    this.handlers.push({ event, handler: handler.bind(context) });
  }

  // Publish method
  fire(event, args) {
    this.handlers.forEach(topic => {
      if (topic.event === event)
        topic.handler(args);
    });
  }
}



//  E X P O R T

module.exports = exports = SDK;
