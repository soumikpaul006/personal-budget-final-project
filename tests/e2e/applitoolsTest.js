const { Builder } = require('selenium-webdriver');
const { Eyes, ClassicRunner, Target } = require('@applitools/eyes-selenium');

async function runTest() {
    // Initialize the Eyes SDK
    const eyes = new Eyes(new ClassicRunner());
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    // Initialize the Selenium WebDriver
    const driver = new Builder()
        .forBrowser('chrome') // or 'firefox', 'safari', etc.
        .build();

    try {
        // Open a new browser window
        await driver.get('http://localhost:3000');

        // Start the test and set the browser's viewport size to 800x600
        await eyes.open(driver, 'My App', 'Home Page Test', { width: 800, height: 600 });

        // Visual checkpoint #1
        await eyes.check('Home Page', Target.window());

        // End the test
        await eyes.closeAsync();
    } finally {
        // Close the browser
        await driver.quit();

        // If the test was aborted before eyes.closeAsync() was called
        await eyes.abortAsync();
    }
}

runTest().catch(err => console.error(err));
