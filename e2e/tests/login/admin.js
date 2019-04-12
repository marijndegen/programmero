const dateFormat = require('dateformat');
const path = "./screenshots/login/";
const exeTime = dateFormat(Date.now(), "yyyy-mm-dd-HH-MM-ss");
const ext = ".png"

const screenshotLoginPage = `${path}admin-login${exeTime}${ext}`;
const screenshotHomePage = `${path}admin-home${exeTime}${ext}`;

module.exports = async function loginAdmin(browser) {
	const page = await browser.newPage()
	await page.goto(process.env.FRONTENDURL)
	if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotLoginPage })
	await page.type("#email", process.env.ADMINLOGIN)
	await page.type("#password", process.env.ADMINPASS)
	await page.click("#submit")
	await page.waitForNavigation()
	if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotHomePage })
	return page
}