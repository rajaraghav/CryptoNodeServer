let Page = require("./helpers/page");
let page;
beforeEach(async () => {
	page = await Page.build();
	await page.goto("http://localhost:5000");
});

test("server running", async () => {
	let serverRep = await page.getContentOf("body");
	console.log(serverRep);
	expect(serverRep).toEqual("43");
});
afterEach(async () => {
	await page.close();
});
