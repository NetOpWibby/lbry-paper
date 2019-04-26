"use strict";



//  I M P O R T

import m from "mithril";

//  P A C K A G E

const { Lbry } = require("lbry-redux");



//  P R O G R A M

const Resolve = {
  query: suppliedData => {
    const lbryQuery = {};
    let method = "resolve";

    if (suppliedData.channel) {
      const id = suppliedData.channel.split("#")[1];

      lbryQuery.channel_id = id;
      lbryQuery.page = 1;
      lbryQuery.page_size = 20;

      method = "claim_search";
    } else {
      lbryQuery.urls = suppliedData.urls;
    }

    // const id = suppliedData.split("#")[1];

    // curl -d'{"method": "claim_search", "params": {"channel_id": "feb61536c007cdf4faeeaab4876cb397feaf6b51", "page": 1, "page_size": 20}}' http://localhost:5279

    return Lbry[method](lbryQuery)
      .then(result => {
        // console.info(result);

        /*
          result
          result.items
          result.page
          result.page_size
          result.total_pages
        */

        Resolve.result = result;
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        return;
      });
  },
  result: []
};



//  E X P O R T

export default Resolve;
