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
    expect(page.locator("xpath=//fieldset[@class='form-group'][2]/input")).toBeVisible({ timeout: 2000 })
    await page.fill("xpath=//fieldset[@class='form-group'][2]/input",'vreme@test.com')
    await page.fill("//fieldset[@class='form-group'][3]/input",'Vreme123')
    await page.locator("//button[@class='btn btn-lg btn-primary pull-xs-right']").click()
    await page.waitForTimeout(1000)
    await page.waitForURL("**/")

    //Create new article
    await page.waitForTimeout(1000)
    await page.locator("//a [@routerlink='/editor']").click()
    await page.fill("//div/form/fieldset/fieldset[1]/input",'This is new Article')
    await page.waitForTimeout(1000)
    await page.fill("//div/form/fieldset/fieldset[2]/input",'This is about the first Article')
    await page.fill("//div/form/fieldset/fieldset[3]/textarea",'This article is about one main test')
    await page.fill("//div/form/fieldset/fieldset[4]/input",'This article tag')
    await page.waitForTimeout(1000)
    await page.locator("//div/form/fieldset/button").click()
    await page.waitForTimeout(1000)

    //View Article 
    await page.locator("//li[@class='nav-item'][4]/a").click()
    await page.waitForSelector("//app-article-preview[1]/div/a")
    await page.locator("//app-article-preview[1]/div/a").click()
    await page.waitForSelector("//div[1]/div/div/p")
    expect(page.locator('//div[1]/div/div/p')).toContainText('This article is about one main test')

    //Edit Article
    await page.waitForSelector("//div[2]/app-article-meta/div/span[1]/a")
    await page.locator("//div[2]/app-article-meta/div/span[1]/a").click()
    await page.waitForSelector("//div/form/fieldset/fieldset[1]/input")
    await page.locator("//div/form/fieldset/fieldset[1]/input").fill("")
    await page.fill("//div/form/fieldset/fieldset[1]/input",'This is new edited Article')

    await page.waitForSelector("//div/form/fieldset/fieldset[3]/textarea")
    await page.locator("//div/form/fieldset/fieldset[3]/textarea").fill("")
    await page.fill("//div/form/fieldset/fieldset[3]/textarea",'This article is about one main test with an edited description')
    await page.locator("//div/form/fieldset/button").click()

    //Delete Article
    await page.locator("//div[2]/app-article-meta/div/span[1]/button").click()

    //Go on home page and click on global feed
    await page.locator("//div[1]/div/ul/li[2]/a").click()
  
    //Close the application
    page.close


  });
  
  
});
