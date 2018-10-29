import wsMethods from "./ws-methods";
import { XError } from "./errors";

export const WS_METHOD_LIST = wsMethods.map(m => m.name);

export const checkMethod = (action, payload, role, options) => {
  const method = wsMethods.filter(m => m.name === action)[0];

  if (!method) throw new XError(404, `No method: ${action}`);

  if (method.role !== role)
    throw new XError(403, `Wrong role: needs ${method.role}, got ${role}`);
  console.log("inside check payload", payload);
  if (!payload) payload = {};

  if (role === "user") {
    const { authToken } = options;

    if (!authToken) {
      throw new XError(401, `You need to provide uid in user-scope method`);
    }

    const { authToken: _authToken, ...others } = payload;

    if (_authToken) {
      console.warn(
        `USER DATA contained uid=${payload.authToken}, while his uid=${authToken}`
      );
    }

    payload = { authToken, ...others };
}
    if (method.tokens.includes("business_id") && options.opid) {
        payload = { ...payload, business_id: options.opid };
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
    