/*
Pre-requisite:
Install the csv-parse module to read CSV files:
    npm install csv-parse
	

*/

import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

interface LoginData {
    email: string;
    password: string;
    validity: string;
}

// Reading data from CSV
const csvPath = 'tests/Day18_Parameterization/testdata/data.csv';
const fileContent = fs.readFileSync(csvPath, 'utf-8');

const records:LoginData[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
}) 

// Main test
test.describe('Login data driven test', () => {
    for (const data of records) {
        test(`Login test with email: "${data.email}" and password: "${data.password}"`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');

            // Fill login form
            await page.locator('#Email').fill(data.email);
            await page.locator('#Password').fill(data.password);
            await page.locator('input[value="Log in"]').click();

            if (data.validity.toLowerCase() === 'valid') {
                // Assert logout link is visible - indicates successful login
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                // Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 5000 });

                // Assert user is still on the login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        });
    }
});

