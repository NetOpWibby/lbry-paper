"use strict";



//  I M P O R T

import m from "mithril";



//  E X P O R T

export default () => {
  return {
    view: () => {
      // const currentUrl = window.location.pathname;

      return ([
        <header-navigation>
          <div class="flex-center">
            <header-navigation-section class="logo">
              <header-navigation-title>
                <a href="/" oncreate={m.route.link} title="LBRY homepage">LBRY</a>
              </header-navigation-title>
            </header-navigation-section>
          </div>
        </header-navigation>
      ]);
    }
  };
};
