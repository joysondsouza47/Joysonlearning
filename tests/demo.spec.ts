import {test,expect,Locator} from "@playwright/test"


test("new title", async({page})=>{

    await page.goto("https://demo.opencart.com/")
    await page.waitForTimeout(10000);

    console.log("Hello, World!!!!");

})