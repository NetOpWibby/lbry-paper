"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L S

import routes from "./views";
const mountNode = document.querySelector("app");



//  P R O G R A M

m.route.prefix("#"); // hash is needed for desktop apps, not for web
m.route(mountNode, "/", routes);
