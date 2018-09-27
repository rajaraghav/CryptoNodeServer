import { getAddress, init, updateBalance } from "./wallet";
import syncRunner from "./sync-runner";

module.exports.init = init;
module.exports.getAddress = getAddress;
module.exports.updateBalance = updateBalance;
module.exports.syncRunner = syncRunner;
