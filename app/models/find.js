"use strict";



//  I M P O R T

import m from "mithril";

//  P A C K A G E

const { Lbry } = require("lbry-redux");



//  E X P O R T

export default suppliedData => {
  return new Promise(resolve => {
    const query = {};
    let method = "resolve";

    if (suppliedData.channel) {
      const id = suppliedData.channel.split("#")[1];

      query.channel_id = id;
      query.page = 1;
      query.page_size = 20;

      method = "claim_search";
    } else {
      query.urls = suppliedData;
    }

    Lbry[method](query)
      .then(result => resolve(result))
      .catch(() => resolve());
  });
};
