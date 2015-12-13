const tester = require("../");

// Use describe to group the tests
tester.describe("Running some example tests", example => {

    // Without a callback (the code will be executed syncronously)
    example.should("be able to make simple checks using expect", () => {
        example.expect(true).toBe(true);
    });

    // Async function which will fail
    example.should("support async functions", (cb) => {
        setTimeout(function() {
            example.expect(true).toBe(false);
            cb();
        }, 100);
    });

    // Wait a second and pass
    example.it("wait a second", (cb) => {
        setTimeout(function() {
            example.expect(true).toBe(true);
            cb();
        }, 1000);
    });
});

tester.describe("Running another set of tests", another => {
    another.it("some test", () => {
        another.expect(true).toBe(true);
    });
});
