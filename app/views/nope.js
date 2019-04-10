"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L

import Wrapper from "~component/wrapper";



//  E X P O R T

export default {
  view: () => m(Wrapper,
    <section class="ancillary inner-wrap">
      <img alt="WTF bro" src="/images/what.png"/>
      <p><a href="/">Go home, Roger</a></p>
    </section>
  )
};
