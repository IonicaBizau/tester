const tester = require("../");

// Use describe to group the tests
tester.describe("tester", test => {
    test.it("describe should be a function", () => {
        test.expect(tester.describe).toBeA(Function);
    });
});

