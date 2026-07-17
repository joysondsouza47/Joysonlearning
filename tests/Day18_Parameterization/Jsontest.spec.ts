import { test, expect, Locator } from "@playwright/test";
import fs from 'fs';

const jsonpath = "tests/Day18_Parameterization/testdata/data.json";
const jsondata = JSON.parse(fs.readFileSync(jsonpath, 'utf-8'));


test.describe("group 1", async () => {

    for (const { email, password, validation, attempt } of jsondata) {
        test(`json data testing ${attempt} `, async ({ page }) => {

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