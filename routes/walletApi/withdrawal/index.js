import { Router } from "express";
import { withdrawal } from "./controller";
import { token } from "../../../services/passport";

const router = new Router(); /** * @api {get} /deposit/get-address Retrieve deposit * @apiName RetrieveDeposit * @apiGroup Deposit * @apiPermission user * @apiParam {String} access_token user access token. * @apiSuccess {Object} deposit Deposit's data. * @apiError {Object} 400 Some parameters may contain invalid values. * @apiError 404 Deposit not found. * @apiError 401 user access only. */
router.get("/withdrawal", token({ required: false }), withdrawal);

/**
 * @api {get} /deposit/update-balance Retrieve deposit
 * @apiName RetrieveDeposit
 * @apiGroup Deposit
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} deposit Deposit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Deposit not found.
 * @apiError 401 user access only.
 */

router.get("/test", token({ required: false }), (req, res, next) => {
  res.send("YESYEYSYE");
});
export default router;
