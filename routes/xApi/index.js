
import deposit from "./deposit";
import trade from "./trade";
import ws from "./ws";
module.exports= (app)=>{
//@apiDefine admin Admin access only
/* You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 *  to access this endpoint.
 * @apiDefine listParams * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint. */

app.use("/api/trade", trade);
app.use("/api/deposit", deposit);
app.use("/api/ws", ws);
}

