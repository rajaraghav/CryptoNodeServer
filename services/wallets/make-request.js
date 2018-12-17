import request from "superagent";
import { checkMethod } from "./check-method";

const EXCHANGE_API = `http://localhost:7000/`;
const BASE_PARAMS = {
  jsonrpc: "2.0"
};

export const runMethod = async _payload => {
  console.log("Inside Wallet-API-Method", _payload);
  const { params, type } = checkMethod(_payload);

  const payload = {
    ...params,
    ...BASE_PARAMS
  };

  const newURL = `${EXCHANGE_API}${type}${_payload.symbol}`;

  return request
    .post(newURL)
    .send(payload)
    .then(json => JSON.parse(json.text));
};
