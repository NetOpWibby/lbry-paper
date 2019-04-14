"use strict";



//  U T I L S

import Channel from "./channel";
import Content from "./content";
import Home from "./home";
import Nope from "./nope";



//  E X P O R T S

export default {
  "/": Home,
  "/channel/:channelName": Channel,
  "/content/:claimName/:claimId": Content,
  "/:404...": Nope
};
