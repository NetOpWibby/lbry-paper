"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L S

// import FindStuff from "~model/find";
// import Resolve from "~model/resolve";
import Trending from "~model/trending";
import Wrapper from "~component/wrapper";
import sdkStatus from "~model/sdk-init";



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

    return m(Wrapper, { mainClass: "inner-wrap" }, [
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

function renderChannelLink(data) { // , fullData
  // const channelContent = fullData[data];
  const channelName = data.split("|")[1].trim();
  const channelNameHash = channelName.split("#")[1];
  const channelNameSolo = channelName.split("#")[0];
  const formattedChannelName = `<span class="name">${channelNameSolo.replace("@", "")}</span><span class="hash">#${channelNameHash}</span>`;

  // console.log(data);
  // console.log(channelContent);
  // console.log("————————————");

  return (
    <channel>
      <a
        href={"/channel/" + encodeURIComponent(channelName)}
        oncreate={m.route.link}
        title={"Visit " + channelNameSolo + "'s channel"}
      >
        {m.trust(formattedChannelName)}
      </a>
    </channel>
  );

  // {
  //   Object.keys(channelContent).map(key => {
  //     const test = channelContent[key];
  //     return FindStuff(test).then(result => renderChannelThumbnails(result)); // eslint-disable-line padding-line-between-statements
  //   })
  // }
}

// function renderChannelThumbnails(suppliedData) {
//   const { claim } = suppliedData;
//   const { value } = claim;

//   if (!claim || !value)
//     return;

//   return (
//     <content-item>
//       <a
//         href={"/content/" + encodeURIComponent(claim.name) + "/" + encodeURIComponent(claim.claim_id)}
//         oncreate={m.route.link}
//         title={"View '" + value.title + "' by " + value.author}
//       >
//         <figure>
//           <img
//             alt={"'" + value.title + "' by " + value.author}
//             src={value.thumbnail.url}
//           />
//           <figcaption>
//             {value.title}
//           </figcaption>
//         </figure>
//       </a>
//     </content-item>
//   );
// }
