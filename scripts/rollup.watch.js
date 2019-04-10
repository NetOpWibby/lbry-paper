"use strict";



//  I M P O R T S

import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

//  U T I L S

import umdConfig from "./rollup.umd.js";

const { env } = process;
const serverPort = parseInt(env.PORT, 10);
const targetConfig = Object.assign({}, umdConfig);
const watchDir = env.WATCH_DIR;



//  P R O G R A M

if (!watchDir)
  throw("Missing WATCH_DIR: no watch directory");

if (!serverPort)
  throw("Missing PORT: no http server port");

targetConfig.plugins.push(
  livereload({
    port: 35729 + serverPort, // default LiveReload port + app port, so multiple instances of LR can run simultaneously
    watch: watchDir
  }),
  serve({
    contentBase: watchDir,
    historyApiFallback: true, // allows Mithril 404 to work!
    port: serverPort
  })
);



//  E X P O R T

export default targetConfig;



// Builds a UMD bundle that is updated with each file change
