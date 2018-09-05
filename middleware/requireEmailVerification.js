module.exports = (req, res, next) => {

	if (!req.user.verified) {

		return res.status(401).send("please verify email first!");

	}
	next();

};
