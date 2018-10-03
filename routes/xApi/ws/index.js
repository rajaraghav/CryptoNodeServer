import { Router } from "express";
import { token } from "../../../services/passport";
import { sendRequest } from "./controller";

const router = new Router();

router.get(
	"/public/:method",
	token({ required: false }),
	sendRequest("public")
);

export default router;
