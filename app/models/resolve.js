"use strict";



//  I M P O R T

import m from "mithril";



//  P R O G R A M

const Resolve = {
  query: suppliedData => {
    return m.request({
      data: {
        authorization: "b5125d5be5ef2b8f3a2fba18a349c8375a85e613",
        method: "resolve",
        uri: suppliedData
      },
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      // url: "https://daemon.lbry.tech/resolve",
      url: "http://localhost:5200/resolve"
      // useBody: true
    }).then(result => {
      result = result.result[suppliedData];
      Resolve.result = result;
    })
      .catch(error => {
        console.error(error);
        return null;
      });
  },
  result: []
};



//  E X P O R T

export default Resolve;
