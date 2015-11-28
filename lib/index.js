"use strict";

const expect = require("expect")
    , colorIt = require("color-it")
    , emoji = require("emojic")
    , Queue = require("queoid")
    , indento = require("indento")
    ;

class Describe {
    constructor (message, fn) {
        this.queue = Queue();
        this.message = message;
        this.fn = fn;
    }
    run (fn) {
        tester.loggers.describe(this.message);
        this.fn(this);
        this.queue.start(fn);
    }
    it (what, fn) {

        var _fn = cb => {
            var _this = {
                end: tester.loggers.it
              , error: () => {
                }
              , pass: () => {
                    cb();
                }
              , expect: expect
            };

            if (fn.length === 0) {
                fn
            }
        };

        this.fn.push(_fn);

    }
}

var tester = module.exports = {
    queue: new Queue()
  , colors: {
        it: {
            success: "green"
          , error: "red"
        }
      , describe: "yellow"
    }
  , icons: {
        it: {
            success: "zap"
          , error: "x"
        }
      , describe: "arrowRight"
    }
  , indent: {
        it: 5
      , describe: 2
    }
  , loggers: {
        it: (err, itMessage, icon) => {
            icon = icon || tester.icons.it[err ?  "error" : "success"];
            var message = emoji[icon] + " " + data;
            if (err) {
                message += "\n" + err;
            }
            console.log(
                indento(
                    colorIt(message)[tester.colors.it].toString()
                  , tester.indent.it
                )
            );
        }
        describe: (message) {
            console.log(
                indento(
                    colorIt(
                        emoji[tester.icons.describe]
                      + " " + message
                    )[tester.colors.describe].toString()
                  , tester.indent.describe
                )
            );
        }
    }
};

function generateQueueHandler(desc) {
    return function (cb) {
        desc.run(cb);
    }
}
tester.describe = function (what, fn) {
    tester.queue.push(generateQueueHandler(new Describe(what, fn)));
    tester.queue.start();
};
