"use strict";



// import util from "util";
// const util = require("util");

//  I M P O R T S

import m from "mithril";
const { Lbry } = require("lbry-redux");
// import { Lbry } from "lbry-redux";

//  U T I L S

import Trending from "~model/trending";
import Wrapper from "~component/wrapper";
import sdkStatus from "~model/sdk-init";

// console.log(sdkStatus);



//  E X P O R T

export default {
  onmatch: () => {
    sdkStatus();
    Trending.loadList();
    // console.log("Hello, welcome"); // eslint-disable-line no-console
  },
  render: () => {
    const { list } = Trending;
    const channelNames = Object.keys(list);

    return m(Wrapper, { mainClass: "inner-wrap flex-row" }, [
      (
        <channels>
          {
            channelNames.length ?
              channelNames.map(channelName => renderChannelLink(channelName, list)) :
              m("div", { style: "color: white; text-align: center;" }, "Waiting for content query to finish...")
          }
        </channels>
      )
    ]);
  }
};



//  H E L P E R

// Promise.prototype.isPending = function() {
//   return util.inspect(this).indexOf("<pending>") > -1;
// };

// daemon.lbry.tech
// b5125d5be5ef2b8f3a2fba18a349c8375a85e613
// https://daemon.lbry.tech/resolve
// body.authorization = b5125d5be5ef2b8f3a2fba18a349c8375a85e613;
// body.method = resolve;

// claim.value.stream.metadata
// author / thumbnail / title

// claim.value.stream.source
// contentType (video/mp4)

function renderChannelLink(data, fullData) {
  const channelName = data.split("|")[1].trim();
  const channelNameHash = channelName.split("#")[1];
  const channelNameSolo = channelName.split("#")[0];
  const formattedChannelName = `<span class="name">${channelNameSolo.replace("@", "")}</span><span class="hash">#${channelNameHash}</span>`;

  // console.log(fullData[data]);
  // console.log("————————————");

  // resolve(fullData[data]);



  // check out streaming branch
  // const test = resolve(fullData[data]);

  // console.log("————————————");
  // console.log(process.binding("util").getPromiseDetails(test));
  // console.log("————————————");

  // return test.then(result => {
  //   console.log(result);

  //   return (
  //     <channel data-channel-name={channelName}>
  //       {m.trust(formattedChannelName)}
  //     </channel>
  //   );
  // });

  // return (
  //   <div>
  //     {
  //       test ?
  //         <channel data-channel-name={channelName}>
  //           {m.trust(formattedChannelName)}
  //         </channel> :
  //         m("div", { style: "color: white; text-align: center;" }, "Waiting for OTHER query to finish...")
  //     }
  //   </div>
  // );



  // const oop = [];

  // for (const test of fullData[data])
  //   oop.push(resolveII(test));

  // return (
  //   <div>
  //     {
  //       Promise.all(oop).then(values => {
  //         console.log(values);

  //         return (
  //           <channel data-channel-name={channelName}>
  //             {m.trust(formattedChannelName)}
  //           </channel>
  //         );
  //       })
  //     }
  //   </div>
  // );

  return (
    <channel data-channel-name={channelName}>
      {m.trust(formattedChannelName)}
    </channel>
  );
}

// https://api.lbry.tv/content/claims/house/a05f51fe630f51e2568c329222ffb5e0bea5fb2d/stream
// /claims/{claim_name}/{claim_id}/stream
// You can use that as a `src` tag on `<audio>` or `<video>` elements

function resolveII(suppliedUrl) {
  return m.request({
    background: true, // commenting this out is not a good idea...
    data: {
      authorization: "b5125d5be5ef2b8f3a2fba18a349c8375a85e613",
      method: "resolve",
      uri: suppliedUrl
    },
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    // url: "https://daemon.lbry.tech/resolve",
    url: "http://localhost:5200/resolve"
    // useBody: true
  }).then(result => {
    result = result.result[suppliedUrl];
    return result;
  });
}

function resolve(url) {
  return Lbry.resolve({ urls: url }) // This can be a list of urls
    .then(response => {
      const test = Object.keys(response);
      const cool = [];

      // console.log(Object.keys(response));

      for (const uh of test) {
        const thing = response[uh];
        const { metadata } = thing.claim.value.stream;
        // console.log(thing);

        cool.push(`
          <figure>
            <img alt=${metadata.title} src=${metadata.thumbnail}/>
            <figcaption>${metadata.title} by ${metadata.author}</figcaption>
          </figure>
        `);
      }

      // console.log("————————————");
      // console.log(cool);
      return cool;

      // claimData.innerText = JSON.stringify(res[url].claim, null, 2);
    })
    .catch(error => {
      console.error(error);
      // claimData.innerText = JSON.stringify(error, null, 2);
    });
}
