"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L

import Resolve from "~model/resolve";
import Wrapper from "~component/wrapper";



//  E X P O R T

export default {
  onmatch: args => Resolve.query(args.channelName),
  render: () => {
    const creatorData = Resolve.result;

    // console.log(creatorData);
    console.log("Name:", creatorData.certificate.name);
    console.log("TXID:", creatorData.certificate.txid);
    console.log("Claims:", creatorData.claims_in_channel);
    console.log("——————————");

    return m(Wrapper,
      <section class="ancillary inner-wrap">
        <p><a href="/">Go home, Roger</a></p>
      </section>
    );
  }

  // Lbry.resolve({ urls: url }) // This can be a list of urls
  //   .then(res => {
  //     claimData.innerText = JSON.stringify(res[url].claim, null, 2);
  //   })
  //   .catch(error => {
  //     claimData.innerText = JSON.stringify(error, null, 2);
  // });

  // curl -d'{"method": "channel_list", "params": { account: "bFiP69zpGKXgKVyguvTEfYT1JVKPi85WUp"}}' http://localhost:5279

  // view: () => m(Wrapper,
  //   <section class="ancillary inner-wrap">
  //     <img alt="WTF bro" src="/images/what.png"/>
  //     <p><a href="/">Go home, Roger</a></p>
  //   </section>
  // )
};
