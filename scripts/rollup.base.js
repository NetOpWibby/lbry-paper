"use strict";



//  N A T I V E

import fs from "fs";

//  I M P O R T S

import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
// import cwd from "cwd";
import { eslint } from "rollup-plugin-eslint";
import pathmodify from "rollup-plugin-pathmodify";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";

//  U T I L S

import indexGenerator from "./generate-index";
export const pkg = JSON.parse(fs.readFileSync("./package.json"));

if (!pkg)
  throw("Could not read package.json");

const isProduction = process.env.NODE_ENV !== "development";

// const apiUrl = isProduction ?
//   "https://api.socii.network" :
//   "http://localhost:2413";
const { env } = process;
const environment = process.env.NODE_ENV || "development";
const external = Object.keys(pkg.dependencies || {});
const globals = {};
// const hubUrl = isProduction ?
//   "https://hub.socii.network" :
//   "http://localhost:1881";
// const icons = fs.readFileSync(cwd() + "/dist/media/svg/icons.svg", "utf8")
//   .replace("position:absolute", "position: absolute;");
const input = env.INPUT || "index.js";
const name = env.NAME || pkg.name;

external.forEach(ext => {
  switch(ext) {
    case "mithril":
      globals["mithril"] = "m";
      break;

    default:
      globals[ext] = ext;
      break;
  }
});

indexGenerator({
  input: "app/index.html",
  output: "dist/index.html",
  template: {
    appColor: "#111",
    // appIcons: icons,
    appLocale: "en_US",
    appName: "LBRY",
    appTagline: "The future of content on the Internet",
    ogImageHeight: "1024",
    ogImageWidth: "768"
  }
});

export const createConfig = ({ includeDepencies }) => ({
  external: includeDepencies ? [] : external,
  input,
  output: {
    name,
    globals
  },
  plugins: [
    // Resolve libs in node_modules
    resolve({
      browser: true,
      main: true
    }),

    pathmodify({
      aliases: [
        {
          id: "mithril/stream",
          resolveTo: "node_modules/mithril/stream.js"
        }
      ]
    }),

    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs({
      include: "node_modules/**"
    }),

    eslint({
      cache: true
    }),

    babel({
      exclude: "node_modules/**"
    }),

    replace({
      exclude: "node_modules/**",
      // API: JSON.stringify(apiUrl),
      ENV: JSON.stringify(environment),
      // HUB: JSON.stringify(hubUrl),
      PRODUCTION: JSON.stringify(isProduction)
    })
  ]
});

