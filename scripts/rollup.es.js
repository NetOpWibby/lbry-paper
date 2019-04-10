"use strict";



//  U T I L S

import { pkg, createConfig } from "./rollup.base.js";

const { env } = process;

// Use `false` if you are creating a library, or if you are including external script in html
const includeDepencies = !!parseInt(env.DEPS, 10) || false;
const baseConfig = createConfig({ includeDepencies });

const targetConfig = Object.assign({}, baseConfig, {
  output: Object.assign(
    {},
    baseConfig.output, {
      file: `${env.DEST || pkg.main}.mjs`,
      format: "es"
    }
  )
});



//  E X P O R T

export default targetConfig;



// Build to a module that has ES2015 module syntax but otherwise only syntax features that node supports
// https://github.com/rollup/rollup/wiki/jsnext:main
