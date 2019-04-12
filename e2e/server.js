require('dotenv').config()

const puppeteer = require("puppeteer");
const rimraf = require('rimraf');

const loginAdmin = require('./tests/login/admin');
const lessonManagement = require('./tests/lessonManagement');
const questionManagement = require('./tests/questionManagement');

const loginStudent = require('./tests/login/student');

rimraf('./screenshots/login/*', function () { console.info('Deleted Login Screenshots'); });
rimraf('./screenshots/admin/lessons/*', function () { console.info('Deleted Admin Screenshots'); });
rimraf('./screenshots/admin/questions/*', function () { console.info('Deleted Admin Screenshots'); });


(async () => {
    let browser = await puppeteer.launch({ headless: false, slowMo: 20 })
    const adminHome = await loginAdmin(browser)


    //Admin tests here
    await lessonManagement(adminHome)
    await questionManagement(adminHome)

    browser.close();

    browser = await puppeteer.launch({ headless: false });
    const studentHome = await loginStudent(browser);
    //Student tests here

    browser.close();
})();