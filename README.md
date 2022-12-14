SNAP Connection with NEAR RPC API
=================================

## Description

This Snap interacts with NEAR Protocol over `archival-rpc.testnet.near.org` NEAR RPC API. As a first draft, it has limited number of view-functionalities, namely:
- get current gas price of the NEAR Protocol
- get NEAR account information
- call view method of a NEAR contract


## To run the SNAP

Clone the repo
`git clone https://github.com/rmuftiev/snap-near-rpc-api.git`

Go to folder
`cd snap-near-rpc`

Get exectutions rigths to delete some of unnecessary Snaps  dependencies
`chmod +x ./scripts/cleanup.sh`

Delete some of unnecessary Snaps  dependencies
`./scripts/cleanup.sh`

Install dependencies
`yarn install`

Build project
`yarn build`

Run the localhost
`yarn run serve`



## Next Steps

This Snap is about to be extended with the above-listed functionalities.

Within [NEAR RPC API](https://docs.near.org/api/rpc/introduction)
- Implement Send Transaction Functionality
- Request a Full Access Key
- Store the Full Access Key


Within [NEAR API JS](https://docs.near.org/tools/near-api-js/quick-reference)
- Integrate full functionality over `near-api-js` (currently blocked)