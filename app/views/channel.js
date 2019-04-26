"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L S

import Resolve from "~model/resolve";
import Wrapper from "~component/wrapper";



//  E X P O R T

export default {
  onmatch: args => Resolve.query({ channel: args.channelName }),
  render: () => {
    // const creatorData = Resolve.result;

    // https://tympanus.net/Development/GridLoadingAnimations
    // Amun / Hapi / Seker

    /*
      address
      amount
      channel_name
      claim_id
      effective_amount
      name
      normalized_name
      permanent_url
      txid

      value.stream.author
      value.stream.description
      value.stream.license
      value.stream.media_type
      value.stream.thumbnail_url
      value.stream.title
    */

    const { result } = Resolve;

    return m(Wrapper, [
      (
        <content-list>
          {
            result.items.length ?
              result.items.map(item => renderContent(item)) :
              m("div", { style: "color: white; text-align: center;" }, "Waiting for content query to finish...")
          }
        </content-list>
      )
    ]);
  }
};



//  H E L P E R

function renderContent(suppliedData) {
  const { value } = suppliedData;

  if (!value)
    return;

  // console.log(suppliedData.name);
  // console.log(suppliedData.claim_id);
  // console.log("");

  return (
    <content-item>
      <a
        href={"/content/" + encodeURIComponent(suppliedData.name) + "/" + encodeURIComponent(suppliedData.claim_id)}
        oncreate={m.route.link}
        title={"View '" + value.title + "' by " + value.author}
      >
        <figure>
          <img
            alt={"'" + value.title + "' by " + value.author}
            src={value.thumbnail.url}
          />
          <figcaption>
            {value.title}
          </figcaption>
        </figure>
      </a>
    </content-item>
  );
}
