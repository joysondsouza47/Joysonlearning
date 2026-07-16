import {test,expect} from "@playwright/test";

test("Verify page URL",async ({page})=>{

   await page.goto("https://demowebshop.tricentis.com/"); 
   
   const PageURL = page.url();

   console.log("URL of the page is:", PageURL);

   expect(PageURL).toContain("demowebshop.tricentis.com");

})







