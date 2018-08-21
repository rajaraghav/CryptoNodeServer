module.exports = (app, passport) => {

	app.post("/login", passport.authenticate("local-login"), (req, res) => {

		let currUser = {
			email: req.user.email,
			/* eslint-disable */
			id: req.user._id
			/* eslint-enable */
		};
		res.send(currUser);

	});
	app.post("/signup", passport.authenticate("local-signup"), (req, res) => {

		res.sendStatus(200);

	});

};
