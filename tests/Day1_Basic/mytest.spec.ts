import {test,expect} from "@playwright/test";

//Syntax:
/*
test("title",()=>{

//step1
//step2
//step3
    
})

*/

//fixture - global variable  : page, browser


test("Verify page title",async ({page})=>{

   await page.goto("https://demowebshop.tricentis.com/"); 
   
   //let title:string=await page.title();

   const title = await page.title();
   
   console.log("Title of this page is:",title);

   expect(title).toBe("Demo Web Shop");

})







