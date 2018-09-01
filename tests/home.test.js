let Page = require("./helpers/page");
let page;
beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:5000");
});

test("server running", async () => {
	let serverRep = await page.getContentOf("body");
	console.log(serverRep);
});
test("signup works", async () => {
	let rand = Math.round(Math.random() * 20000);
	let email = "raja@aarus.com";
	let password = "password";
	let serverRep = await page.post("/signup", {
		email,
		password
	});
});
test("login works", async () => {
	let serverRep = await page.post("/login", {
		email: "raja@aarus.com",
		password: "password"
	});
});

afterEach(async () => {
	await page.close();
});
