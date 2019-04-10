"use strict";



//  N A T I V E

import { readFile, writeFileSync } from "fs";
import path from "path";

//  I M P O R T

import cwd from "cwd";



//  E X P O R T

export default options => {
  let { input, output, template } = options;

  input = path.join(cwd(), input);
  output = path.join(cwd(), output);

  return new Promise((resolve, reject) =>
    readFile(input, (error, buffer) => {
      if (error)
        return reject(error);

      let html = buffer.toString("utf8");

      if (template) {
        Object.keys(template).forEach(key => {
          const regex = new RegExp(`<%= +${key} +%>`, "g");

          html = html.replace(regex, template[key]);
        });
      }

      try {
        resolve(writeFileSync(output, html, "utf8"));
      } catch(writeError) {
        throw(writeError); // App cannot run without this so exit forcefully
      }
    })
  );
};
