const puppeteer = require("puppeteer");
let sessionFactory = require("../factories/sessionFactory");
let userFactory = require("../factories/userFactory");
class Page {
	static async build() {
		const browser = await puppeteer.launch({
			headless: true,
			args: ["--no-sandbox"]
		});
		let page = await browser.newPage();
		const customPage = new Page(page);
		return new Proxy(customPage, {
			get: function(target, property) {
				return browser[property] || page[property] || customPage[property];
			}
		});
	}
	constructor(page) {
		this.page = page;
	}
	async login() {
		const user = await userFactory();
		const { session, sig } = sessionFactory(user);
		await this.page.setCookie({ name: "session", value: session });
		await this.page.setCookie({ name: "session.sig", value: sig });
		await this.page.goto("http://localhost:5000");
	}
	async getContentOf(selector) {
		return this.page.$eval(selector, el => el.innerHTML);
	}
}
module.exports = Page;
