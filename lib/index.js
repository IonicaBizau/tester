const expect = require("expect")
    , colorIt = require("color-it")
    , emoji = require("emojic")
    , queue = require("queoid")
    ;

class Describe {
    constructor () {
        this.queue = queue()
    }
}

var tester = module.exports = {
    queue:
};

tester.describe = function (what, fn) {
    console.log(
        colorIt(emoji.arrowRight + " " + what).yellow().toString()
    );
};

tester.it = function (what, fn) {
    console.log(
        " ".repeat(3)
      + colorIt(
          emoji.smile
        + " " + what
      ).yellow()
    );
};

