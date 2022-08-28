async function getNearGas() {
  let networkUrl = "https://archival-rpc.testnet.near.org"; // NEAR RPC endpoint
  let response = await fetch(networkUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "gas_price",
      "params": [null]
    })
  });
  return response.text();
}

function getTime() {
  var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes();
  return datetime;
}


module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {

    // GET GAS FUNCTION
    case 'gas':
      const metadata = JSON.parse(await getNearGas());
      const fees = metadata.result.gas_price;
      const timestamp = getTime();
      const msg = 'NEAR Gas at ' + timestamp.toString() + ' amounts to ' + fees.toString() + ' YoctoNEAR.'; 
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `NEAR Gas`,
            description:
              'This method fetchs current NEAR Gas value.',
            textAreaContent:
              msg,
          },
        ],
      });

    default:
      throw new Error('Method not found.');
  }
};
