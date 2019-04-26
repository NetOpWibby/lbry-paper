"use strict";



//  I M P O R T

import m from "mithril";

//  U T I L S

// import Resolve from "~model/resolve";
import Wrapper from "~component/wrapper";



//  E X P O R T

export default {
  // onmatch: args => Resolve.query(args.contendId),
  render: vnode => {
    const { claimId, claimName } = vnode.attrs;

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

    // const { result } = Resolve;

    // console.info(result);

    // return (
    //   <content-item>
    //     <a
    //       href={"/content/" + encodeURIComponent(suppliedData.name) + "/" + encodeURIComponent(suppliedData.claim_id)}
    //       oncreate={m.route.link}
    //       title={"View '" + stream.title + "' by " + stream.author}
    //     >
    //       <figure>
    //         <img
    //           alt={"'" + stream.title + "' by " + stream.author}
    //           src={stream.thumbnail_url}
    //         />
    //         <figcaption>
    //           {stream.title}
    //         </figcaption>
    //       </figure>
    //     </a>
    //   </content-item>
    // );

    // https://api.lbry.tv/content/claims/house/a05f51fe630f51e2568c329222ffb5e0bea5fb2d/stream
    // /claims/{claim_name}/{claim_id}/stream
    // You can use that as a `src` tag on `<audio>` or `<video>` elements

    return m(Wrapper, [
      (
        <content>
          <video src={`https://api.lbry.tv/content/claims/${claimName}/${claimId}/stream`}/>
        </content>
      )
    ]);
  }
};
