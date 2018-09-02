let Page = require("./helpers/page");
let page;
let rand = Math.round(Math.random() * 20000);
beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:5000");
});

test("server running", async () => {
	let serverRep = await page.getContentOf("body");
	console.log(serverRep);
});
test("signup works", async () => {
	let email = "raja@aarus.com" + rand;
	let password = "password";
	let serverRep = await page.post("/signup", {
		email,
		password
	});
});
test("login works", async () => {
	let email = "raja@aarus.com" + rand;
	let serverRep = await page.post("/login", {
		email,
		password: "password"
	});
});

afterEach(async () => {
	await page.close();
});
