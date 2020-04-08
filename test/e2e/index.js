const { Builder, By, Key, until } = require('selenium-webdriver')

  ; (async function () {
    const driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get('https://www.google.com')
      await driver.findElement(By.name('q')).sendKeys('hello', Key.RETURN)
      await driver.wait(until.titleIs('hello - Google 搜索'), 1000)
    } finally {
      await driver.quit()
    }
  })();
