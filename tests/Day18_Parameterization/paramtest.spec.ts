import {test,expect,Locator} from "@playwright/test"


const testdata:string[] = ["laptop", "gift card", "computer"];

test.describe("test group 1", async()=>{

for(const data of testdata)
{

 test(`test data of ${data}`, async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
const searchinput = page.locator('#small-searchterms');
await searchinput.fill(data);
await page.locator('input.button-1.search-box-button').click();
await expect.soft(page.locator('h2 a').nth(0)).toContainText(data, { ignoreCase: true });

 })



}



})