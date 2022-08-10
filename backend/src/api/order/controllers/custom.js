// path: ./src/api/restaurant/controllers/restaurant.js

const { createCoreController } = require("@strapi/strapi").factories;
const https = require("https");
const PaytmChecksum = require("paytmchecksum");

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async pre(ctx) {
    /*
     * import checksum generation utility
     * You can get this utility from https://developer.paytm.com/docs/checksum/
     */

    var paytmParams = {};
    let params = JSON.parse(ctx.request.body);
    params.orderid = params.orderid;
    // console.log(params);
    const entry = await strapi.entityService.create("api::order.order", {
      data: {
        email: params.email,
        orderid: params.orderid,
        paymentInfo: null,
        products: params.cart,
        address: params.address,
        name: params.name,
        transactionid: null,
        amount: params.amount,
        status: "pending",
      },
    });

    paytmParams.body = {
      requestType: "Payment",
      OBJID: entry.id,
      mid: "PBbIDP44776673527126",
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: params.orderid,
      callbackUrl: "http://localhost:1337/api/orders/posttransaction",
      txnAmount: {
        value: params.amount,
        currency: "INR",
      },
      userInfo: {
        custId: "CUST_001",
      },
    };

    // console.log(paytmParams.body);

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    let checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      "2i4ccuCb#3EWMcpu"
    );
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    // console.log("post_data", post_data);

    const gettoken = async () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          hostname: "securegw-stage.paytm.in",
          /* for Production */
          // hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=PBbIDP44776673527126&orderId=${params.orderid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            resolve(response);
          });
        });

        post_req.write(post_data);

        post_req.end();
      });
    };

    const res = await gettoken();

    ctx.send(JSON.parse(res));
  },

  async post(ctx) {
    /*
     * import checksum generation utility
     * You can get this utility from https://developer.paytm.com/docs/checksum/
     */

    let params = ctx.request.body;
    const entries = await strapi.entityService.findMany("api::order.order", {
      fields: ["id"],
      filters: { orderid: params.ORDERID },
    });
    let id = entries[0].id;
    await strapi.entityService.update("api::order.order", id, {
      data: {
        transactionid: params.TXNID,
        paymentInfo: params,
        status: params.STATUS,
      },
    });
    ctx.redirect("http://localhost:3000/success");
  },
}));
