"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L S

import Trending from "~model/trending";
import Wrapper from "~component/wrapper";



//  E X P O R T

export default {
  onmatch: () => {
    Trending.loadList();
    console.log("Hello, welcome"); // eslint-disable-line no-console
  },
  render: () => {
    const { list } = Trending;
    const channelNames = Object.keys(list);

    return m(Wrapper, { mainClass: "inner-wrap flex-row" }, [
      (
        <channels>
          {
            channelNames.length ?
              channelNames.map(channelName => renderChannelLink(channelName)) :
              m("div", { style: "text-align: center;" }, "Waiting for content query to finish...")
          }
        </channels>
      )
    ]);
  }
};



//  H E L P E R

function renderChannelLink(data) {
  const channelName = data.split("|")[1].trim();
  const channelNameHash = channelName.split("#")[1];
  const channelNameSolo = channelName.split("#")[0];
  const formattedChannelName = `<span class="name">${channelNameSolo.replace("@", "")}</span><span class="hash">#${channelNameHash}</span>`;

  return (
    <channel data-channel-name={channelName}>
      {m.trust(formattedChannelName)}
    </channel>
  );
}
