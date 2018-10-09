import methods from "./methods";
import { XError } from "./errors";

export const METHOD_LIST = methods.map(m => m.name);

export const checkMethod = (action, payload, role, options) => {
  const method = methods.filter(m => m.name === action)[0];

  if (!method) throw new XError(404, `No method: ${action}`);

  if (method.role !== role)
    throw new XError(403, `Wrong role: needs ${method.role}, got ${role}`);
  console.log("inside check payload", payload);
  if (!payload) payload = {};

  if (role === "user") {
    const { uid } = options;

    if (!uid) {
      throw new XError(401, `You need to provide uid in user-scope method`);
    }

    const { uid: _uid, ...others } = payload;

    if (_uid) {
      console.warn(
        `USER DATA contained uid=${payload.uid}, while his uid=${uid}`
      );
    }

    payload = { uid, ...others };
  }

  if (method.tokens.includes("business_id") && options.opid) {
    payload = { ...payload, business_id: options.opid };
  }

  if (typeof method.predefined === "object") {
    payload = { ...payload, ...method.predefined };
  }

  const keys = Object.keys(payload);

  console.log("inside check keys", keys);

  return method.tokens.map((token, index) => {
    console.log("In Map");

    if (token !== keys[index]) {
      throw new XError(401, `Wrong keys: [${keys}] / [${method.tokens}]`);
    }

    if (method.handle !== undefined) {
      const handle = method.handle[token];

      const value = payload[token];

      console.log("inside check handle", handle, value);
      const newValue = handle ? handle(value) : value;
      console.log("inside check newValue", newValue);
      if (newValue === false || newValue === undefined) {
        throw new XError(
          401,
          `Wrong value at key [${token}] from value [${value}]`
        );
      } else {
        return newValue;
      }
    } else {
      console.log("Returning", payload[token]);
      return payload[token];
    }
  });
};
