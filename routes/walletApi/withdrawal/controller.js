import { makeRequest, WalletError } from "../../../services/xServices/Xchange";

const fetchAuthUID = user => {
  console.log(user);
  if (!user) {
    throw new WalletError(403, `Not logged in`);
  }

  const uid = user.xid;

  if (!uid) {
    throw new WalletError(404, `No xid at user ${user.id}`);
  }

  return uid;
};

export const withdrawal = async (req, res, next) => {
  // eslint-disable-next-line camelcase
console.log("req",req.headers)

  // console.log(user);
  // try {
  //   const uid = fetchAuthUID(user, role);
  //   const opts = uid ? { uid } : {};

  //   const reply = await makeRequest(method, payload, role, opts);

  //   res.json(reply);
  // } catch ({ status, code, name, message }) {
  //   const reply = { error: true, result: { code, name, message } };

  //   res.status(status || 500).json(reply);
  // }
};
