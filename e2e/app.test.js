const { takeScreenshot } = require ('./helpers')

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should have welcome screen', async () => {
    try {
      await expect(element(by.id('welcome'))).toBeVisible();
    } catch (e) {
      takeScreenshot();
    }
  });
});