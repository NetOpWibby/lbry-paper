"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L S

import Footer from "./footer";
import Navigation from "./navigation";



//  E X P O R T

export default {
  view: vnode => {
    return ([
      m(Navigation()),
      m("main", { class: vnode.attrs.mainClass }, vnode.children),
      m(Footer)
    ]);
  }
};
