const { takeScreenshot } = require ('./helpers')

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    takeScreenshot()
  });

  afterEach(async () => {
    takeScreenshot()
  })

  
  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible()
  });
});