import { test, expect } from "@playwright/test";


test.describe('Conduit', () => {
  test.beforeEach(async ({ page }) => {
    const base_url = "https://"+process.env.BB_USERNAME+":"+process.env.BB_PASSWORD+"@qa-task.backbasecloud.com"
    await page.goto(base_url);
    await page.waitForTimeout(1000)

  });
  
  test('Click Sign In', async ({ page }) => {
    await page.locator("text= Sign in ").click()
    await page.waitForURL("**/login")
    expect(page.locator("css=[placeholder='Email']")).toBeVisible({ timeout: 2000 })
    await page.fill("xpath=//fieldset[@class='form-group'][2]/input",'vreme@test.com')
    await page.fill("//fieldset[@class='form-group'][3]/input",'Vreme123')
    await page.locator("//button[@class='btn btn-lg btn-primary pull-xs-right']").click()
    await page.waitForTimeout(1000)
    await page.waitForURL("**/")

    //Create new article
    await page.waitForTimeout(1000)
    await page.locator("//a [@routerlink='/editor']").click()
    await page.fill("css=[placeholder='Article Title']",'This is new Article')
    await page.waitForTimeout(1000)
    await page.fill("xpath=//fieldset[2]/input",'This is about the first Article')
    await page.fill("css=[placeholder='Write your article (in markdown)']",'This article is about one main test')
    await page.fill("css=[placeholder='Enter tags']",'This article tag')
    await page.locator("text= Publish Article ").click()
    await page.waitForTimeout(1000)


    //View Article 
    await page.locator("xpath=//li[@class='nav-item'][4]/a").click()
    await page.waitForSelector("xpath=//app-article-preview[1]/div/a")
    await page.locator("xpath=//app-article-preview[1]/div/a").click()
    await page.waitForSelector("text=This article is about one main test")
    expect(page.locator("text=This article is about one main test")).toContainText('This article is about one main test')

    //Edit Article
    await page.waitForSelector("xpath=//div[2]/app-article-meta/div/span[1]/a")
    await page.locator("xpath=//div[2]/app-article-meta/div/span[1]/a").click()
    await page.waitForSelector("css=[formcontrolname='title']")
    await page.locator("css=[formcontrolname='title']").fill("")
    await page.fill("css=[formcontrolname='title']",'This is new edited Article')

    await page.waitForSelector("css=[formcontrolname='body']")
    await page.locator("css=[formcontrolname='body']").fill("")
    await page.fill("css=[formcontrolname='body']",'This article is about one main test with an edited description')
    await page.locator("text=Publish Article").click()

    //Delete Article
    await page.locator("xpath=//div[2]/app-article-meta/div/span[1]/button").click()

    //Go on home page and click on global feed
    await page.locator("text=Global Feed").click()
  
    //Close the application
    page.close


  });
  
  
});
