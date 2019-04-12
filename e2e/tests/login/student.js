const dateFormat = require('dateformat');
const path = "./screenshots/login/";
const exeTime = dateFormat(Date.now(), "yyyy-mm-dd-HH-MM-ss");
const ext = ".png"

const screenshotLoginPage = `${path}student-login${exeTime}${ext}`;
const screenshotHomePage = `${path}student-home${exeTime}${ext}`;

module.exports = async function loginStudent(browser) {
	const page = await browser.newPage()
	await page.goto(process.env.FRONTENDURL)
	if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotLoginPage })
	await page.type("#email", process.env.STUDENTLOGIN)
	await page.type("#password", process.env.STUDENTPASS)
	await page.click("#submit")
	await page.waitForNavigation()
	if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotHomePage })
	return page
}