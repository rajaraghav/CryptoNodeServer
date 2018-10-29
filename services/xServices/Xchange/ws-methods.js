const check = {
  Number: a => (Number.isNaN(Number(a)) ? false : Number(a))
};

export default [
  //System API
  {
    name: "server.ping",
    role: "server",
    tokens: []
  },
  {
    name: "server.time",
    role: "server",
    tokens: []
  },
  {
    name: "server.auth",
    role: "server",
    tokens: ["token", "source"]
  },
  {
    name: "server.sign",
    role: "server",
    tokens: ["access_id", "authorization", "tonce"]
  },

  //MarketAPI & PriceAPI public methods.
  {
    name: "kline.query",
    role: "public",
    tokens: ["market", "start", "end", "interval"],
    handle: {
      start: check.Number,
      end: check.Number
    }
  },
  {
    name: "kline.subscribe",
    role: "public",
    tokens: ["market", "interval"],
    handle: {
      interval: check.Number
    }
  },
  {
    name: "kline.update",
    role: "public",
    tokens: ["result"]
  },
  {
    name: "kline.unsubscribe",
    role: "public",
    tokens: []
  },
  {
    name: "price.query",
    role: "public",
    tokens: ["market"]
  },
  // Below Method may have some error.
  {
    name: "price.subscribe",
    role: "public",
    tokens: ["market"]
  },
  {
    name: "price.update",
    role: "public",
    tokens: ["market", "price"]
  },
  {
    name: "price.unsubscribe",
    role: "public",
    tokens: []
  },
  {
    name: "state.query",
    role: "public",
    tokens: ["market", "period"],
    handle: {
      period: check.Number
    }
  },
  {
    name: "state.subscribe",
    role: "public",
    tokens: ["market"]
  },
  {
    name: "state.update",
    role: "public",
    tokens: ["market", "result"]
  },
  {
    name: "state.unsubscribe",
    role: "public",
    tokens: []
  },
  {
    name: "today.query",
    role: "public",
    tokens: ["market"]
  },
  {
    name: "today.subscribe",
    role: "public",
    tokens: ["market"]
  },
  {
    name: "today.update",
    role: "public",
    tokens: ["market", "result"]
  },
  {
    name: "today.unsubscribe",
    role: "public",
    tokens: []
  },
  {
    name: "deals.query",
    role: "public",
    tokens: ["market", "limit", "last_id"],
    handle: {
      limit: check.Number,
      last_id: check.Number
    }
  },
  {
    name: "deals.subscribe",
    role: "public",
    tokens: ["market_list"]
  },
  {
    name: "deals.update",
    role: "public",
    tokens: ["market", "order_list"]
  },
  {
    name: "deals.unsubscribe",
    role: "public",
    tokens: []
  },
  {
    name: "depth.query",
    role: "public",
    tokens: ["market", "limit", "interval"],
    handle: {
      limit: check.Number,
      interval: check.Number
    }
  },
  {
    name: "depth.subscribe",
    role: "public",
    tokens: ["market", "limit", "last_id"],
    handle: {
      limit: check.Number,
      last_id: check.Number
    }
  },
  {
    name: "depth.update",
    role: "public",
    tokens: ["clean", "result", "market"]
  },
  {
    name: "depth.unsubscribe",
    role: "public",
    tokens: []
  },

  //Order API , User Scope, Require Authentication.
  {
    name: "order.query",
    role: "user",
    tokens: ["market", "offset", "limit"],
    handle: {
      offset: check.Number,
      limit: check.Number
    }
  },
  {
    name: "order.history",
    role: "user",
    tokens: ["market", "start_time", "end_time", "offset", "limit", "side"],
    handle: {
      start_time: check.Number,
      end_time: check.Number,
      offset: check.Number,
      limit: check.Number,
      side: check.Number
    }
  },
  {
    name: "order.subscribe",
    role: "user",
    tokens: ["market_list"]
  },
  {
    name: "order.update",
    role: "user",
    tokens: ["event", "order"]
  },

  {
    name: "order.unsubscribe",
    role: "user",
    tokens: []
  },
  {
    name: "asset.query",
    role: "user",
    tokens: ["asset_list"]
  },
  {
    name: "asset.history",
    role: "user",
    tokens: ["asset", "business", "start_time", "end_time", "offset", "limit"],
    handle: {
      start_time: check.Number,
      end_time: check.Number,
      offset: check.Number,
      limit: check.Number
    }
  },
  {
    name: "asset.subscribe",
    role: "user",
    tokens: ["asset_list"]
  },
  {
    name: "asset.update",
    role: "user",
    tokens: ["result"]
  },
  {
    name: "asset.unsubscribe",
    role: "user",
    tokens: []
  }
];
