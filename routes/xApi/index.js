import { Router } from "express";
import auth from "./auth";
import deposit from "./deposit";
import trade from "./trade";
import user from "./user";

const router = new Router();
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
router.use("/users", user);
router.use("/auth", auth);
router.use("/trade", trade);
router.use("/deposit", deposit);

export default router;
