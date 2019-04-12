"use strict";



//  U T I L S

import Channel from "./channel";
import Home from "./home";
import Nope from "./nope";



//  E X P O R T S

export default {
  "/": Home,
  "/channel/:channelName": Channel,
  "/:404...": Nope
};
