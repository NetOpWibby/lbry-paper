"use strict";



//  I M P O R T

import m from "mithril";



//  P R O G R A M

const Trending = {
  list: [],
  loadList: () => {
    return m.request({
      method: "GET",
      url: "https://api.lbry.com/file/list_homepage"
    }).then(result => {
      const data = result.data.Uris;
      const keys = Object.keys(data);
      const updatedList = {};

      for (const key of keys) {
        if (key.includes("|"))
          updatedList[key] = data[key];
      }

      Trending.list = updatedList;
    });
  }
};



//  E X P O R T

export default Trending;
