"use strict";



//  I M P O R T

import { uglify } from "rollup-plugin-uglify";

//  U T I L S

import { createConfig, pkg } from "./rollup.base.js";

const { env } = process;
const createSourceMap = env.SOURCEMAP !== undefined ?
  !!parseInt(env.SOURCEMAP, 10) :
  true;

// Use `false` if you are creating a library, or if you are including external script in html
const includeDepencies = !!parseInt(env.DEPS, 10) || false;
const baseConfig = createConfig({ includeDepencies });

const targetConfig = Object.assign({}, baseConfig, {
  output: Object.assign(
    {},
    baseConfig.output, {
      file: `${env.DEST || pkg.main}.js`,
      format: "umd",
      sourcemap: createSourceMap
    }
  )
});

targetConfig.plugins.push(uglify());



//  E X P O R T

export default targetConfig;



// Build to an Universal Module Definition
