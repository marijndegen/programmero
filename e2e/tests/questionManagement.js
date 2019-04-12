const dateFormat = require('dateformat');
const path = "./screenshots/admin/questions/";
const exeTime = dateFormat(Date.now(), "yyyy-mm-dd-HH-MM-ss");
const ext = ".png"

const screenshotQuestionManagement = `${path}QuestionManagement${exeTime}${ext}`;
const screenshotQuestionManagementAddQuestionTitle = `${path}QuestionManagementAddQuestionTitle${exeTime}${ext}`;
const screenshotQuestionManagementFinishAddCodeCards = `${path}QuestionManagementFinishAddCodeCards${exeTime}${ext}`;
const screenshotQuestionManagementFinishAddCodeCardsSaved = `${path}QuestionManagementFinishAddCodeCardsSaved${exeTime}${ext}`;
const screenshotQuestionManagementEdit = `${path}QuestionManagementEdit${exeTime}${ext}`;
const screenshotQuestionManagementEditSelectAll = `${path}QuestionManagementEditSelectAll${exeTime}${ext}`;
const screenshotQuestionManagementEditDelete = `${path}QuestionManagementEditDelete${exeTime}${ext}`;


const codeCard = ["for", "(", "int i = 0;", "i <=5;", "i++;", ")", "{", "console.log", "(", "\"HALLO\"", ");", "}"];

module.exports = async function addAndRemoveQuestion(page) {
    await page.waitForSelector("#addQuestion");
    await page.click("#addQuestion");
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotQuestionManagement })
    await page.waitForSelector(".add-question-form");
    await page.click("input#question");
    await page.type("input#question", "Schrijf een for loop die iets print");
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotQuestionManagementAddQuestionTitle })
    for (let i = 0; i < codeCard.length; i++) {
        await page.click("#codecardadd");
        await page.type("#codecardadd", codeCard[i]);
        await page.click("svg.fa-plus");
    }
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotQuestionManagementFinishAddCodeCards })
    await page.waitFor(1000);
    await page.waitFor("#save-question");
    await page.click("#save-question");
    let button = await page.$("#save-question");
    await page.waitFor(2000);
    await button.click();
    await page.waitForSelector(".alert-success");
    await page.waitFor(1000);
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotQuestionManagementFinishAddCodeCardsSaved })

    //Delete all questions
    await page.goto("http://localhost:3000/");
    await page.waitForSelector("a.question-Management");
    await page.click("a.question-Management");
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotQuestionManagementEdit })
    await page.waitForSelector(".container");
    await page.waitFor(1000);

    await page.waitForSelector("#lessonSelector");
    await page.click("#lessonSelector");

    let Select = await page.$("select");
    let Option = await Select.getProperties();
    let i = 0;
    for (const property of Option.values()) {
        i++;
        const element = property.asElement();
        if (element && i > 1 && i < 3) {
            let hText = await element.getProperty("text");
            let text = await hText.jsonValue();
            let hValue = await element.getProperty("value");
            let optionValue = await hValue.jsonValue();
            await page.select("#lessonSelector", optionValue);

        }
    }
    await page.click("#lessonSelector");

    /Somehow moet ik dit 2 keer aanroepen/
    await page.waitFor(2000);
    await page.waitForSelector(".selectAll");
    await page.click(".selectAll");
    await page.waitForSelector(".selectAll");
    await page.click(".selectAll");

    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotQuestionManagementEditSelectAll })

    await page.waitForSelector(".verwijder-selectie");
    await page.click(".verwijder-selectie");

    /*Somehow moet ik dit 2 keer aanroepen*/
    await page.waitFor(2000);
    if (process.env.SAVESCREENSHOT) await page.screenshot({ path: screenshotQuestionManagementEditDelete })
    await page.waitForSelector(".verwijder-definitief");
    await page.click(".verwijder-definitief");
}
