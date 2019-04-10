"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L

const currentYear = new Date().getFullYear();



//  E X P O R T

export default {
  view: () => {
    return ([
      <footer class="footer">
        <div class="flex-center">
          Copyright © 2016-{currentYear} <a href="/" oncreate={m.route.link} title="LBRY, The future of content on the Internet">LBRY</a>.
        </div>
      </footer>
      // <script src="/app.js"/>
    ]);
  }
};
