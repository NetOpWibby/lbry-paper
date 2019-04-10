"use strict";



//  U T I L S

import Home from "./home";
import Nope from "./nope";



//  E X P O R T S

export default {
  "/": Home,
  "/:404...": Nope
};
