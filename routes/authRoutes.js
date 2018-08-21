module.exports = (app, passport) => {

	app.post("/login", passport.authenticate("local-login"), (req, res) => {

		let currUser = {
			email: req.user.email,
			id: req.user._id
		};
		res.send(currUser);

	});
	app.post("/signup", passport.authenticate("local-signup"), (req, res) => {

		res.sendStatus(200);

	});

};
