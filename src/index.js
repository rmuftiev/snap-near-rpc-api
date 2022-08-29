let networkUrl = "https://archival-rpc.testnet.near.org"; // NEAR RPC endpoint

async function getNearGas() {
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

async function viewAccount(accountId) {
  let response = await fetch(networkUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "query",
      "params": {
        "request_type": "view_account",
        "finality": "final",
        "account_id": accountId
      }
    })
  });
  return response.text();
}


async function callNearFunc(accountId, functionName, args64) {
  let response = await fetch(networkUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "query",
      "params": {
        "request_type": "call_function",
        "finality": "final",
        "account_id": accountId,
        "method_name": functionName,
        "args_base64": args64
      }
    })
  });
  return response.text();
}


module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {

    // GET GAS FUNCTION
    case 'gas':
      let gasData = JSON.parse(await getNearGas());
      let fees = gasData.result.gas_price;
      let msg = 'NEAR Gas amounts to ' + fees.toString() + ' YoctoNEAR.';
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'inApp',
            message: msg,
          },
        ],
      });     

    // VIEW ACCOUNT INFO FUNCTION
    case 'view':
      let accountData = JSON.parse(await viewAccount(request.accountId));
      let amount = accountData.result.amount.toString();
      let data = "Amount: " + amount + "\n";
      let block_hash = accountData.result.block_hash;
      data += "Block Hash: " + block_hash + "\n";
      let block_height = accountData.result.block_height;
      data += "Block Height: " + block_height;
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `NEAR Account Information`,
            description:
              'This method fetchs NEAR Account Information',
            textAreaContent:
              data,
          },
        ],
      });     



    // CALL FUNCTION
    case 'funcall':
      let funcResponse = JSON.parse(await callNearFunc(request.accountId, request.functionName, request.args64));
      let res = String.fromCharCode(funcResponse.result.result);
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `NEAR Call Function`,
            description:
              'This method calls NEAR public function',
            textAreaContent:
              "Result of " + request.functionName + " for account " + request.functionName + " is " + res,
          },
        ],
      });          



    default:
      throw new Error('Method not found.');
  }
};
