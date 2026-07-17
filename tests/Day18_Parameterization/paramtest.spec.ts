import { test, expect, Locator } from "@playwright/test"


// const testdata: string[] = ["laptop", "gift card", "computer"];

// test.describe("test group 1", async () => {

//     for (const data of testdata) 
//     {
//         test(`test data of ${data}`, async ({ page }) => 
//         {

//             await page.goto("https://demowebshop.tricentis.com/");
//             const searchinput = page.locator('#small-searchterms');
//             await searchinput.fill(data);
//             await page.locator('input.button-1.search-box-button').click();
//             await expect.soft(page.locator('h2 a').nth(0)).toContainText(data, { ignoreCase: true });
//         })
//     }
// });

// test.describe("test group 2", async () => {

//     testdata.forEach((item)=>
//     {
//         test(`test data of ${item}`, async ({ page }) => 
//         {

//             await page.goto("https://demowebshop.tricentis.com/");
//             const searchinput = page.locator('#small-searchterms');
//             await searchinput.fill(item);
//             await page.locator('input.button-1.search-box-button').click();
//             await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });
//         })
//     })
// });


// test.describe("group 3", async()=>{

// test("register",async({page})=>{

//     await page.goto("https://demowebshop.tricentis.com/");
//     await page.getByRole('link', { name: 'Log in' }).click();
//     const pageurl = page.url();
//     console.log(`Login page URL is : ${pageurl}`)
//     expect(pageurl).toBe("https://demowebshop.tricentis.com/login");
//     await page.waitForTimeout(3000);

//     await page.locator('input.button-1.register-button').click();
//     await page.locator("//input[@id='gender-male']").check();
//     await page.locator("//input[@id='FirstName']").fill("Joyson")
//     await page.locator("//input[@id='LastName']").fill("Dsouza")
//     await page.locator("//input[@id='Email']").fill("Joysondsouza1@gmail.com")
//     await page.locator("//input[@id='Password']").fill("Joy1234")
//     await page.locator("//input[@id='ConfirmPassword']").fill("Joy1234")
//     await page.locator("//input[@id='register-button']").click();


//     const registermessage = await page.locator('div.result').innerText();
//     expect(registermessage).toBe("Your registration completed");
//     await page.locator("input[value='Continue']").click();
//     await page.getByText('Log out').click();
//     await expect(page.getByText('Log in')).toBeVisible();
//     await page.waitForTimeout(2000);
// })
// });


const logindata: string[][] = [
    ["joysondsouza@gmail.com", "Joy1234", "valid", "attempt_1"],
    ["joysondsouza1@gmail.com", "Joy1234", "valid", "attempt_2"],
    ["joysondsouza37@gmail.com", "joy12345", "valid", "attempt_3"],
    ["joysondsouza37@gmail.com", "joy1", "invalid", "attempt_4"],
    ["joysondsouza2@gmail.com", "Joy1234", "invalid", "attempt_5"],
    ["", "", "invalid", "attempt_6"]
]


test.describe("Group 4", async () => {
    for (const [email, password, validation, attempt] of logindata) {

        test(`Multidimensional array ${attempt}`, async ({ page }) => {
            await page.goto("https://demowebshop.tricentis.com/");
            await page.getByRole('link', { name: 'Log in' }).click();
            await page.getByRole('textbox', { name: 'Email:' }).fill(email);
            await page.getByRole('textbox', { name: 'Password:' }).fill(password);
            await page.locator('input.button-1.login-button').click();

            if (validation.toLocaleLowerCase() === "valid") {
                const loginEmail = await page.locator("div[class='header-links'] a[class='account']").innerText();
                expect(loginEmail.toLocaleLowerCase()).toBe(email.toLocaleLowerCase())
                console.log(`Login is successfull! for ${attempt} passed`)
            }
            else {
                const loginpage = page.getByRole('link', { name: 'Log in' });
                await expect(loginpage).toBeVisible();
                console.log(`Login was unsucessfull!! ${attempt} passed`)
            }
        })

    }
})

// json reader

import fs from 'fs';

const jsonpath = "tests/Day18_Parameterization/testdata/data.json"
const jsondata:any = JSON.parse(fs.readFileSync(jsonpath,'utf-8'));


test.describe("Group 5", async () => {
    for (const {email, password, validation, attempt} of jsondata) {

        test(`Multidimensional array ${attempt}`, async ({ page }) => {
            await page.goto("https://demowebshop.tricentis.com/");
            await page.getByRole('link', { name: 'Log in' }).click();
            await page.getByRole('textbox', { name: 'Email:' }).fill(email);
            await page.getByRole('textbox', { name: 'Password:' }).fill(password);
            await page.locator('input.button-1.login-button').click();

            if (validation.toLocaleLowerCase() === "valid") {
                const loginEmail = await page.locator("div[class='header-links'] a[class='account']").innerText();
                expect(loginEmail.toLocaleLowerCase()).toBe(email.toLocaleLowerCase())
                console.log(`Login is successfull! for ${attempt} passed`)
            }
            else {
                const loginpage = page.getByRole('link', { name: 'Log in' });
                await expect(loginpage).toBeVisible();
                console.log(`Login was unsucessfull!! ${attempt} passed`)
            }
        })

    }
})