import coinsList from "./methods";
import { WalletError } from "./wallet-error";
import WAValidator from "wallet-address-validator";
export const list = coinsList.map(m => m.name);

export const checkMethod = payload => {
  const { withdrawalAddress, xid, amount, coinSymbol } = payload;
  const coin = list.filter(m => m.symbol === coinSymbol)[0];

  if (!coin) throw new WalletError(404, `No Coin: ${coinSymbol}`);

  const valid = WAValidator.validate(withdrawalAddress, coinSymbol);

  if (!valid) throw new WalletError(404, `No Coin: ${coinSymbol}`);

  return {
    params: {
      symbol: coinSymbol,
      amount: amount,
      xid: xid,
      withdrawalAddress: withdrawalAddress
    },
    type: coin.type
  };
};
