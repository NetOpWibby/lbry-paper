"use strict";



const { Lbry } = require("lbry-redux");
// let sdkStatus = false;

Lbry.connect().then(checkSDKStarted);

// Wait until the sdk is fully started before doing anything else
export default function checkSDKStarted() {
  Lbry.status().then(status => {
    if (status.is_running) {
      // SDK is now running
      // const resolveWrapper = document.getElementById("resolve");
      // const loadingWrapper = document.getElementById("loading");
      // loadingWrapper.style.display = "none";
      // resolveWrapper.style.display = "block";
      console.info("SDK has loaded"); // eslint-disable-line no-console
      // sdkStatus = true;
      // console.log(sdkStatus);
      return;
    }

    setTimeout(() => {
      checkSDKStarted();
    }, 500);
  });
}

// export default sdkStatus;
