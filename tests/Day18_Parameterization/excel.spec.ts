import{test,expect,Locator} from "@playwright/test"
import * as XLSX from 'xlsx';

const excelpath = 'tests/Day18_Parameterization/testdata/data.xlsx';
const workbook = XLSX.readFile(excelpath);
const sheetNames = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetNames];

const recorddata:any = XLSX.utils.sheet_to_json(worksheet);

test.describe("group 1", async () => {

    for (const { email, password, validation, attempt } of recorddata) {
        test(`json data testing ${attempt} `, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/");
            await page.getByRole('link', { name: 'Log in' }).click();
            await page.getByRole('textbox', { name: 'Email:' }).fill(email);
            await page.getByRole('textbox', { name: 'Password:' }).fill(password);
            await page.locator('input.button-1.login-button').click();

            if (validation === "valid") {
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
