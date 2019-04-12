const dateFormat = require('dateformat');
const path = "./screenshots/admin/lessons/";
const exeTime = dateFormat(Date.now(), "yyyy-mm-dd-HH-MM-ss");
const ext = ".png"

const screenshotLessonManagement = `${path}LessonManagement${exeTime}${ext}`;
const screenshotLessonManagementAddLesson = `${path}LessonManagementAddLesson${exeTime}${ext}`;
const screenshotLessonManagementEditLesson = `${path}LessonManagementEditLesson${exeTime}${ext}`;
const screenshotLessonManagementEditedLesson = `${path}LessonManagementEditedLesson${exeTime}${ext}`;
const screenshotLessonManagementDeleteLesson = `${path}LessonManagementDeleteLesson${exeTime}${ext}`;
const screenshotLessonManagementDeletedLesson = `${path}LessonManagementDeletedLesson${exeTime}${ext}`;

module.exports = async function lessonManagement(page){
    // expect("asdf").toEqual("ja")
	await page.waitForSelector("#lessonManagement")
	await page.click("#lessonManagement")
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotLessonManagement })
	await page.waitForSelector("#lessonName")
    await page.type("#lessonName", "eenlesmeteenhelelangenaamzodatdezenietconflicteerdmetanderelessen")
    await page.waitForSelector("#addLessonButton")
	await page.click("#addLessonButton")
    
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotLessonManagementAddLesson })
	await page.waitForSelector("#lessons> li:last-child > div > label")
    await page.click("#lessons> li:last-child > div > label")
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotLessonManagementEditLesson })
    await page.waitForSelector("#newName")
	await page.type("#newName", "eenlesmeteennieuwelangenaamzodatdezenietconflicteerdmetanderelessen")   
    await page.waitForSelector("#edit")
	await page.click("#edit")   
    await page.waitFor(200)
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotLessonManagementEditedLesson })
    const checkBox = await page.$("#lessons> li:last-child > div > label");
    await page.waitFor(500)
    checkBox.click()
	await page.waitForSelector("#delete")
    await page.click("#delete")
    await page.waitFor(1000)
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotLessonManagementDeleteLesson })
    await page.waitForSelector("#confirmdelete")
	await page.click("#confirmdelete")
    await page.waitFor(200)
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotLessonManagementDeletedLesson})
    await page.waitForSelector("#home")
	await page.click("#home");
}